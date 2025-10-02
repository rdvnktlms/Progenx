"use client";
import { useState, useEffect, useRef } from 'react';

export default function KurtVsKoyunPage() {
  const [gameState, setGameState] = useState({
    board: Array(8).fill(null).map(() => Array(8).fill(null)),
    currentPlayer: 'sheep',
    selectedPiece: null,
    gameOver: false,
    winner: null,
    score: 0,
    bestScore: 0,
    difficulty: 'normal',
    muted: false
  });

  const [message, setMessage] = useState('');
  const boardRef = useRef(null);

  useEffect(() => {
    initializeGame();
    loadBestScore();
  }, []);

  const initializeGame = () => {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Koyunları yerleştir (alt sıra)
    for (let col = 0; col < 8; col++) {
      board[7][col] = { type: 'sheep', player: 'sheep' };
    }
    
    // Kurtu yerleştir (üst sıra ortada)
    board[0][3] = { type: 'wolf', player: 'wolf' };
    
    setGameState(prev => ({
      ...prev,
      board,
      currentPlayer: 'sheep',
      selectedPiece: null,
      gameOver: false,
      winner: null,
      score: 0
    }));
    
    setMessage('Koyunların sırası! Hedef: En üste ulaşmak');
  };

  const loadBestScore = () => {
    const saved = localStorage.getItem('kurt-vs-koyun-best');
    if (saved) {
      setGameState(prev => ({ ...prev, bestScore: parseInt(saved) }));
    }
  };

  const saveBestScore = (score) => {
    if (score > gameState.bestScore) {
      localStorage.setItem('kurt-vs-koyun-best', score.toString());
      setGameState(prev => ({ ...prev, bestScore: score }));
    }
  };

  const handleCellClick = (row, col) => {
    if (gameState.gameOver) return;

    const cell = gameState.board[row][col];
    
    if (gameState.selectedPiece) {
      // Hareket etmeye çalış
      const { row: fromRow, col: fromCol } = gameState.selectedPiece;
      if (canMove(fromRow, fromCol, row, col)) {
        movePiece(fromRow, fromCol, row, col);
      } else {
        setMessage('Geçersiz hareket!');
      }
      setGameState(prev => ({ ...prev, selectedPiece: null }));
    } else if (cell && cell.player === gameState.currentPlayer) {
      // Taş seç
      setGameState(prev => ({ ...prev, selectedPiece: { row, col } }));
      setMessage(`${cell.type === 'sheep' ? 'Koyun' : 'Kurt'} seçildi. Hareket etmek için bir kareye tıklayın.`);
    }
  };

  const canMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = gameState.board[fromRow][fromCol];
    if (!piece) return false;

    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;

    if (piece.type === 'sheep') {
      // Koyun sadece ileri gidebilir
      if (rowDiff !== -1) return false;
      if (Math.abs(colDiff) > 1) return false;
      
      // Çapraz hareket sadece yakalama için
      if (colDiff !== 0) {
        const target = gameState.board[toRow][toCol];
        return target && target.player === 'wolf';
      }
      
      // Düz hareket sadece boş kareye
      return !gameState.board[toRow][toCol];
    } else if (piece.type === 'wolf') {
      // Kurt her yöne gidebilir
      if (Math.abs(rowDiff) > 1 || Math.abs(colDiff) > 1) return false;
      if (rowDiff === 0 && colDiff === 0) return false;
      
      const target = gameState.board[toRow][toCol];
      return !target || target.player === 'sheep';
    }

    return false;
  };

  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = gameState.board.map(row => [...row]);
    const piece = newBoard[fromRow][fromCol];
    
    // Yakalama kontrolü
    const captured = newBoard[toRow][toCol];
    if (captured && captured.player !== piece.player) {
      if (!gameState.muted) {
        // Ses efekti (basit)
        console.log('Yakalama sesi!');
      }
    }
    
    newBoard[toRow][toCol] = piece;
    newBoard[fromRow][fromCol] = null;
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === 'sheep' ? 'wolf' : 'sheep'
    }));
    
    checkGameEnd(newBoard);
  };

  const checkGameEnd = (board) => {
    // Koyunların üst sıraya ulaşıp ulaşmadığını kontrol et
    for (let col = 0; col < 8; col++) {
      if (board[0][col] && board[0][col].type === 'sheep') {
        setGameState(prev => ({
          ...prev,
          gameOver: true,
          winner: 'sheep',
          score: prev.score + 100
        }));
        saveBestScore(gameState.score + 100);
        setMessage('🎉 Tebrikler! Koyunlar kazandı!');
        return;
      }
    }
    
    // Koyun sayısını kontrol et
    let sheepCount = 0;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] && board[row][col].type === 'sheep') {
          sheepCount++;
        }
      }
    }
    
    if (sheepCount === 0) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        winner: 'wolf'
      }));
      setMessage('😞 Kurt kazandı! Tüm koyunları yakaladı.');
      return;
    }
    
    // Sıra mesajı
    const nextPlayer = gameState.currentPlayer === 'sheep' ? 'wolf' : 'sheep';
    setMessage(`${nextPlayer === 'sheep' ? 'Koyunların' : 'Kurdun'} sırası!`);
  };

  const resetGame = () => {
    initializeGame();
  };

  const toggleMute = () => {
    setGameState(prev => ({ ...prev, muted: !prev.muted }));
  };

  const changeDifficulty = (difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
    resetGame();
  };

  return (
    <>
      <section className="hero">
        <h2>🐺 Kurt vs Koyunlar</h2>
        <p>Stratejik düşünme oyunu - Koyunları koruyarak en üste ulaşın!</p>
      </section>

      <section className="game-section">
        <div className="game-controls">
          <div className="game-status">
            <span className="turn-label">
              Sıra: {gameState.currentPlayer === 'sheep' ? 'Koyunlar' : 'Kurt'}
            </span>
            <span className="game-message">{message}</span>
          </div>
          
          <div className="control-buttons">
            <label className="difficulty-select">
              Zorluk:
              <select 
                value={gameState.difficulty}
                onChange={(e) => changeDifficulty(e.target.value)}
              >
                <option value="easy">Kolay</option>
                <option value="normal">Orta</option>
                <option value="hard">Zor</option>
              </select>
            </label>
            
            <button 
              className="mute-btn"
              onClick={toggleMute}
            >
              {gameState.muted ? '🔇 Ses Kapalı' : '🔊 Ses Açık'}
            </button>
            
            <button 
              className="reset-btn"
              onClick={resetGame}
            >
              ↺ Yeni Oyun
            </button>
          </div>
        </div>

        <div className="game-board-container">
          <div className="game-board" ref={boardRef}>
            {gameState.board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`board-cell ${
                    gameState.selectedPiece?.row === rowIndex && 
                    gameState.selectedPiece?.col === colIndex ? 'selected' : ''
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && (
                    <div className={`game-piece ${cell.type} ${cell.player}`}>
                      {cell.type === 'sheep' ? '🐑' : '🐺'}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="game-sidebar">
          <div className="game-rules">
            <h3>Oyun Kuralları</h3>
            <p><strong>Hedef:</strong> Koyunlar en üste ulaşırsa kazanır. Kurt tüm koyunları alırsa kaybedersin.</p>
            <ul>
              <li>🐑 Koyun: İleri 1 kare, çapraz ileri yakalar</li>
              <li>🐺 Kurt: Her yönde gider ve yakalar</li>
            </ul>
          </div>
          
          <div className="score-panel">
            <h3>Puan</h3>
            <div className="score-item">
              Oyun: <span>{gameState.score}</span>
            </div>
            <div className="score-item">
              Rekor: <span>{gameState.bestScore}</span>
            </div>
          </div>
        </div>
      </section>

      {gameState.gameOver && (
        <div className="game-over-modal">
          <div className="modal-content">
            <h2>
              {gameState.winner === 'sheep' ? '🎉 Tebrikler!' : '😞 Oyun Bitti!'}
            </h2>
            <p>
              {gameState.winner === 'sheep' 
                ? 'Koyunlar kazandı! En üste ulaştınız!' 
                : 'Kurt kazandı! Tüm koyunları yakaladı.'
              }
            </p>
            <div className="modal-buttons">
              <button onClick={resetGame} className="play-again-btn">
                Tekrar Oyna
              </button>
              <a href="/kitaplar/benim-kucuk-deneylerim" className="back-to-book-btn">
                Kitaba Dön
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
