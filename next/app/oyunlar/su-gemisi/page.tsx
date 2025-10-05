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

function SuGemisiOyunu() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ExperimentStep[]>([
    {
      id: 1,
      title: "Bardak Deliği",
      description: "Makas yardımıyla plastik bardağın altına, körüklü pipetle aynı çapta bir delik aç.",
      completed: false,
      materials: ["Plastik bardak", "Makas", "Körüklü pipet"]
    },
    {
      id: 2,
      title: "Kap Deliği",
      description: "Plastik kabın altına da aynı çapta bir delik aç.",
      completed: false,
      materials: ["Plastik kap", "Makas"]
    },
    {
      id: 3,
      title: "Pipet Yapıştırma",
      description: "Düz olan iki pipeti şekildeki gibi, plastik bardağın altına yapıştır.",
      completed: false,
      materials: ["2 düz pipet", "Yapışkan bant", "Plastik bardak"]
    },
    {
      id: 4,
      title: "Körüklü Pipet Geçirme",
      description: "Körüklü pipeti bardaktaki ve plastik kaptaki delikten geçir. Bardağın içinden 3 cm'den fazla bir parça çıkarsa bunu makasla kes.",
      completed: false,
      materials: ["Körüklü pipet", "Makas"]
    },
    {
      id: 5,
      title: "Bardak Yerleştirme",
      description: "Bardağı, plastik kabın kenarlarına oturt.",
      completed: false,
      materials: ["Plastik bardak", "Plastik kap"]
    },
    {
      id: 6,
      title: "Pipet Katlama",
      description: "Pipetin plastik kabın altında kalan diğer ucunu katla.",
      completed: false,
      materials: ["Körüklü pipet"]
    },
    {
      id: 7,
      title: "Su Hazırlama",
      description: "Bir kaba veya küvete yaklaşık 10 cm yüksekliğinde su koy.",
      completed: false,
      materials: ["Büyükçe bir kap ya da küvet", "Su"]
    },
    {
      id: 8,
      title: "Gemi Fırlatma",
      description: "Şişeyle bardağa dikkatlice su doldur. Gemi su üzerinde tek başına yol alacaktır.",
      completed: false,
      materials: ["Plastik şişe", "Su"]
    }
  ]);
  
  const [muted, setMuted] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [shipPosition, setShipPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [waterLevel, setWaterLevel] = useState(10);
  
  const wavesAudioRef = useRef<HTMLAudioElement>(null);
  

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    
    if (stepId === 8) {
      setShowSimulation(true);
    }
  };

  const startSimulation = () => {
    setIsMoving(true);
    
    // Waves sesini çal
    if (wavesAudioRef.current && !muted) {
      wavesAudioRef.current.currentTime = 0;
      wavesAudioRef.current.play().catch(console.error);
    }
    
    // Dalga ile senkronize gemi hareket animasyonu
    const shipWavePosition = document.getElementById('shipWavePosition');
    
    if (shipWavePosition) {
      // Gemi hareket animasyonu
      let shipX = 0;
      let direction = 1;
      let waveOffset = 0;
      
      const moveInterval = setInterval(() => {
        shipX += direction * 1.5;
        waveOffset += 0.3;
        
        // Gemi pozisyonunu güncelle (daha gerçekçi dalga efekti)
        const waveY = Math.sin(waveOffset * 0.8) * 2 + Math.sin(waveOffset * 1.5) * 1;
        shipWavePosition.style.transform = `translate(${shipX}px, ${waveY}px)`;
        
        // Ekran dışına çıktığında yön değiştir
        if (shipX > 250 || shipX < -20) {
          direction *= -1;
          // Gemi yönünü değiştir
          const shipDirection = document.getElementById('shipDirection');
          if (shipDirection) {
            shipDirection.style.transform = direction > 0 ? 'scale(1, 1)' : 'scale(-1, 1)';
          }
        }
      }, 50);
      
      // 8 saniye sonra dur
      setTimeout(() => {
        clearInterval(moveInterval);
        setIsMoving(false);
        // Gemi pozisyonunu sıfırla
        shipWavePosition.style.transform = 'translate(0px, 0px)';
        // Waves sesini durdur
        if (wavesAudioRef.current) {
          wavesAudioRef.current.pause();
        }
      }, 8000);
    }
  };

  const resetExperiment = () => {
    setCurrentStep(0);
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
    setShowSimulation(false);
    setShipPosition(0);
    setIsMoving(false);
  };

  return (
    <>
      <audio ref={wavesAudioRef} preload="auto">
        <source src="/audio/waves-crashing-397977.mp3" type="audio/mpeg" />
      </audio>
      
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🚢 Su Gemisi Deneyi</span>
          <span className="game-message">Bileşik kaplar prensibi ile gemi yap!</span>
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
      
      <section className="real-ship-experiment-scene">
        <div className="experiment-area">
          <div className="materials-section">
            <h3>🔧 Gerekenler</h3>
            <div className="materials-grid">
              <div className="material-item">
                <div className="material-icon">🥤</div>
                <span>Plastik bardak</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🥤</div>
                <span>Körüklü pipet</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📦</div>
                <span>Plastik kap</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📏</div>
                <span>Yapışkan bant</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📏</div>
                <span>Cetvel</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🥤</div>
                <span>2 düz pipet</span>
              </div>
              <div className="material-item">
                <div className="material-icon">✂️</div>
                <span>Makas</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🛁</div>
                <span>Büyükçe bir kap ya da küvet</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🍼</div>
                <span>Plastik şişe</span>
              </div>
              <div className="material-item">
                <div className="material-icon">💧</div>
                <span>Su</span>
              </div>
            </div>
            
            <div className="alternative-materials">
              <h4>💡 Alternatif Malzemeler</h4>
              <div className="alternatives-grid">
                <div className="alternative-item">
                  <div className="alternative-icon">✂️</div>
                  <div className="alternative-content">
                    <strong>Makas yerine:</strong>
                    <ul>
                      <li>Keskin bıçak (dikkatli kullanın!)</li>
                      <li>Matkap</li>
                    </ul>
                  </div>
                </div>
                
                <div className="alternative-item">
                  <div className="alternative-icon">🥤</div>
                  <div className="alternative-content">
                    <strong>Plastik bardak yerine:</strong>
                    <ul>
                      <li>Yoğurt kabı</li>
                      <li>Margarin kabı</li>
                    </ul>
                  </div>
                </div>
                
                <div className="alternative-item">
                  <div className="alternative-icon">🔧</div>
                  <div className="alternative-content">
                    <strong>Yapışkan bant yerine:</strong>
                    <ul>
                      
                      <li>Çift taraflı bant</li>
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
              <h3>🚢 Simülasyon</h3>
              <div className="simulation-wrapper">
                <div className="simulation-area">
                  <div className="ship-animation-container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="ship-animation">
                    <defs>
                      <svg id="boat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <defs>
                          <style>
                            {`.cls-1, .cls-4 { fill: #8c6239; }
                            .cls-1, .cls-2, .cls-4, .cls-5 { stroke: #42210b; stroke-linecap: round; stroke-linejoin: round; }
                            .cls-2 { fill: #4d4d4d; }
                            .cls-3 { fill: #1a1a1a; }
                            .cls-5 { fill: #e6e6e6; }`}
                          </style>
                        </defs>
                        <title>ship</title>
                        <path id="body" className="cls-1" d="M86.7,55c-9.2.7,2.6,43.2-45.2,43.2-25.8,0-29.5-27-30-39.2C11.4,56.1,5,55.6,5,55.6L3.7,38.7l-2-4.6H6.5l4,4.6H22.9s5.4,12.2,9.3,12.7,2.8,7,2.8,7H70.3s1-9,5.4-9c16.9,0,22.3-2.9,22.3-2.9S102.7,53.7,86.7,55Z"/>
                        <circle className="cls-2" cx="34.4" cy="71.7" r="4.5"/>
                        <circle className="cls-2" cx="49.3" cy="71.7" r="4.5"/>
                        <circle className="cls-2" cx="64.2" cy="71.7" r="4.5"/>
                        <polygon className="cls-2" points="25.8 52.5 14 52.5 16.5 42.4 20.5 42.4 25.8 52.5"/>
                        <path id="flag" className="cls-3" d="M50.3,1.1L50.1,13.5S43.8,6.7,27.1,6.7C36.6,0.5,50.3,1.1,50.3,1.1Z"/>
                        <polygon id="mast" className="cls-4" points="50.2 1 52.2 1 56.1 58.3 49.2 58.3 50.2 1"/>
                        <polygon className="cls-2" points="11.6 52.5 7.6 52.5 7.1 42.4 14 42.4 11.6 52.5"/>
                        <path id="sail" className="cls-5" d="M71.7,48.8c-1.2,1.6-6-.8-16.4,2S34.7,62.4,26.9,62.4c3.6-10.2,10.2-36.6-2.1-49C46.2,8.3,64.6,6.6,67.7,8.1,90.2,18.6,74,45.7,71.7,48.8Z"/>
                      </svg>
                      
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor:"rgb(0,160,230)", stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"rgb(0,140,230)", stopOpacity:1}} />
                      </linearGradient>
                      
                      <symbol id="wave">
                        <path className="waveBody" d="M0,60H100l0.2-38C78.6,43.6,60.7,35.8,50.5,18.3,39.9,35.7,21.6,43.6,0,22V60Z"/>
                        <path className="waveSurface" d="M0,22c21.6,21.6,39.9,13.7,50.5-3.7C60.7,35.8,78.6,43.6,100.2,22"/>
                      </symbol>

                      <pattern id="patternLeft" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <use x="0" y="0" href="#wave" />
                      </pattern>

                      <pattern id="patternRight" x="0" y="50" width="100" height="100" patternUnits="userSpaceOnUse">
                        <use x="0" y="0" href="#wave" />
                      </pattern>

                      <pattern id="patternMask" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <use x="0" y="0" href="#wave" />
                      </pattern>
                    </defs>

                    <title>Ships Ahoy!</title>

                    <rect className="pattern1" x="0" y="0" width="100%" height="100%" fill="url(#patternLeft)" />

                    <rect className="pattern2" x="0" y="0" width="100%" height="100%" fill="url(#patternRight)" />

                    <g id="shipMasterPosition" transform="translate(0, 60)">
                      <g id="shipWavePosition" transform="translate(0, 0)">
                        <g id="shipTranslation" x="0" y="0">
                          <g id="shipDirection" transform="scale(1, 1)">
                            <use id="ship" x="0" y="0" width="60" height="60" href="#boat" />
                          </g>
                        </g>
                      </g>
                    </g>

                    <g id="shipMask" transform="translate(0, 80)">
                      <rect className="pattern3" x="0" y="0" width="100%" height="40" fill="url(#patternMask)" />
                    </g>
                  </svg>
                  </div>
                  <button 
                    className="launch-btn"
                    onClick={startSimulation}
                    disabled={isMoving}
                  >
                    {isMoving ? "Hareket ediyor..." : "Gemi Fırlat!"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <aside className="sidebar">
          <div className="experiment-info">
            <h3>🔬 Bilimsel Açıklama</h3>
            <p>Gemilerin nasıl hareket ettiğini biliyor muydun? Bu deneyde "bileşik kaplar" prensibini kullanıyoruz!</p>
            <div className="science-fact">
              <h4>💡 Biliyor musun?</h4>
              <p>Üstteki bardaktaki su ile alttaki kaptaki su seviyesini eşitlemeye çalışır. Bu sırada pipetten akan su, gemiyi ileri doğru iter!</p>
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
              <li>Delik açarken yaralanma</li>
              <li>Su dökerken dikkatli ol</li>
              <li>Yetişkin yardımı al</li>
            </ul>
          </div>
        </aside>
      </section>

    </>
  );
}

export default function SuGemisiPage() {
  return (
    <AuthGuard requiredBookId="benim-kucuk-deneylerim" gameId="su-gemisi">
      <SuGemisiOyunu />
    </AuthGuard>
  );
}
