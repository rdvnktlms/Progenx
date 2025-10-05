"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface Color {
  id: number;
  name: string;
  emoji: string;
  hex: string;
  order: number;
}

const rainbowColors: Color[] = [
  { id: 1, name: "Kırmızı", emoji: "🔴", hex: "#FF0000", order: 1 },
  { id: 2, name: "Turuncu", emoji: "🟠", hex: "#FFA500", order: 2 },
  { id: 3, name: "Sarı", emoji: "🟡", hex: "#FFFF00", order: 3 },
  { id: 4, name: "Yeşil", emoji: "🟢", hex: "#00FF00", order: 4 },
  { id: 5, name: "Mavi", emoji: "🔵", hex: "#0000FF", order: 5 },
  { id: 6, name: "İndigo", emoji: "🟣", hex: "#4B0082", order: 6 },
  { id: 7, name: "Mor", emoji: "🟣", hex: "#800080", order: 7 }
];

function GokkusagiRenkleriOyunu() {
  const [shuffledColors, setShuffledColors] = useState<Color[]>([]);
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState("Gökkuşağının renklerini doğru sıraya koy!");
  const [muted, setMuted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedColor, setDraggedColor] = useState<Color | null>(null);
  const [helpUsed, setHelpUsed] = useState(false);
  
  const aRainbow = useRef<HTMLAudioElement | null>(null);
  const aCorrect = useRef<HTMLAudioElement | null>(null);
  const aWrong = useRef<HTMLAudioElement | null>(null);
  const aWin = useRef<HTMLAudioElement | null>(null);
  
  const play = (el: HTMLAudioElement | null) => { 
    if(!muted && el){ 
      try { 
        el.currentTime = 0; 
        el.play(); 
      } catch {} 
    } 
  };

  useEffect(() => {
    shuffleColors();
  }, []);

  const shuffleColors = () => {
    const shuffled = [...rainbowColors].sort(() => Math.random() - 0.5);
    setShuffledColors(shuffled);
    setSelectedColors([]);
    setShowResult(false);
    setGameMessage("Gökkuşağının renklerini doğru sıraya koy!");
  };

  const selectColor = (color: Color) => {
    if (showResult || gameOver || selectedColors.some(c => c.id === color.id)) return;
    
    const newSelected = [...selectedColors, color];
    setSelectedColors(newSelected);
    
    if (newSelected.length === rainbowColors.length) {
      checkOrder();
    }
  };

  const checkOrder = () => {
    setShowResult(true);
    const isCorrect = selectedColors.every((color, index) => color.order === index + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 20);
      setGameMessage("🎉 Mükemmel! Gökkuşağı renklerini doğru sıraya koydun! 🎉");
      play(aCorrect.current);
    } else {
      setGameMessage("❌ Yanlış sıra! Tekrar dene! ❌");
      play(aWrong.current);
    }
    
    setTimeout(() => {
      if (round >= 3) {
        setGameOver(true);
        setGameMessage("🎮 Oyun bitti! Toplam puan: " + score + (isCorrect ? " + 20" : ""));
        play(aWin.current);
      } else {
        setRound(prev => prev + 1);
        shuffleColors();
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setSelectedColors([]);
    setShowResult(false);
    setHelpUsed(false);
    shuffleColors();
  };

  const useHelp = () => {
    if (helpUsed || showResult || gameOver) return;
    
    // Rastgele bir rengi doğru yerine yerleştir
    const availableSlots = [];
    for (let i = 0; i < 7; i++) {
      if (!selectedColors[i]) {
        availableSlots.push(i);
      }
    }
    
    if (availableSlots.length > 0) {
      const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
      const correctColor = rainbowColors[randomSlot];
      
      const newSelectedColors = [...selectedColors];
      newSelectedColors[randomSlot] = correctColor;
      setSelectedColors(newSelectedColors);
      
      // Rastgele yerleştirilen rengi shuffledColors'dan kaldır
      setShuffledColors(prev => prev.filter(color => color.id !== correctColor.id));
      
      setHelpUsed(true);
      setGameMessage("💡 Yardım kullanıldı! Bir renk doğru yerine yerleştirildi.");
    }
  };

  const removeColor = (colorId: number) => {
    if (showResult || gameOver) return;
    setSelectedColors(prev => prev.filter(c => c.id !== colorId));
  };

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🌈 Gökkuşağı Renkleri</span>
          <span className="game-message">{gameMessage}</span>
        </div>
        <div className="game-controls">
          <button 
            className={`control-btn help-btn ${helpUsed ? 'used' : ''}`} 
            onClick={useHelp} 
            disabled={helpUsed || showResult || gameOver}
            title={helpUsed ? "Yardım kullanıldı" : "Yardım al - Rastgele bir rengi yerleştir"}
          >
            {helpUsed ? "✅" : "💡"}
          </button>
          <button className="control-btn mute-btn" aria-pressed={muted} onClick={()=>setMuted(m=>!m)} title={muted?"Sesi Aç":"Sesi Kapat"}>
            {muted?"🔇":"🔊"}
          </button>
          <button className="control-btn new-game-btn" onClick={resetGame} title="Yeni Oyun">
            🔄
          </button>
        </div>
      </section>
      
      <section className="video-section">
        <div className="video-container">
          <h3>🎬 Gökkuşağı Nasıl Oluşur?</h3>
          <div className="video-player">
            <video 
              controls 
              poster="/img/gökkuşağı.png"
              className="weather-video"
              preload="metadata"
            >
              <source src="/videos/gökkuşağı.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="video-info">
              <h4>💡 Bilimsel Açıklama</h4>
              <p>Gökkuşağı, güneş ışığının su damlalarında kırılması ve yansıması sonucu oluşur. Beyaz ışık 7 renge ayrılır: kırmızı, turuncu, sarı, yeşil, mavi, lacivert, mor!</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="rainbow-game-scene">
        <div className="rainbow-area">
          <div className="rainbow-display">
            <h3>Gökkuşağı Sırası</h3>
            <div className="rainbow-slots">
              {Array.from({length: 7}).map((_, index) => (
                <div key={index} className="rainbow-slot">
                  {selectedColors[index] && (
                    <div 
                      className="selected-color"
                      style={{ backgroundColor: selectedColors[index].hex }}
                      onClick={() => removeColor(selectedColors[index].id)}
                    >
                      <span className="color-emoji">{selectedColors[index].emoji}</span>
                      <span className="color-name">{selectedColors[index].name}</span>
                    </div>
                  )}
                  <div className="slot-number">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="color-palette">
            <h3>Renkler</h3>
            <div className="color-grid">
              {shuffledColors.map((color) => (
                <button
                  key={color.id}
                  className={`color-btn ${selectedColors.some(c => c.id === color.id) ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => selectColor(color)}
                  disabled={selectedColors.some(c => c.id === color.id) || showResult || gameOver}
                >
                  <span className="color-emoji">{color.emoji}</span>
                  <span className="color-name">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <aside className="sidebar">
          <div className="game-info">
            <h3>🎯 Nasıl Oynanır?</h3>
            <p>Gökkuşağının renklerini doğru sıraya koy! Kırmızı, turuncu, sarı, yeşil, mavi, indigo, mor.</p>
          </div>
          
          <div className="score-card">
            <h4>📊 İstatistikler</h4>
            <div className="score-item">
              <span>Tur:</span>
              <span className="score-value">{round}/3</span>
            </div>
            <div className="score-item">
              <span>Puan:</span>
              <span className="score-value">{score}</span>
            </div>
          </div>
          
          <div className="rainbow-info">
            <h4>🌈 Gökkuşağı Bilgisi</h4>
            <p>Gökkuşağı, güneş ışığının su damlacıklarında kırılmasıyla oluşur. Her zaman aynı renk sırasında görünür.</p>
          </div>
          
          {gameOver && (
            <div className="game-over-card">
              <h4>🎮 Oyun Bitti</h4>
              <p>{gameMessage}</p>
              <button className="play-again-btn" onClick={resetGame}>
                🔄 Tekrar Oyna
              </button>
            </div>
          )}
        </aside>
      </section>

      <audio ref={aRainbow} src="/audio/rainbow-sound.mp3" preload="auto"/>
      <audio ref={aCorrect} src="/audio/correct-sound.mp3" preload="auto"/>
      <audio ref={aWrong} src="/audio/wrong-sound.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/win-sound.mp3" preload="auto"/>
    </>
  );
}

export default function GokkusagiRenkleriPage() {
  return (
    <AuthGuard requiredBookId="hava-olaylari" gameId="gokkusagi-renkleri">
      <GokkusagiRenkleriOyunu />
    </AuthGuard>
  );
}
