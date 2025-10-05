"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface WaterParticle {
  id: number;
  x: number;
  y: number;
  state: 'liquid' | 'vapor' | 'cloud';
  isAnimating: boolean;
}

function YagmurBulutuOyunu() {
  const [particles, setParticles] = useState<WaterParticle[]>([]);
  const [currentStep, setCurrentStep] = useState<'evaporation' | 'condensation' | 'precipitation'>('evaporation');
  const [gameMessage, setGameMessage] = useState("Güneş ışığı ile deniz suyunu buharlaştır!");
  const [muted, setMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedParticle, setDraggedParticle] = useState<WaterParticle | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [cycleCount, setCycleCount] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const aRain = useRef<HTMLAudioElement | null>(null);
  const aSuccess = useRef<HTMLAudioElement | null>(null);
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
    // Create initial water particles in liquid state
    const initialParticles: WaterParticle[] = [];
    for(let i = 0; i < 8; i++) {
      initialParticles.push({
        id: i,
        x: 50 + (i * 40),
        y: 300,
        state: 'liquid',
        isAnimating: false
      });
    }
    setParticles(initialParticles);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, particle: WaterParticle) => {
    if (particle.isAnimating) return;
    
    setIsDragging(true);
    setDraggedParticle(particle);
    
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - particle.x,
        y: e.clientY - rect.top - particle.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedParticle) return;
    
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      setParticles(prev => prev.map(p => 
        p.id === draggedParticle.id 
          ? { ...p, x: newX, y: newY }
          : p
      ));
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || !draggedParticle) return;
    
    setIsDragging(false);
    
    const currentParticle = particles.find(p => p.id === draggedParticle.id);
    if (!currentParticle) {
      setDraggedParticle(null);
      return;
    }
    
    // Check if particle is in the correct area for current step
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    let isCorrectArea = false;
    let newState: 'liquid' | 'vapor' | 'cloud' = currentParticle.state;
    
    // Check if particle is in the correct interactive area
    const sunArea = { x: 20, y: 20, width: 100, height: 100 };
    const cloudArea = { x: rect.width/2 - 75, y: 30, width: 150, height: 80 };
    const groundArea = { x: rect.width/2 - 100, y: rect.height - 100, width: 200, height: 80 };
    
    if (currentStep === 'evaporation' && 
        currentParticle.x >= sunArea.x && currentParticle.x <= sunArea.x + sunArea.width &&
        currentParticle.y >= sunArea.y && currentParticle.y <= sunArea.y + sunArea.height) {
      // Sun area - evaporation
      isCorrectArea = true;
      newState = 'vapor';
      setGameMessage("Harika! Su buharlaştı! Şimdi bulut bölgesine götür!");
      setCurrentStep('condensation');
    } else if (currentStep === 'condensation' && 
               currentParticle.x >= cloudArea.x && currentParticle.x <= cloudArea.x + cloudArea.width &&
               currentParticle.y >= cloudArea.y && currentParticle.y <= cloudArea.y + cloudArea.height) {
      // Cloud area - condensation
      isCorrectArea = true;
      newState = 'cloud';
      setGameMessage("Mükemmel! Su yoğunlaştı! Şimdi yağmur olarak düşür!");
      setCurrentStep('precipitation');
    } else if (currentStep === 'precipitation' && 
               currentParticle.x >= groundArea.x && currentParticle.x <= groundArea.x + groundArea.width &&
               currentParticle.y >= groundArea.y && currentParticle.y <= groundArea.y + groundArea.height) {
      // Ground area - precipitation
      isCorrectArea = true;
      newState = 'liquid';
      setGameMessage("Tebrikler! Yağmur denize düştü! Tekrar başla!");
      setCycleCount(prev => prev + 1);
      setCurrentStep('evaporation');
    }
    
    if (isCorrectArea) {
      setParticles(prev => prev.map(p => 
        p.id === draggedParticle.id 
          ? { ...p, state: newState, isAnimating: true }
          : p
      ));
      
      // Reset animation after 1 second
      setTimeout(() => {
        setParticles(prev => prev.map(p => 
          p.id === draggedParticle.id 
            ? { ...p, isAnimating: false }
            : p
        ));
      }, 1000);
      
      play(aSuccess.current);
    } else {
      // Return to original position
      setParticles(prev => prev.map(p => 
        p.id === draggedParticle.id 
          ? { ...p, x: 50 + (p.id * 40), y: 300 }
          : p
      ));
    }
    
    setDraggedParticle(null);
  };

  const resetGame = () => {
    const newParticles: WaterParticle[] = [];
    for(let i = 0; i < 8; i++) {
      newParticles.push({
        id: i,
        x: 50 + (i * 40),
        y: 300,
        state: 'liquid',
        isAnimating: false
      });
    }
    setParticles(newParticles);
    setCurrentStep('evaporation');
    setGameMessage("Güneş ışığı ile deniz suyunu buharlaştır!");
    setCycleCount(0);
  };

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🌧️ Yağmur Bulutu Oyunu</span>
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
          <h3>🎬 Yağmur Nasıl Oluşur?</h3>
          <div className="video-player">
            <video 
              controls 
              poster="/img/yağmur poster.png"
              className="weather-video"
              preload="metadata"
            >
              <source src="/videos/yağmur videosu.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="video-info">
              <h4>💡 Bilimsel Açıklama</h4>
              <p>Su buharı yükselir ve soğuk havada yoğunlaşarak bulutları oluşturur. Bulutlardaki su damlaları büyüdükçe ağırlaşır ve yağmur olarak düşer!</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="water-cycle-scene">
        <div className="cycle-background">
          <div 
            className="cycle-game-area" 
            ref={gameAreaRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Interactive areas */}
            <div className="interactive-sun" title="Güneş - Suyu buharlaştır"></div>
            <div className="interactive-cloud" title="Bulut - Buharı yoğunlaştır"></div>
            <div className="interactive-ground" title="Deniz - Yağmuru topla"></div>
            
            {/* Water particles */}
            {particles.map(particle => (
              <div
                key={particle.id}
                className={`water-particle ${particle.state} ${particle.isAnimating ? 'animating' : ''}`}
                style={{
                  left: particle.x,
                  top: particle.y,
                  cursor: particle.isAnimating ? 'default' : 'grab'
                }}
                onMouseDown={(e) => handleMouseDown(e, particle)}
              >
                {particle.state === 'liquid' ? '💧' : 
                 particle.state === 'vapor' ? '💨' : '☁️'}
              </div>
            ))}
            
            {/* Step indicators */}
            <div className="step-indicators">
              <div className={`step-indicator ${currentStep === 'evaporation' ? 'active' : ''}`}>
                <div className="step-icon">☀️</div>
                <div className="step-text">Denizden Buharlaşma</div>
              </div>
              <div className={`step-indicator ${currentStep === 'condensation' ? 'active' : ''}`}>
                <div className="step-icon">☁️</div>
                <div className="step-text">Yoğunlaşma</div>
              </div>
              <div className={`step-indicator ${currentStep === 'precipitation' ? 'active' : ''}`}>
                <div className="step-icon">🌧️</div>
                <div className="step-text">Denize Yağış</div>
              </div>
            </div>
          </div>
        </div>
        
        <aside className="sidebar">
          <div className="cycle-info">
            <h3>🌧️ Yağmur Döngüsü</h3>
            <p>Su parçacıklarını sürükleyerek denizden yağmur döngüsünü oluştur!</p>
            <div className="cycle-steps">
              <div className={`step ${currentStep === 'evaporation' ? 'active' : ''}`}>
                <span className="step-icon">☀️</span>
                <span className="step-text">1. Denizden Buharlaşma</span>
              </div>
              <div className={`step ${currentStep === 'condensation' ? 'active' : ''}`}>
                <span className="step-icon">☁️</span>
                <span className="step-text">2. Yoğunlaşma</span>
              </div>
              <div className={`step ${currentStep === 'precipitation' ? 'active' : ''}`}>
                <span className="step-icon">🌧️</span>
                <span className="step-text">3. Denize Yağış</span>
              </div>
            </div>
          </div>
          
          <div className="cycle-stats">
            <h4>📊 İstatistikler</h4>
            <div className="stat-item">
              <span>Tamamlanan Döngü:</span>
              <span className="stat-value">{cycleCount}</span>
            </div>
            <div className="stat-item">
              <span>Mevcut Adım:</span>
              <span className="stat-value">
                {currentStep === 'evaporation' ? 'Denizden Buharlaşma' :
                 currentStep === 'condensation' ? 'Yoğunlaşma' : 'Denize Yağış'}
              </span>
            </div>
          </div>
          
          <div className="cycle-tips">
            <h4>💡 İpuçları</h4>
            <ul>
              <li>Su parçacıklarını güneşe götür</li>
              <li>Buharı bulut bölgesine taşı</li>
              <li>Buluttan denize düşür</li>
              <li>Döngüyü tekrarla!</li>
            </ul>
          </div>
        </aside>
      </section>

      <audio ref={aRain} src="/audio/rain-sound.mp3" preload="auto"/>
      <audio ref={aSuccess} src="/audio/success-sound.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/win-sound.mp3" preload="auto"/>
    </>
  );
}

export default function YagmurBulutuPage() {
  return (
    <AuthGuard requiredBookId="hava-olaylari" gameId="yagmur-bulutu">
      <YagmurBulutuOyunu />
    </AuthGuard>
  );
}
