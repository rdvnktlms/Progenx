"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface ExperimentStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  materials: string[];
}

function FirlayanBalonOyunu() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ExperimentStep[]>([
    {
      id: 1,
      title: "İp Hazırlama",
      description: "İpten 2,20 m uzunluğunda bir parça kes ve bu parçayı çubuğun içinden geçir.",
      completed: false,
      materials: ["İp", "Makas", "Pipet"]
    },
    {
      id: 2,
      title: "İp Bağlama",
      description: "İpi iki sandalye arasına bağla.",
      completed: false,
      materials: ["İp", "2 Sandalye"]
    },
    {
      id: 3,
      title: "Balon Şişirme",
      description: "Balonu şişir, ağzını bir mandalla tuttur.",
      completed: false,
      materials: ["Balon", "Mandal"]
    },
    {
      id: 4,
      title: "Balon Sabitleme",
      description: "İpin üzerine yapışkan bantla sabitle ancak, çubuğun balonun uzanış yönünde olmasına dikkat et.",
      completed: false,
      materials: ["Yapışkan Bant", "Balon", "Pipet"]
    },
    {
      id: 5,
      title: "Hazırlık",
      description: "Balon ve çubuğu ipin bir ucuna doğru çek ve kendin de oraya geç.",
      completed: false,
      materials: []
    },
    {
      id: 6,
      title: "Fırlatma",
      description: "Mandalı çıkar. Balon ipin bir ucundan diğer ucuna doğru fırlayacaktır.",
      completed: false,
      materials: []
    }
  ]);
  
  const [muted, setMuted] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [balloonPosition, setBalloonPosition] = useState(5); // Sol sandalyeden başla
  const [isFlying, setIsFlying] = useState(false);
  const [direction, setDirection] = useState(1); // 1: sağa, -1: sola
  
  const aLaunch = useRef<HTMLAudioElement | null>(null);
  const aSuccess = useRef<HTMLAudioElement | null>(null);
  
  const play = (el: HTMLAudioElement | null) => { 
    if(!muted && el){ 
      try { 
        el.currentTime = 0; 
        el.play(); 
      } catch {} 
    } 
  };

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    
    if (stepId === 6) {
      setShowSimulation(true);
      play(aSuccess.current);
    }
  };

  const startSimulation = () => {
    setIsFlying(true);
    play(aLaunch.current);
    
    // Balon animasyonu
    let position = balloonPosition;
    const interval = setInterval(() => {
      position += 2 * direction; // Yönüne göre hareket et
      setBalloonPosition(position);
      
      // Sağa gidiyorsa ve sağ sandalyeye ulaştıysa
      if (direction === 1 && position >= 90) {
        clearInterval(interval);
        setIsFlying(false);
        setBalloonPosition(88); // Sağ sandalyede kal
        setDirection(-1); // Yönü sola çevir
      }
      // Sola gidiyorsa ve sol sandalyeye ulaştıysa
      else if (direction === -1 && position <= 5) {
        clearInterval(interval);
        setIsFlying(false);
        setBalloonPosition(5); // Sol sandalyede kal
        setDirection(1); // Yönü sağa çevir
      }
    }, 50);
  };

  const resetExperiment = () => {
    setCurrentStep(0);
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
    setShowSimulation(false);
    setBalloonPosition(5); // Sol sandalyeye geri dön
    setDirection(1); // Yönü sağa çevir
    setIsFlying(false);
  };

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🎈 Fırlayan Balon Deneyi</span>
          <span className="game-message">Gerçek deney yaparak hava basıncını öğren!</span>
        </div>
        <div className="game-controls">
          <button className="control-btn mute-btn" aria-pressed={muted} onClick={()=>setMuted(m=>!m)} title={muted?"Sesi Aç":"Sesi Kapat"}>
            {muted?"🔇":"🔊"}
          </button>
          <button className="control-btn new-game-btn" onClick={resetExperiment} title="Yeni Deney">
            🔄
          </button>
        </div>
      </section>
      
      <section className="real-experiment-scene">
        <div className="experiment-area">
          <div className="materials-section">
            <h3>🔧 Gerekenler</h3>
            <div className="materials-grid">
              <div className="material-item">
                <div className="material-icon">🥤</div>
                <span>Pipet veya çubuk</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🎈</div>
                <span>Balon</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📏</div>
                <span>Yapışkan bant</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📎</div>
                <span>Mandal</span>
              </div>
              <div className="material-item">
                <div className="material-icon">✂️</div>
                <span>Makas</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🧵</div>
                <span>İp (2,20m)</span>
              </div>
            </div>
            
            <div className="alternative-materials">
              <h4>💡 Alternatif Malzemeler</h4>
              <div className="alternatives-grid">
                <div className="alternative-item">
                  <div className="alternative-icon">🥤</div>
                  <div className="alternative-content">
                    <strong>Pipet yerine:</strong>
                    <ul>
                      <li>İnce boru</li>
                      <li>Küçük hortum</li>
                    </ul>
                  </div>
                </div>
                
                <div className="alternative-item">
                  <div className="alternative-icon">🧵</div>
                  <div className="alternative-content">
                    <strong>İp yerine:</strong>
                    <ul>
                      <li>Misina</li>
                      <li>Uçurtma ipi</li>
                    </ul>
                  </div>
                </div>
                
                <div className="alternative-item">
                  <div className="alternative-icon">📎</div>
                  <div className="alternative-content">
                    <strong>Mandal yerine:</strong>
                    <ul>
                      <li>Büro klipsi</li>
                      <li>Lastik bant</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="steps-section">
            <h3>📋 Deney Adımları</h3>
            <div className="steps-container">
              {steps.map((step, index) => (
                <div key={step.id} className={`step-card ${step.completed ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}>
                  <div className="step-number">{step.id}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    {step.materials.length > 0 && (
                      <div className="step-materials">
                        <strong>Gerekli:</strong> {step.materials.join(", ")}
                      </div>
                    )}
                    <button 
                      className="complete-btn"
                      onClick={() => completeStep(step.id)}
                      disabled={step.completed}
                    >
                      {step.completed ? "✅ Tamamlandı" : "Tamamla"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {showSimulation && (
            <div className="simulation-section">
              <h3>🚀 Simülasyon</h3>
              <div className="simulation-wrapper">
                <div className="simulation-area">
                  <div className="balloon-animation-container">
                    {/* Sol sandalye */}
                    <div className="chair left-chair">
                      <div className="chair-seat"></div>
                      <div className="chair-back"></div>
                      <div className="chair-legs">
                        <div className="leg leg-1"></div>
                        <div className="leg leg-2"></div>
                        <div className="leg leg-3"></div>
                        <div className="leg leg-4"></div>
                      </div>
                    </div>
                    
                    {/* Sağ sandalye */}
                    <div className="chair right-chair">
                      <div className="chair-seat"></div>
                      <div className="chair-back"></div>
                      <div className="chair-legs">
                        <div className="leg leg-1"></div>
                        <div className="leg leg-2"></div>
                        <div className="leg leg-3"></div>
                        <div className="leg leg-4"></div>
                      </div>
                    </div>
                    
                    {/* İp */}
                    <div className="string-line"></div>
                    
                    {/* Balon ve fare */}
                    <div 
                      className="balloon-with-mouse"
                      style={{ left: `${balloonPosition}%` }}
                    >
                      <div className="balloon">🎈</div>
                      <div className="mouse">🐭</div>
                    </div>
                  </div>
                  <button 
                    className="launch-btn"
                    onClick={startSimulation}
                    disabled={isFlying}
                  >
                    {isFlying ? "Uçuyor..." : "Fırlat!"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <aside className="sidebar">
          <div className="experiment-info">
            <h3>🔬 Bilimsel Açıklama</h3>
            <p>Hava önemli bir enerji kaynağıdır! Balonun içindeki hava sıkıştırılmış durumda. Mandal çıkarıldığında hava hızla dışarı çıkar ve itme kuvveti oluşturur.</p>
            <div className="science-fact">
              <h4>💡 Biliyor musun?</h4>
              <p>Eskiden Paris'te telefon yokken, "pnömatikler" kullanılırdı. Sıkıştırılmış hava ile mesajlar borular içinde taşınırdı!</p>
            </div>
          </div>
          
          <div className="progress-card">
            <h4>📊 İlerleme</h4>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {steps.filter(s => s.completed).length} / {steps.length} adım tamamlandı
            </span>
          </div>
          
          <div className="safety-tips">
            <h4>⚠️ Güvenlik İpuçları</h4>
            <ul>
              <li>Makas kullanırken dikkatli ol</li>
              <li>Balonu çok fazla şişirme</li>
              <li>İpi güvenli yerlere bağla</li>
              <li>Yetişkin yardımı al</li>
            </ul>
          </div>
        </aside>
      </section>

      <audio ref={aLaunch} src="/audio/launch-sound.mp3" preload="auto"/>
      <audio ref={aSuccess} src="/audio/success-sound.mp3" preload="auto"/>
    </>
  );
}

export default function FirlayanBalonPage() {
  return (
    <AuthGuard requiredBookId="benim-kucuk-deneylerim" gameId="firlayan-balon">
      <FirlayanBalonOyunu />
    </AuthGuard>
  );
}
