"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface WindDirection {
  id: number;
  name: string;
  angle: number;
  emoji: string;
}

const windDirections: WindDirection[] = [
  { id: 1, name: "Kuzey", angle: 0, emoji: "⬆️" },
  { id: 2, name: "Kuzeydoğu", angle: 45, emoji: "↗️" },
  { id: 3, name: "Doğu", angle: 90, emoji: "➡️" },
  { id: 4, name: "Güneydoğu", angle: 135, emoji: "↘️" },
  { id: 5, name: "Güney", angle: 180, emoji: "⬇️" },
  { id: 6, name: "Güneybatı", angle: 225, emoji: "↙️" },
  { id: 7, name: "Batı", angle: 270, emoji: "⬅️" },
  { id: 8, name: "Kuzeybatı", angle: 315, emoji: "↖️" }
];

function RuzgarYonuOyunu() {
  const [currentWind, setCurrentWind] = useState<WindDirection | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState("Rüzgarın yönünü tahmin et!");
  const [muted, setMuted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [windStrength, setWindStrength] = useState(0);
  
  // Video standart haliyle sola doğru hareket ediyor (Batı yönü)
  // Bu yüzden video döndürme açısını ayarlıyoruz
  const getVideoRotation = (windAngle: number) => {
    // Video sola doğru hareket ettiği için, rüzgar yönünü video yönüne göre ayarlıyoruz
    // Batı yönü (270°) video için 0° olmalı
    return windAngle - 270;
  };
  
  const aWind = useRef<HTMLAudioElement | null>(null);
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
    generateNewWind();
  }, []);

  const generateNewWind = () => {
    const randomIndex = Math.floor(Math.random() * windDirections.length);
    setCurrentWind(windDirections[randomIndex]);
    setSelectedDirection(null);
    setShowResult(false);
    setWindStrength(Math.random() * 3 + 1); // 1-4 arası rüzgar gücü
    setGameMessage("Rüzgarın yönünü tahmin et!");
  };

  const selectDirection = (directionId: number) => {
    if (showResult || gameOver) return;
    
    setSelectedDirection(directionId);
    setShowResult(true);
    
    if (directionId === currentWind?.id) {
      setScore(prev => prev + 10);
      setGameMessage("🎉 Doğru! Rüzgar " + currentWind?.name + " yönünden esiyor! 🎉");
      play(aCorrect.current);
    } else {
      setGameMessage("❌ Yanlış! Rüzgar " + currentWind?.name + " yönünden esiyor! ❌");
      play(aWrong.current);
    }
    
    setTimeout(() => {
      if (round >= 5) {
        setGameOver(true);
        setGameMessage("🎮 Oyun bitti! Toplam puan: " + (score + (directionId === currentWind?.id ? 10 : 0)));
        play(aWin.current);
      } else {
        setRound(prev => prev + 1);
        generateNewWind();
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setSelectedDirection(null);
    setShowResult(false);
    generateNewWind();
  };

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🌪️ Rüzgar Yönü Oyunu</span>
          <span className="game-message">{gameMessage}</span>
        </div>
        <div className="game-controls">
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
          <h3>🎬 Rüzgar Nasıl Oluşur?</h3>
          <div className="video-player">
            <video 
              controls 
              poster="/img/rüzgar poster.png"
              className="weather-video"
              preload="metadata"
            >
              <source src="/videos/rüzgar videosu.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="video-info">
              <h4>💡 Bilimsel Açıklama</h4>
              <p>Rüzgar, sıcak ve soğuk hava arasındaki basınç farkından oluşur. Sıcak hava yükselir, soğuk hava alçalır ve bu hareket rüzgarı oluşturur!</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="wind-game-scene">
        <div className="wind-compass">
          <div className="wind-video-container" style={{ backgroundColor: 'rgb(229, 229, 229)', background: 'rgb(229, 229, 229)' }}>
            <video 
              className="wind-video"
              style={{ 
                transform: `rotate(${currentWind ? getVideoRotation(currentWind.angle) : 0}deg)`,
                backgroundColor: 'rgb(229, 229, 229)',
                background: 'rgb(229, 229, 229)',
                filter: 'brightness(0.77) contrast(1.47) saturate(0.33)'
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/rüzgar yönü.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="wind-overlay">
              <div className="compass-center">
                <div className="compass-label">Rüzgar Yönü</div>
                <div className="wind-strength">Güç: {windStrength.toFixed(1)}</div>
              </div>
            </div>
          </div>
          
          <div className="compass-directions">
            {windDirections.map((direction) => (
              <button
                key={direction.id}
                className={`direction-btn ${selectedDirection === direction.id ? 'selected' : ''} ${showResult && direction.id === currentWind?.id ? 'correct' : ''} ${showResult && selectedDirection === direction.id && direction.id !== currentWind?.id ? 'wrong' : ''}`}
                onClick={() => selectDirection(direction.id)}
                disabled={showResult || gameOver}
              >
                <span className="direction-emoji">{direction.emoji}</span>
                <span className="direction-name">{direction.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <aside className="sidebar">
          <div className="game-info">
            <h3>🎯 Nasıl Oynanır?</h3>
            <p>Dönen rüzgar videosuna bak! Hangi yöne doğru esiyor? Doğru yönü seç ve puan kazan!</p>
          </div>
          
          <div className="score-card">
            <h4>📊 İstatistikler</h4>
            <div className="score-item">
              <span>Tur:</span>
              <span className="score-value">{round}/5</span>
            </div>
            <div className="score-item">
              <span>Puan:</span>
              <span className="score-value">{score}</span>
            </div>
          </div>
          
          <div className="wind-info">
            <h4>🌬️ Rüzgar Bilgisi</h4>
            <p>Rüzgar, havanın hareket etmesiyle oluşur. Yüksek basınçtan alçak basınca doğru eser.</p>
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

      <audio ref={aWind} src="/audio/wind-sound.mp3" preload="auto"/>
      <audio ref={aCorrect} src="/audio/correct-sound.mp3" preload="auto"/>
      <audio ref={aWrong} src="/audio/wrong-sound.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/win-sound.mp3" preload="auto"/>
    </>
  );
}

export default function RuzgarYonuPage() {
  return (
    <AuthGuard requiredBookId="hava-olaylari" gameId="ruzgar-yonu">
      <RuzgarYonuOyunu />
    </AuthGuard>
  );
}
