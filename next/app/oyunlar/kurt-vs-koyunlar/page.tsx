"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";
import { recordGameSession, recordPageView } from "../../utils/analytics";

type Piece = "S" | "W" | null;
const BOARD_SIZE = 8;

function Game(){
  const [board, setBoard] = useState<Piece[][]>(()=>Array.from({length:BOARD_SIZE},()=>Array(BOARD_SIZE).fill(null)));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [selected, setSelected] = useState<{r:number,c:number}|null>(null);
  const [legal, setLegal] = useState<{r:number,c:number,capture:boolean}[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [gameMessage, setGameMessage] = useState("");

  const aSheep = useRef<HTMLAudioElement|null>(null);
  const aWolf = useRef<HTMLAudioElement|null>(null);
  const aCapture = useRef<HTMLAudioElement|null>(null);
  const aWin = useRef<HTMLAudioElement|null>(null);
  const aLose = useRef<HTMLAudioElement|null>(null);
  const play = (el: HTMLAudioElement | null) => { if(!muted && el){ try { el.currentTime = 0; el.play(); } catch {} } };

  useEffect(()=>{
    const b = Array.from({length:BOARD_SIZE},()=>Array(BOARD_SIZE).fill(null) as Piece[]);
    // Pawns at row 6 (a7-h7), Wolf at d8 (row 0, col 3)
    for(let c=0;c<BOARD_SIZE;c++) b[6][c] = "S"; 
    b[0][3] = "W"; // d8 position
    setBoard(b); setPlayerTurn(true); setSelected(null); setLegal([]); setGameOver(false); setScore(0); setGameMessage("Koyunlarla başla: Kurdu yakala!");
  },[]);

  const [bestScore, setBestScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const best = Number(localStorage.getItem("wvss-best") || 0);
    setBestScore(best);
    
    // Sayfa görüntüleme kaydı
    recordPageView('/oyunlar/kurt-vs-koyunlar', 'guest', 0);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const best = Number(localStorage.getItem("wvss-best") || 0);
    if (score > best) {
      localStorage.setItem("wvss-best", String(score));
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
  function listSheep(){ const res: {r:number,c:number}[]=[]; for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]==='S') res.push({r,c}); return res; }
  function nearestSheepDistance(pos:{r:number,c:number}, list:{r:number,c:number}[]){ let best=Infinity; for(const p of list){ const d=Math.abs(pos.r-p.r)+Math.abs(pos.c-p.c); if(d<best) best=d; } return best; }
  function centerScore(m:{r:number,c:number}){ return Math.abs(3.5-m.r)+Math.abs(3.5-m.c); }

  function genSheep(r:number,c:number){ 
    const m: any[]=[]; 
    // First move: can move 2 squares forward from starting position (row 6)
    if(r === 6){ 
      const f1 = r-1, f2 = r-2; 
      if(f1>=0 && !board[f1][c]) m.push({r:f1,c, capture:false}); 
      if(f2>=0 && !board[f2][c]) m.push({r:f2,c, capture:false}); 
    } else { 
      // Subsequent moves: only 1 square forward
      const f = r-1; 
      if(f>=0 && !board[f][c]) m.push({r:f,c, capture:false}); 
    }
    // Diagonal captures
    const dl={r:r-1,c:c-1}, dr={r:r-1,c:c+1}; 
    [dl,dr].forEach(d=>{ 
      if(inBounds(d.r,d.c) && board[d.r][d.c]==='W') 
        m.push({r:d.r,c:d.c,capture:true}); 
    }); 
    return m; 
  }
  function genWolf(r:number,c:number){ 
    const res:any[]=[]; 
    const dirs=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]; 
    for(const [dr,dc] of dirs){ 
      let nr=r+dr, nc=c+dc; 
      while(inBounds(nr,nc)){ 
        const p=board[nr][nc]; 
        if(!p){ 
          // Empty square - can move here
          res.push({r:nr,c:nc,capture:false}); 
        } else if(p==='S'){ 
          // Sheep - can capture but must stop here
          res.push({r:nr,c:nc,capture:true}); 
          break; // Must stop after capturing
        } else { 
          // Any other piece - must stop, can't go further
          break; 
        } 
        nr+=dr; nc+=dc; 
      } 
    } 
    return res; 
  }
  function anyMove(){ for(const {r,c} of listSheep()) if(genSheep(r,c).length) return true; return false; }
  function findWolf(){ for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]==='W') return {r,c}; return null; }
  
  // Board-specific helper functions
  function listSheepInBoard(boardState: Piece[][]){ const res: {r:number,c:number}[]=[]; for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(boardState[r][c]==='S') res.push({r,c}); return res; }
  function findWolfInBoard(boardState: Piece[][]){ for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(boardState[r][c]==='W') return {r,c}; return null; }
  function anyMoveInBoard(boardState: Piece[][]){ for(const {r,c} of listSheepInBoard(boardState)) if(genSheepInBoard(r,c,boardState).length) return true; return false; }
  function genSheepInBoard(r:number,c:number, boardState: Piece[][]){ 
    const m: any[]=[]; 
    if(r === 6){ 
      const f1 = r-1, f2 = r-2; 
      if(f1>=0 && !boardState[f1][c]) m.push({r:f1,c, capture:false}); 
      if(f2>=0 && !boardState[f2][c]) m.push({r:f2,c, capture:false}); 
    } else { 
      const f = r-1; 
      if(f>=0 && !boardState[f][c]) m.push({r:f,c, capture:false}); 
    }
    const dl={r:r-1,c:c-1}, dr={r:r-1,c:c+1}; 
    [dl,dr].forEach(d=>{ 
      if(inBounds(d.r,d.c) && boardState[d.r][d.c]==='W') 
        m.push({r:d.r,c:d.c,capture:true}); 
    }); 
    return m; 
  }
  function genWolfInBoard(r:number,c:number, boardState: Piece[][]){ 
    const res:any[]=[]; 
    const dirs=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]; 
    for(const [dr,dc] of dirs){ 
      let nr=r+dr, nc=c+dc; 
      while(inBounds(nr,nc)){ 
        const p=boardState[nr][nc]; 
        if(!p){ 
          res.push({r:nr,c:nc,capture:false}); 
        } else if(p==='S'){ 
          res.push({r:nr,c:nc,capture:true}); 
          break; 
        } else { 
          break; 
        } 
        nr+=dr; nc+=dc; 
      } 
    } 
    return res; 
  }

  function clickSquare(r:number,c:number){ 
    if(gameOver || !playerTurn) return; 
    const piece=board[r][c]; 
    const sel = selected?board[selected.r][selected.c]:null; 
    if(!selected){ 
      if(piece==='S'){ 
        setSelected({r,c}); 
        setLegal(genSheep(r,c)); 
      } 
      return; 
    } 
    if(piece==='S'){ 
      setSelected({r,c}); 
      setLegal(genSheep(r,c)); 
      return; 
    } 
    const t=legal.find(m=>m.r===r&&m.c===c); 
    if(t && sel==='S'){ 
      const nb=board.map(row=>row.slice()); 
      nb[selected!.r][selected!.c]=null; 
      const captured=nb[r][c]; 
      nb[r][c]='S'; 
      setBoard(nb); 
      setSelected(null); 
      setLegal([]); 
      play(aSheep.current); 
      if(captured==='W'){ 
        setGameOver(true); 
        setGameMessage("🎉 KAZANDIN! Kurt yakalandı! 🎉"); 
        play(aWin.current);
        
        // Oyun oturumu kaydı
        recordGameSession({
          gameId: 'kurt-vs-koyunlar',
          bookId: 'benim-kucuk-deneylerim',
          userId: 'guest',
          score: score + 100, // Kazanma bonusu
          duration: 0 // Gerçek süre hesaplanabilir
        });
        return; 
      } 
      if(r===0){ 
        setGameOver(true); 
        setGameMessage("🏆 KAZANDIN! Koyun en üste ulaştı! 🏆"); 
        play(aWin.current);
        
        // Oyun oturumu kaydı
        recordGameSession({
          gameId: 'kurt-vs-koyunlar',
          bookId: 'benim-kucuk-deneylerim',
          userId: 'guest',
          score: score + 100, // Kazanma bonusu
          duration: 0
        });
        return; 
      } 
      setScore(s=>s+1+(captured?3:0)); 
      setPlayerTurn(false); 
      // Use updated board state for wolf move
      setTimeout(() => wolfMove(nb), 220); 
    } 
  }

  function chooseApproach(q:{r:number,c:number}, moves:any[]){ const sheeps=listSheep(); if(!sheeps.length) return moves[0]; let best=moves[0]; let bestScore=Infinity; for(const m of moves){ const s=nearestSheepDistance({r:m.r,c:m.c}, sheeps); if(s<bestScore){bestScore=s; best=m;} } return best; }
  function wolfMove(currentBoard?: Piece[][]){ 
    if(gameOver) return; 
    const boardState = currentBoard || board;
    const q = findWolfInBoard(boardState); 
    if(!q){ setGameOver(true); play(aWin.current); return; } 
    const moves=genWolfInBoard(q.r,q.c, boardState); 
    if(!moves.length){ setGameOver(true); play(aWin.current); return; } 
    
    const captures=moves.filter(m=>m.capture); 
    let chosen:any; 
    
    if(captures.length){ 
      // Choose closest sheep to capture
      const sheeps = listSheepInBoard(boardState);
      chosen=captures.reduce((best:any,m:any)=>{
        const distBest = nearestSheepDistance({r:best.r,c:best.c}, sheeps);
        const distM = nearestSheepDistance({r:m.r,c:m.c}, sheeps);
        return distM < distBest ? m : best;
      }, captures[0]); 
    } else { 
      // Choose approach move
      chosen=chooseApproach(q,moves); 
    }
    
    const nb=boardState.map(row=>row.slice()); 
    const captured=nb[chosen.r][chosen.c]; 
    nb[q.r][q.c]=null; 
    nb[chosen.r][chosen.c]='W'; 
    setBoard(nb); 
    
    if(captured==='S') play(aCapture.current); 
    play(aWolf.current); 
    
    if(nb.flat().filter(p=>p==='S').length===0){ 
      setGameOver(true); 
      setGameMessage("😢 KAYBETTIN! Kurt tüm koyunları yakaladı! 😢"); 
      play(aLose.current);
      
      // Oyun oturumu kaydı
      recordGameSession({
        gameId: 'kurt-vs-koyunlar',
        bookId: 'benim-kucuk-deneylerim',
        userId: 'guest',
        score: score,
        duration: 0
      });
      return; 
    } 
    if(!anyMoveInBoard(nb)){ 
      setGameOver(true); 
      setGameMessage("😔 KAYBETTIN! Hamlen kalmadı! 😔"); 
      play(aLose.current);
      
      // Oyun oturumu kaydı
      recordGameSession({
        gameId: 'kurt-vs-koyunlar',
        bookId: 'benim-kucuk-deneylerim',
        userId: 'guest',
        score: score,
        duration: 0
      });
      return; 
    } 
    setPlayerTurn(true); 
  }

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">Sıra: {playerTurn?"🐑 Koyunlar":"🐺 Kurt"}</span>
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
        <div className="forest-bg">
          <div className="board-frame" ref={frameRef}>
            <div className="board" role="grid" aria-label="Tahta">
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
                    {piece && <div className={`piece ${piece==='S'?"sheep":"wolf"}`}>
                      <img src={piece==='S'?'/img/sheep_214840.png':'/img/werewolf_3384626.png'} alt={piece==='S'?'Koyun':'Kurt'} style={{width:'100%',height:'100%',objectFit:'contain'}} />
                    </div>}
                  </div>
                );
              }))}
            </div>
          </div>
          <div className="pond" />
        </div>
        <aside className="sidebar">
          <div className="game-info">
            <h3>🎯 Hedef</h3>
            <p>Koyunlar en üste ulaşırsa kazanır. Kurt tüm koyunları alırsa kaybedersin.</p>
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

      <audio ref={aSheep} src="/audio/goat-sound-177346.mp3" preload="auto"/>
      <audio ref={aWolf} src="/audio/dog-bark-382732.mp3" preload="auto"/>
      <audio ref={aCapture} src="/audio/goat-sound-177346.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/goat-sound-177346.mp3" preload="auto"/>
      <audio ref={aLose} src="/audio/dog-bark-382732.mp3" preload="auto"/>
    </>
  );
}

export default function KurtVsKoyunlarPage() {
  return (
    <AuthGuard requiredBookId="oyunlarla-satranc" gameId="kurt-vs-koyunlar">
      <Game />
    </AuthGuard>
  );
}
