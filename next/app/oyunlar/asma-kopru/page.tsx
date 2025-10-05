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

function AsmaKopruOyunu() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ExperimentStep[]>([
    {
      id: 1,
      title: "Karton Kesimi",
      description: "Makasla ambalaj kartonundan 40 x 34 cm ölçülerinde iki parça kes ve her bir parçanın üzerine 20 x 19 cm ebatlarında şekildeki gibi bir alan çiz (kartonun altından ve üstünden 10'ar cm boşluk bırak).",
      completed: false,
      materials: ["Ambalaj kartonu", "Makas", "Cetvel", "Kalem"]
    },
    {
      id: 2,
      title: "Üçgen Çentikler",
      description: "Büyük bir parçanın üzerine üçgen çentikler yap. Üçgenin tabanı yaklaşık 1 cm, üst köşesi açık uçtan 19 cm olmalıdır.",
      completed: false,
      materials: ["Makas", "Cetvel"]
    },
    {
      id: 3,
      title: "Köprü Parçalarını Birleştirme",
      description: "Birleştirmek için, iki kesilmiş parçayı üstten yapışkan bantla birleştirerek köprüyü oluştur.",
      completed: false,
      materials: ["Yapışkan bant", "Kesilmiş parçalar"]
    },
    {
      id: 4,
      title: "Kutuya Delik Açma",
      description: "Kutunun kapalı kenarından 2 cm uzaklıkta burgu ile iki delik aç.",
      completed: false,
      materials: ["Burgu", "Kutu"]
    },
    {
      id: 5,
      title: "İkizkenar Üçgenler",
      description: "Gönye yardımıyla ambalaj kartonundan 4 tane ikizkenar üçgen kes. Eşkenar kenarlar 6 cm, diğer kenar 4 cm olmalıdır. Sonra bunları ikişer ikişer birbirlerinin üzerine yapıştır.",
      completed: false,
      materials: ["Gönye", "Makas", "Beyaz yapıştırıcı", "Karton"]
    },
    {
      id: 6,
      title: "Orta Parçalar",
      description: "Eni ve boyu 4,5'er cm olan iki tane orta biçimli parça kes ve bunları yapıştırıcıyla makaraların ucuna sabitle.",
      completed: false,
      materials: ["Makas", "Beyaz yapıştırıcı", "Makaralar"]
    },
    {
      id: 7,
      title: "Çubuk ve Makara",
      description: "Çubuğun iki tarafından da birer makara geçir ve hamur parçalarıyla bunu sabitle.",
      completed: false,
      materials: ["2 adet çubuk", "Makaralar", "Oyun hamuru"]
    },
    {
      id: 8,
      title: "İp Bağlama",
      description: "75 cm lik ip parçası kes. İplerin uçlarından birine birer düğüm at ve bunları köprü üzerinde yaptığın deliklerden geçir.",
      completed: false,
      materials: ["İp", "Makas"]
    },
    {
      id: 9,
      title: "İp Geçirme",
      description: "Bu ipleri köprü üzerinde dik duran parçanın üstündeki deliklerden birinden geçir ve ipin diğer ucunu da yapıştırıcıyla makara üzerine sabitle. İpin artan miktarını makaralara sar.",
      completed: false,
      materials: ["İp", "Beyaz yapıştırıcı", "Makaralar"]
    },
    {
      id: 10,
      title: "Köprü Montajı",
      description: "Köprüyü şekildeki gibi, boşluğun içinden geçir. Asma köprünü desteklemek için, köprünün her kenarına birer üçgeni 4 cm ölçüsündeki kenarından yapıştırarak sabitle.",
      completed: false,
      materials: ["Beyaz yapıştırıcı", "Üçgenler"]
    },
    {
      id: 11,
      title: "Vidalı Burgu",
      description: "İp üstte sarılıyken makaranın tek başına dönmesini engellemek için sol taraftaki makaraya dışından bir vidalı burgu batır. Köprünü alçaltmak için bunu diklemesine yerleştir.",
      completed: false,
      materials: ["Vidalı burgu"]
    },
    {
      id: 12,
      title: "Süsleme",
      description: "Sonra üzerindeki mazgalları kesebilir ve köprünü süsleyebilirsin.",
      completed: false,
      materials: ["Makas", "Boyalar"]
    }
  ]);
  
  const [muted, setMuted] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [isLifting, setIsLifting] = useState(false);
  
  const bridgeAudioRef = useRef<HTMLAudioElement>(null);

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    
    if (stepId === 12) {
      setShowSimulation(true);
    }
  };

  const startSimulation = () => {
    setIsLifting(true);
    
    // Köprü sesini çal
    if (bridgeAudioRef.current && !muted) {
      bridgeAudioRef.current.currentTime = 0;
      bridgeAudioRef.current.play().catch(console.error);
    }
    
    // Tower Bridge animasyonu - köprü parçalarını açma
    const bridge = document.getElementById('bridge');
    if (bridge) {
      // Önce köprüyü kapalı duruma getir (başlangıç durumu)
      bridge.style.setProperty('--left-rotation', '0deg');
      bridge.style.setProperty('--right-rotation', '0deg');
      
      // Kısa bir gecikme sonra köprüyü aç
      setTimeout(() => {
        // Animasyonu başlat
        bridge.classList.add('animate');
        
        // Köprü parçalarını aç
        bridge.style.setProperty('--left-rotation', '-60deg');
        bridge.style.setProperty('--right-rotation', '60deg');
      }, 100);
      
      // 4 saniye bekle
      setTimeout(() => {
        // Köprü parçalarını kapat
        bridge.style.setProperty('--left-rotation', '0deg');
        bridge.style.setProperty('--right-rotation', '0deg');
      }, 4000);
      
      // Animasyonu durdur
      setTimeout(() => {
        bridge.classList.remove('animate');
      }, 8000);
    }
    
    setTimeout(() => {
      setIsLifting(false);
      // Ses durdur
      if (bridgeAudioRef.current) {
        bridgeAudioRef.current.pause();
      }
    }, 8000);
  };

  const resetExperiment = () => {
    setCurrentStep(0);
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
    setShowSimulation(false);
    setIsLifting(false);
  };

  return (
    <>
      <audio ref={bridgeAudioRef} preload="auto">
        <source src="/audio/bridge-mechanism.mp3" type="audio/mpeg" />
      </audio>
      
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🌉 Asma Köprü Deneyi</span>
          <span className="game-message">Ortaçağ köprüsü yap!</span>
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
                <div className="material-icon">📦</div>
                <span>Ambalaj kartonu</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🔗</div>
                <span>2 adet çubuk</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🧴</div>
                <span>Beyaz yapıştırıcı</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🧶</div>
                <span>İp</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🟤</div>
                <span>Oyun hamuru</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📏</div>
                <span>Yapışkan bant</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🔧</div>
                <span>Burgu</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📏</div>
                <span>Cetvel</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🔩</div>
                <span>Kanca vida</span>
              </div>
              <div className="material-item">
                <div className="material-icon">✂️</div>
                <span>Makas</span>
              </div>
              <div className="material-item">
                <div className="material-icon">✏️</div>
                <span>Kalem</span>
              </div>
              <div className="material-item">
                <div className="material-icon">📐</div>
                <span>Gönye</span>
              </div>
              <div className="material-item">
                <div className="material-icon">🎨</div>
                <span>Boyalar</span>
              </div>
            </div>
            
            <div className="alternative-materials">
              <h4>💡 Alternatif Malzemeler</h4>
              <div className="alternatives-grid">
                <div className="alternative-item">
                  <div className="alternative-icon">📦</div>
                  <div className="alternative-content">
                    <strong>Ambalaj kartonu yerine:</strong>
                    <ul>
                      <li>Mukavva</li>
                      <li>Kalın kağıt</li>
                    </ul>
                  </div>
                </div>
                
                <div className="alternative-item">
                  <div className="alternative-icon">🔗</div>
                  <div className="alternative-content">
                    <strong>Çubuk yerine:</strong>
                    <ul>
                      <li>Pipet</li>
                      <li>Çöp şiş</li>
                    </ul>
                  </div>
                </div>
                
                <div className="alternative-item">
                  <div className="alternative-icon">🔧</div>
                  <div className="alternative-content">
                    <strong>Burgu yerine:</strong>
                    <ul>
                      <li>Matkap</li>
                      <li>Keskin bıçak</li>
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
              <h3>🌉 Simülasyon</h3>
              <div className="simulation-wrapper">
                <div className="simulation-area">
                  <div className="bridge-animation-container">
                    <div className="towerbridge">
                      <div className="tower--left"></div>
                      <div className="tower--right"></div>
                      <div id="bridge" className="tb__parts"></div>
                    </div>
                  </div>
                  <button 
                    className="launch-btn"
                    onClick={startSimulation}
                    disabled={isLifting}
                  >
                    {isLifting ? "Kaldırılıyor..." : "Köprü Kaldır!"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <aside className="sidebar">
          <div className="experiment-info">
            <h3>🔬 Bilimsel Açıklama</h3>
            <p>Ortaçağ'da kalelerin hendeklerle çevrili olduğunu biliyor muydun? Bu deneyde asma köprü prensibini öğreniyoruz!</p>
            <div className="science-fact">
              <h4>💡 Biliyor musun?</h4>
              <p>Asma köprüler saldırı sırasında kaldırılır ve kalenin girişini kapatır. Halatlar köprünün dışına, en uç noktalara sabitlenmelidir. Eğer halatlar köprünün ortasına sabitlenirse, kaldırmak için daha fazla güç gerekir.</p>
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
              <li>Makas ve burgu kullanırken dikkatli ol</li>
              <li>Yapıştırıcıyı dikkatli kullan</li>
              <li>Keskin araçlarla çalışırken yetişkin yardımı al</li>
              <li>Çalışma alanını temiz tut</li>
            </ul>
          </div>
        </aside>
      </section>

    </>
  );
}

export default function AsmaKopruPage() {
  return (
    <AuthGuard requiredBookId="benim-kucuk-deneylerim" gameId="asma-kopru">
      <AsmaKopruOyunu />
    </AuthGuard>
  );
}
