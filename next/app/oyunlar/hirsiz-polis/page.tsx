"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { recordGameSession, recordPageView } from '../../utils/analytics';
import AuthGuard from "../../utils/authGuard";

type Piece = "T" | "P" | null; // T = Thief (Hırsız), P = Police (Polis)
const BOARD_SIZE = 8;

function ThiefPoliceGame(){
  const [board, setBoard] = useState<Piece[][]>(()=>Array.from({length:BOARD_SIZE},()=>Array(BOARD_SIZE).fill(null)));
  const [playerTurn, setPlayerTurn] = useState(false); // Police starts first
  const [selected, setSelected] = useState<{r:number,c:number}|null>(null);
  const [legal, setLegal] = useState<{r:number,c:number,capture:boolean}[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [gameMessage, setGameMessage] = useState("");

  const aThief = useRef<HTMLAudioElement|null>(null);
  const aPolice = useRef<HTMLAudioElement|null>(null);
  const aCapture = useRef<HTMLAudioElement|null>(null);
  const aWin = useRef<HTMLAudioElement|null>(null);
  const aLose = useRef<HTMLAudioElement|null>(null);
  const play = (el: HTMLAudioElement | null) => { if(!muted && el){ try { el.currentTime = 0; el.play(); } catch {} } };

  useEffect(()=>{
    const b = Array.from({length:BOARD_SIZE},()=>Array(BOARD_SIZE).fill(null) as Piece[]);
    // Police at d1 (row 7, col 3), Thieves at d7 (row 1, col 3) and e7 (row 1, col 4)
    b[7][3] = "P"; // Police at d1
    b[1][3] = "T"; // Thief1 at d7
    b[1][4] = "T"; // Thief2 at e7
    setBoard(b); setPlayerTurn(false); setSelected(null); setLegal([]); setGameOver(false); setScore(0); setGameMessage("Polis başlar: Hırsızları yakala!");
  },[]);

  const [bestScore, setBestScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const best = Number(localStorage.getItem("tp-best") || 0);
    setBestScore(best);
    
    // Sayfa görüntüleme kaydı
    recordPageView('/oyunlar/hirsiz-polis', 'guest', 0);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const best = Number(localStorage.getItem("tp-best") || 0);
    if (score > best) {
      localStorage.setItem("tp-best", String(score));
      setBestScore(score);
    }
  }, [score, isClient]);

  // pixel-perfect squares
  const frameRef = useRef<HTMLDivElement|null>(null);
  useEffect(()=>{
    const el = frameRef.current; if(!el) return; const ro = new ResizeObserver(()=>{
      const size = Math.floor(Math.min(el.clientWidth, el.clientHeight)); const snapped = size - (size % 8); el.style.setProperty('--square', String(snapped/8));
    }); ro.observe(el); return ()=>ro.disconnect();
  },[]);

  function inBounds(r:number,c:number){ return r>=0 && r<8 && c>=0 && c<8; }
  function listThieves(){ const res: {r:number,c:number}[]=[]; for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]==='T') res.push({r,c}); return res; }
  function nearestThiefDistance(pos:{r:number,c:number}, list:{r:number,c:number}[]){ let best=Infinity; for(const p of list){ const d=Math.abs(pos.r-p.r)+Math.abs(pos.c-p.c); if(d<best) best=d; } return best; }
  function centerScore(m:{r:number,c:number}){ return Math.abs(3.5-m.r)+Math.abs(3.5-m.c); }

  function genThief(r:number,c:number){ 
    const m: any[]=[]; 
    // First move: can move 2 squares forward from starting position (row 1)
    if(r === 1){ 
      const f1 = r+1, f2 = r+2; 
      if(f1<8 && !board[f1][c]) m.push({r:f1,c, capture:false}); 
      if(f2<8 && !board[f2][c]) m.push({r:f2,c, capture:false}); 
    } else { 
      // Subsequent moves: only 1 square forward
      const f = r+1; 
      if(f<8 && !board[f][c]) m.push({r:f,c, capture:false}); 
    }
    // Diagonal captures
    const dl={r:r+1,c:c-1}, dr={r:r+1,c:c+1}; 
    [dl,dr].forEach(d=>{ 
      if(inBounds(d.r,d.c) && board[d.r][d.c]==='P') 
        m.push({r:d.r,c:d.c,capture:true}); 
    }); 
    return m; 
  }
  function genPolice(r:number,c:number){ 
    const res:any[]=[]; 
    const dirs=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]; 
    for(const [dr,dc] of dirs){ 
      const nr=r+dr, nc=c+dc; 
      if(inBounds(nr,nc)){ 
        const p=board[nr][nc]; 
        if(!p){ 
          // Check if this square is safe (not under threat from thieves)
          if(isSquareSafe(nr,nc)) {
            res.push({r:nr,c:nc,capture:false}); 
          }
        } else if(p==='T'){ 
          // Can capture thief only if the square is safe after capture
          if(isSquareSafeAfterCapture(nr,nc)) {
            res.push({r:nr,c:nc,capture:true}); 
          }
        } 
      } 
    } 
    return res; 
  }
  
  function isSquareSafe(r:number,c:number) {
    // Check if any thief can attack this square
    for(let tr=0; tr<8; tr++) {
      for(let tc=0; tc<8; tc++) {
        if(board[tr][tc] === 'T') {
          // Check diagonal attacks (thief can capture diagonally)
          const dl = {r: tr+1, c: tc-1};
          const dr = {r: tr+1, c: tc+1};
          
          if((dl.r === r && dl.c === c) || (dr.r === r && dr.c === c)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  function isSquareSafeAfterCapture(r:number,c:number) {
    // Simulate the capture and check if the square is safe
    const tempBoard = board.map(row => row.slice());
    tempBoard[r][c] = null; // Remove the thief
    
    // Check if any remaining thief can attack this square
    for(let tr=0; tr<8; tr++) {
      for(let tc=0; tc<8; tc++) {
        if(tempBoard[tr][tc] === 'T') {
          // Check diagonal attacks (thief can capture diagonally)
          const dl = {r: tr+1, c: tc-1};
          const dr = {r: tr+1, c: tc+1};
          
          if((dl.r === r && dl.c === c) || (dr.r === r && dr.c === c)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  function anyMove(){ for(const {r,c} of listThieves()) if(genThief(r,c).length) return true; return false; }
  function findPolice(){ for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]==='P') return {r,c}; return null; }
  
  // Board-specific helper functions
  function listThievesInBoard(boardState: Piece[][]){ const res: {r:number,c:number}[]=[]; for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(boardState[r][c]==='T') res.push({r,c}); return res; }
  function findPoliceInBoard(boardState: Piece[][]){ for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(boardState[r][c]==='P') return {r,c}; return null; }
  function anyMoveInBoard(boardState: Piece[][]){ for(const {r,c} of listThievesInBoard(boardState)) if(genThiefInBoard(r,c,boardState).length) return true; return false; }
  function genThiefInBoard(r:number,c:number, boardState: Piece[][]){ 
    const m: any[]=[]; 
    if(r === 1){ 
      const f1 = r+1, f2 = r+2; 
      if(f1<8 && !boardState[f1][c]) m.push({r:f1,c, capture:false}); 
      if(f2<8 && !boardState[f2][c]) m.push({r:f2,c, capture:false}); 
    } else { 
      const f = r+1; 
      if(f<8 && !boardState[f][c]) m.push({r:f,c, capture:false}); 
    }
    const dl={r:r+1,c:c-1}, dr={r:r+1,c:c+1}; 
    [dl,dr].forEach(d=>{ 
      if(inBounds(d.r,d.c) && boardState[d.r][d.c]==='P') 
        m.push({r:d.r,c:d.c,capture:true}); 
    }); 
    return m; 
  }
  function genPoliceInBoard(r:number,c:number, boardState: Piece[][]){ 
    const res:any[]=[]; 
    const dirs=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]; 
    for(const [dr,dc] of dirs){ 
      const nr=r+dr, nc=c+dc; 
      if(inBounds(nr,nc)){ 
        const p=boardState[nr][nc]; 
        if(!p){ 
          // Check if this square is safe (not under threat from thieves)
          if(isSquareSafeInBoard(nr,nc, boardState)) {
            res.push({r:nr,c:nc,capture:false}); 
          }
        } else if(p==='T'){ 
          // Can capture thief only if the square is safe after capture
          if(isSquareSafeAfterCaptureInBoard(nr,nc, boardState)) {
            res.push({r:nr,c:nc,capture:true}); 
          }
        } 
      } 
    } 
    return res; 
  }
  
  function isSquareSafeInBoard(r:number,c:number, boardState: Piece[][]) {
    // Check if any thief can attack this square
    for(let tr=0; tr<8; tr++) {
      for(let tc=0; tc<8; tc++) {
        if(boardState[tr][tc] === 'T') {
          // Check diagonal attacks (thief can capture diagonally)
          const dl = {r: tr+1, c: tc-1};
          const dr = {r: tr+1, c: tc+1};
          
          if((dl.r === r && dl.c === c) || (dr.r === r && dr.c === c)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  function isSquareSafeAfterCaptureInBoard(r:number,c:number, boardState: Piece[][]) {
    // Simulate the capture and check if the square is safe
    const tempBoard = boardState.map(row => row.slice());
    tempBoard[r][c] = null; // Remove the thief
    
    // Check if any remaining thief can attack this square
    for(let tr=0; tr<8; tr++) {
      for(let tc=0; tc<8; tc++) {
        if(tempBoard[tr][tc] === 'T') {
          // Check diagonal attacks (thief can capture diagonally)
          const dl = {r: tr+1, c: tc-1};
          const dr = {r: tr+1, c: tc+1};
          
          if((dl.r === r && dl.c === c) || (dr.r === r && dr.c === c)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function clickSquare(r:number,c:number){ 
    if(gameOver) return;
    const piece=board[r][c]; 
    const sel = selected?board[selected.r][selected.c]:null; 
    
    if(!selected){ 
      if(piece==='P'){ 
        setSelected({r,c}); 
        setLegal(genPolice(r,c)); 
      } 
      return; 
    } 
    
    if(piece==='P'){ 
      setSelected({r,c}); 
      setLegal(genPolice(r,c)); 
      return; 
    } 
    
    const t=legal.find(m=>m.r===r&&m.c===c); 
    if(t && sel==='P'){ 
      const nb=board.map(row=>row.slice()); 
      nb[selected!.r][selected!.c]=null; 
      const captured=nb[r][c]; 
      nb[r][c]='P'; 
      setBoard(nb); 
      setSelected(null); 
      setLegal([]); 
      
      play(aPolice.current);
      
      if(captured==='T'){ 
        // Check if all thieves are captured
        const remainingThieves = nb.flat().filter(p=>p==='T').length;
        if(remainingThieves === 0) {
          setGameOver(true); 
          setGameMessage("🎉 KAZANDIN! Tüm hırsızlar yakalandı! 🎉"); 
          play(aWin.current); 
          return; 
        }
      } 
      
      setScore(s=>s+1+(captured?3:0)); 
      setPlayerTurn(true); 
      setTimeout(() => thiefMove(nb), 500); 
    } 
  }

  function thiefMove(currentBoard?: Piece[][]){ 
    if(gameOver) return; 
    const boardState = currentBoard || board;
    const thieves = listThievesInBoard(boardState);
    if(thieves.length === 0) return;
    
    // Find the best move for each thief
    let bestMove: any = null;
    let bestThief: any = null;
    let bestScore = -Infinity;
    
    for(const thief of thieves) {
      const moves = genThiefInBoard(thief.r, thief.c, boardState);
      for(const move of moves) {
        let score = 0;
        
        // Prioritize reaching the bottom (row 7)
        if(move.r === 7) {
          score += 1000; // Win condition
        }
        
        // Prioritize capturing the police
        if(move.capture) {
          score += 500;
        }
        
        // Move towards the bottom
        score += (7 - move.r) * 10;
        
        // Avoid moving backwards
        if(move.r < thief.r) {
          score -= 50;
        }
        
        // Prefer moves that get closer to the police
        const police = findPoliceInBoard(boardState);
        if(police) {
          const distance = Math.abs(move.r - police.r) + Math.abs(move.c - police.c);
          score += (10 - distance) * 5;
        }
        
        if(score > bestScore) {
          bestScore = score;
          bestMove = move;
          bestThief = thief;
        }
      }
    }
    
    if(bestMove && bestThief) {
      const nb = boardState.map(row=>row.slice());
      const captured = nb[bestMove.r][bestMove.c];
      nb[bestThief.r][bestThief.c] = null;
      nb[bestMove.r][bestMove.c] = 'T';
      setBoard(nb);
      
      if(captured === 'P') {
        setGameOver(true);
        setGameMessage("😢 KAYBETTIN! Hırsızlar polisi yakaladı! 😢");
        play(aLose.current);
        return;
      }
      
      if(bestMove.r === 7) {
        setGameOver(true);
        setGameMessage("😢 KAYBETTIN! Hırsız en alta ulaştı! 😢");
        play(aLose.current);
        return;
      }
      
      play(aThief.current);
      setPlayerTurn(false);
    }
  }

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">Sıra: {!playerTurn?"👮 Polis":"🏃 Hırsızlar"}</span>
          <span className="game-message">{gameMessage}</span>
        </div>
        <div className="game-controls">
          <button className="control-btn mute-btn" aria-pressed={muted} onClick={()=>setMuted(m=>!m)} title={muted?"Sesi Aç":"Sesi Kapat"}>
            {muted?"🔇":"🔊"}
          </button>
          <button className="control-btn new-game-btn" onClick={()=>location.reload()} title="Yeni Oyun">
            🔄
          </button>
        </div>
      </section>
      <section className="board-scene">
        <div className="vault-bg">
          <div className="board-frame" ref={frameRef}>
            <div className="board" role="grid" aria-label="Banka Kasası">
              {/* File labels (a-h) */}
              <div className="file-labels">
                {['a','b','c','d','e','f','g','h'].map(letter => (
                  <div key={letter} className="file-label">{letter}</div>
                ))}
              </div>
              {/* Rank labels (8-1) */}
              <div className="rank-labels">
                {[8,7,6,5,4,3,2,1].map(num => (
                  <div key={num} className="rank-label">{num}</div>
                ))}
              </div>
              {/* Board squares */}
              {Array.from({length:8}).map((_,r)=>Array.from({length:8}).map((_,c)=>{
                const light=(r+c)%2===0; const piece=board[r][c];
                const has=legal.find(m=>m.r===r&&m.c===c);
                return (
                  <div key={`r${r}c${c}`} className={`square ${light?"light":"dark"} ${selected && selected.r===r && selected.c===c?"from":""} ${has?(has.capture?"capture":"highlight"):""}`} onClick={()=>clickSquare(r,c)}>
                    {piece && <div className={`piece ${piece==='T'?"thief":"police"}`}>
                      <img src={piece==='T'?'/img/money_16040088.png':'/img/2177912.png'} alt={piece==='T'?'Hırsız':'Polis'} style={{width:'100%',height:'100%',objectFit:'contain'}} />
                    </div>}
                  </div>
                );
              }))}
            </div>
          </div>
          
        </div>
        <aside className="sidebar">
          <div className="game-info">
            <h3>🎯 Hedef</h3>
            <p>Polis: Her iki hırsızı da yakala! Hırsızlar: En alta ulaş veya polisi yakala! (Hırsızlar ilk hamlede 2 kare)</p>
          </div>
          <div className="score-card">
            <h4>📊 Puan</h4>
            <div className="score-item">
              <span>Oyun:</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-item">
              <span>Rekor:</span>
              <span className="score-value best">{bestScore}</span>
            </div>
          </div>
          {gameOver && (
            <div className="game-over-card">
              <h4>🎮 Oyun Bitti</h4>
              <p>{gameMessage}</p>
              <button className="play-again-btn" onClick={()=>location.reload()}>
                🔄 Tekrar Oyna
              </button>
            </div>
          )}
        </aside>
      </section>

      <audio ref={aThief} src="/audio/depositphotos_412970482-track-cartoon-thief-grumpy-laugh.mp3" preload="auto"/>
      <audio ref={aPolice} src="/audio/police-intro-sfx-323774.mp3" preload="auto"/>
      <audio ref={aCapture} src="/audio/depositphotos_412970482-track-cartoon-thief-grumpy-laugh.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/police-intro-sfx-323774.mp3" preload="auto"/>
      <audio ref={aLose} src="/audio/depositphotos_412970482-track-cartoon-thief-grumpy-laugh.mp3" preload="auto"/>
    </>
  );
}

export default function HirsizPolisPage() {
  return (
    <AuthGuard requiredBookId="oyunlarla-satranc" gameId="hirsiz-polis">
      <ThiefPoliceGame />
    </AuthGuard>
  );
}