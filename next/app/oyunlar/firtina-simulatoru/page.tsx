"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface WeatherElement {
  id: number;
  name: string;
  emoji: string;
  description: string;
  value: number;
  min: number;
  max: number;
  unit: string;
}

const weatherElements: WeatherElement[] = [
  { id: 1, name: "Sıcaklık", emoji: "🌡️", description: "Hava sıcaklığı", value: 20, min: -10, max: 40, unit: "°C" },
  { id: 2, name: "Nem", emoji: "💧", description: "Havadaki nem oranı", value: 50, min: 0, max: 100, unit: "%" },
  { id: 3, name: "Basınç", emoji: "📊", description: "Atmosfer basıncı", value: 1013, min: 980, max: 1040, unit: "hPa" },
  { id: 4, name: "Rüzgar", emoji: "💨", description: "Rüzgar hızı", value: 10, min: 0, max: 50, unit: "km/h" }
];

function FirtinaSimulatoruOyunu() {
  const [elements, setElements] = useState<WeatherElement[]>(weatherElements);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState("Fırtına oluşturmak için elementleri ayarla!");
  const [muted, setMuted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [targetStorm, setTargetStorm] = useState<{temp: number, humidity: number, pressure: number, wind: number} | null>(null);
  const [stormIntensity, setStormIntensity] = useState(0);
  const [showVillage, setShowVillage] = useState(false);

  // Yağmur ve şimşek animasyonu için değişkenler
  const rainthroughnum = 500;
  const speedRainTrough = 15;
  const rainnum = 500;
  const canvasRefs = useRef<{
    canvas1: HTMLCanvasElement | null;
    canvas2: HTMLCanvasElement | null;
    canvas3: HTMLCanvasElement | null;
    ctx1: CanvasRenderingContext2D | null;
    ctx2: CanvasRenderingContext2D | null;
    ctx3: CanvasRenderingContext2D | null;
  }>({
    canvas1: null,
    canvas2: null,
    canvas3: null,
    ctx1: null,
    ctx2: null,
    ctx3: null
  });

  const [rainTrough, setRainTrough] = useState<any[]>([]);
  const [rain, setRain] = useState<any[]>([]);
  const [lightning, setLightning] = useState<any[]>([]);
  const lightTimeCurrentRef = useRef(0);
  const lightTimeTotalRef = useRef(200);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  // Animasyon fonksiyonları
  function random(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
  }

  function clearcanvas1() {
    if (canvasRefs.current.ctx1 && canvasRefs.current.canvas1) {
      canvasRefs.current.ctx1.clearRect(0, 0, canvasRefs.current.canvas1.width, canvasRefs.current.canvas1.height);
    }
  }

  function clearcanvas2() {
    if (canvasRefs.current.ctx2 && canvasRefs.current.canvas2) {
      canvasRefs.current.ctx2.clearRect(0, 0, canvasRefs.current.canvas2.width, canvasRefs.current.canvas2.height);
    }
  }

  function clearCanvas3() {
    if (canvasRefs.current.ctx3 && canvasRefs.current.canvas3) {
      canvasRefs.current.ctx3.globalCompositeOperation = 'destination-out';
      canvasRefs.current.ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
      canvasRefs.current.ctx3.fillRect(0, 0, canvasRefs.current.canvas3.width, canvasRefs.current.canvas3.height);
      canvasRefs.current.ctx3.globalCompositeOperation = 'source-over';
    }
  }

  function createRainTrough() {
    if (!canvasRefs.current.canvas1) return;
    
    const w = canvasRefs.current.canvas1.width;
    const h = canvasRefs.current.canvas1.height;
    const newRainTrough = [];
    for (let i = 0; i < rainthroughnum; i++) {
      newRainTrough[i] = {
        x: random(0, w),
        y: random(0, h),
        length: Math.floor(random(1, 830)),
        opacity: Math.random() * 0.2,
        xs: random(-2, 2),
        ys: random(10, 20)
      };
    }
    setRainTrough(newRainTrough);
  }

  function createRain() {
    if (!canvasRefs.current.canvas2) return;
    
    const w = canvasRefs.current.canvas2.width;
    const h = canvasRefs.current.canvas2.height;
    const newRain = [];
    for (let i = 0; i < rainnum; i++) {
      newRain[i] = {
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      };
    }
    setRain(newRain);
  }


  function createLightning() {
    if (!canvasRefs.current.canvas3) return;
    
    const w = canvasRefs.current.canvas3.width;
    const h = canvasRefs.current.canvas3.height;
    const x = random(100, w - 100);
    const y = random(0, h / 4);
    const createCount = random(1, 3);
    const newLightning = [...lightning];
    
    for (let i = 0; i < createCount; i++) {
      const single = {
        x: x,
        y: y,
        xRange: random(5, 30),
        yRange: random(10, 25),
        path: [{ x: x, y: y }],
        pathLimit: random(40, 55)
      };
      newLightning.push(single);
    }
    setLightning(newLightning);
  }

  function drawRainTrough(i: number) {
    if (!canvasRefs.current.ctx1 || !rainTrough[i] || i >= rainTrough.length) return;
    
    canvasRefs.current.ctx1.beginPath();
    const grd = canvasRefs.current.ctx1.createLinearGradient(0, rainTrough[i].y, 0, rainTrough[i].y + rainTrough[i].length);
    grd.addColorStop(0, "rgba(255,255,255,0)");
    grd.addColorStop(1, "rgba(255,255,255," + (rainTrough[i].opacity || 0.1) + ")");

    canvasRefs.current.ctx1.fillStyle = grd;
    canvasRefs.current.ctx1.fillRect(rainTrough[i].x, rainTrough[i].y, 1, rainTrough[i].length);
    canvasRefs.current.ctx1.fill();
  }

  function drawRain(i: number) {
    if (!canvasRefs.current.ctx2 || !rain[i] || i >= rain.length) return;
    
    canvasRefs.current.ctx2.beginPath();
    canvasRefs.current.ctx2.moveTo(rain[i].x, rain[i].y);
    canvasRefs.current.ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
    canvasRefs.current.ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
    canvasRefs.current.ctx2.lineWidth = 1;
    canvasRefs.current.ctx2.lineCap = 'round';
    canvasRefs.current.ctx2.stroke();
  }

  function drawLightning() {
    if (!canvasRefs.current.ctx3) return;
    
    const newLightning = [...lightning];
    console.log('Şimşek çiziliyor, lightning sayısı:', newLightning.length);
    for (let i = 0; i < newLightning.length; i++) {
      const light = newLightning[i];
      
      light.path.push({
        x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
        y: light.path[light.path.length - 1].y + (random(0, light.yRange))
      });

      if (light.path.length > light.pathLimit) {
        newLightning.splice(i, 1);
        continue;
      }

      canvasRefs.current.ctx3!.strokeStyle = 'rgba(255, 255, 255, .1)';
      canvasRefs.current.ctx3!.lineWidth = 3;
      if (random(0, 15) === 0) {
        canvasRefs.current.ctx3!.lineWidth = 6;
      }
      if (random(0, 30) === 0) {
        canvasRefs.current.ctx3!.lineWidth = 8;
      }

      canvasRefs.current.ctx3!.beginPath();
      canvasRefs.current.ctx3!.moveTo(light.x, light.y);
      for (let pc = 0; pc < light.path.length; pc++) {
        canvasRefs.current.ctx3!.lineTo(light.path[pc].x, light.path[pc].y);
      }
      if (Math.floor(random(0, 30)) === 1) {
        canvasRefs.current.ctx3!.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')';
        canvasRefs.current.ctx3!.fillRect(0, 0, canvasRefs.current.canvas3!.width, canvasRefs.current.canvas3!.height);
      }
      canvasRefs.current.ctx3!.lineJoin = 'miter';
      canvasRefs.current.ctx3!.stroke();
    }
    setLightning(newLightning);
  }

  function animateRainTrough() {
    if (rainTrough.length === 0 || !canvasRefs.current.canvas1) return;
    
    const h = canvasRefs.current.canvas1.height;
    clearcanvas1();
    const newRainTrough = [...rainTrough];
    for (let i = 0; i < rainthroughnum && i < newRainTrough.length; i++) {
      if (newRainTrough[i] && newRainTrough[i].y >= h) {
        newRainTrough[i].y = h - newRainTrough[i].y - newRainTrough[i].length * 5;
      } else if (newRainTrough[i]) {
        newRainTrough[i].y += speedRainTrough;
      }
      drawRainTrough(i);
    }
    setRainTrough(newRainTrough);
  }

  function animateRain() {
    if (rain.length === 0 || !canvasRefs.current.canvas2) return;
    
    const w = canvasRefs.current.canvas2.width;
    const h = canvasRefs.current.canvas2.height;
    clearcanvas2();
    const newRain = [...rain];
    for (let i = 0; i < rainnum && i < newRain.length; i++) {
      if (newRain[i]) {
        newRain[i].x += newRain[i].xs;
        newRain[i].y += newRain[i].ys;
        if (newRain[i].x > w || newRain[i].y > h) {
          newRain[i].x = Math.random() * w;
          newRain[i].y = -20;
        }
        drawRain(i);
      }
    }
    setRain(newRain);
  }

  function animateLightning() {
    clearCanvas3();
    
    lightTimeCurrentRef.current++;
    if (lightTimeCurrentRef.current >= lightTimeTotalRef.current) {
      createLightning();
      lightTimeTotalRef.current = 200;
      lightTimeCurrentRef.current = 0;
    }
    
    drawLightning();
  }

  function initAnimation() {
    console.log('initAnimation çağrıldı');
    createRainTrough();
    createRain();
    lightTimeTotalRef.current = 200;
    lightTimeCurrentRef.current = 0;
    console.log('RainTrough ve Rain oluşturuldu:', { rainTroughLength: rainTrough.length, rainLength: rain.length });
  }

  // Sürekli yağmur ve şimşek oluşturma
  useEffect(() => {
    if (showVillage && rainTrough.length === 0) {
      createRainTrough();
    }
    if (showVillage && rain.length === 0) {
      createRain();
    }
  }, [showVillage, rainTrough.length, rain.length]);

  // Animasyonu sürekli yenile - artık gerekli değil, animasyon döngüsü hallediyor
  
  const aThunder = useRef<HTMLAudioElement | null>(null);
  const aRain = useRef<HTMLAudioElement | null>(null);
  const aWind = useRef<HTMLAudioElement | null>(null);
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
    generateTargetStorm();
    setShowVillage(true); // Sayfa yüklendiğinde köy simülasyonu görünür
  }, []);

  useEffect(() => {
    if (showVillage && stormIntensity >= 2) {
      play(aRain.current);
    }
    if (showVillage && stormIntensity >= 3) {
      play(aThunder.current);
    }
    if (showVillage && stormIntensity >= 4) {
      play(aWind.current);
    }
  }, [stormIntensity, showVillage]);

  // Canvas animasyonu için useEffect
  useEffect(() => {
    if (showVillage) {
      // Canvas boyutlarını ayarla
      const container = document.querySelector('.village-scene');
      if (container) {
        const rect = container.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        setCanvasSize({ w, h });
        
        // Canvas referanslarını ayarla
        const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
        const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
        const canvas3 = document.getElementById('canvas3') as HTMLCanvasElement;
        
        if (canvas1 && canvas2 && canvas3) {
          canvasRefs.current.canvas1 = canvas1;
          canvasRefs.current.canvas2 = canvas2;
          canvasRefs.current.canvas3 = canvas3;
          canvasRefs.current.ctx1 = canvas1.getContext('2d');
          canvasRefs.current.ctx2 = canvas2.getContext('2d');
          canvasRefs.current.ctx3 = canvas3.getContext('2d');
          
          // Canvas boyutlarını ayarla (köy simülasyonu boyutlarında)
          canvas1.width = canvas2.width = canvas3.width = w;
          canvas1.height = canvas2.height = canvas3.height = h;
          
          // Animasyonu başlat
          initAnimation();
          console.log('Canvas animasyonu başlatıldı:', { w, h, stormIntensity });
          
          // Animasyon döngüsü - sürekli çalışır
          let animationId: number;
          const animloop = () => {
            // Yağmur parçacıkları biterse yeniden oluştur
            if (rainTrough.length === 0) {
              createRainTrough();
            }
            if (rain.length === 0) {
              createRain();
            }
            
            animateRainTrough();
            animateRain();
            if (stormIntensity >= 3) {
              animateLightning();
            }
            
            // Her durumda devam et - sürekli çalışır
            animationId = requestAnimationFrame(animloop);
          };
          
          // Kısa bir gecikme ile animasyonu başlat
          setTimeout(() => {
            console.log('Animasyon döngüsü başlatılıyor...');
            animloop();
          }, 100);

          // Cleanup function
          return () => {
            if (animationId) {
              cancelAnimationFrame(animationId);
            }
          };
        }
      }
    }
  }, [showVillage]);

  const generateTargetStorm = () => {
    setTargetStorm({
      temp: Math.floor(Math.random() * 15) + 25, // 25-40°C
      humidity: Math.floor(Math.random() * 30) + 70, // 70-100%
      pressure: Math.floor(Math.random() * 20) + 980, // 980-1000 hPa
      wind: Math.floor(Math.random() * 20) + 30 // 30-50 km/h
    });
  };

  const updateElement = (id: number, value: number) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, value: Math.max(el.min, Math.min(el.max, value)) } : el
    ));
  };

  const checkStorm = () => {
    if (!targetStorm) return;
    
    setShowResult(true);
    
    const temp = elements.find(e => e.id === 1)?.value || 0;
    const humidity = elements.find(e => e.id === 2)?.value || 0;
    const pressure = elements.find(e => e.id === 3)?.value || 0;
    const wind = elements.find(e => e.id === 4)?.value || 0;
    
    const tempDiff = Math.abs(temp - targetStorm.temp);
    const humidityDiff = Math.abs(humidity - targetStorm.humidity);
    const pressureDiff = Math.abs(pressure - targetStorm.pressure);
    const windDiff = Math.abs(wind - targetStorm.wind);
    
    const totalDiff = tempDiff + humidityDiff + pressureDiff + windDiff;
    
    // Fırtına şiddetini hesapla
    let intensity = 0;
    if (totalDiff <= 20) {
      intensity = 4; // Çok güçlü fırtına
      setScore(prev => prev + 30);
      setGameMessage("⚡ Mükemmel! Çok güçlü fırtına oluşturdun! ⚡");
      play(aThunder.current);
    } else if (totalDiff <= 40) {
      intensity = 3; // Güçlü fırtına
      setScore(prev => prev + 20);
      setGameMessage("🌧️ İyi! Güçlü fırtına oluşturdun! 🌧️");
      play(aRain.current);
    } else if (totalDiff <= 60) {
      intensity = 2; // Orta fırtına
      setScore(prev => prev + 10);
      setGameMessage("💨 Orta seviye! Biraz daha ayarla! 💨");
      play(aWind.current);
    } else {
      intensity = 1; // Hafif fırtına
      setGameMessage("☀️ Sakin hava! Daha güçlü fırtına için ayarla! ☀️");
    }
    
    setStormIntensity(intensity);
    setShowVillage(true); // Köy simülasyonu sürekli görünür kalır
    
    setTimeout(() => {
      // setShowVillage(false); // Bu satır kaldırıldı - köy sürekli görünür kalır
      if (round >= 3) {
        setGameOver(true);
        setGameMessage("🎮 Oyun bitti! Toplam puan: " + score);
        play(aWin.current);
      } else {
        setRound(prev => prev + 1);
        generateTargetStorm();
        setShowResult(false);
        setGameMessage("Fırtına oluşturmak için elementleri ayarla!");
      }
    }, 4000);
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setShowResult(false);
    setElements(weatherElements);
    setShowVillage(true); // Köy simülasyonu sürekli görünür kalır
    generateTargetStorm();
    setGameMessage("Fırtına oluşturmak için elementleri ayarla!");
  };

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">⚡ Fırtına Simülatörü</span>
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
          <h3>🎬 Fırtına Nasıl Oluşur?</h3>
          <div className="video-player">
            <video 
              controls 
              poster="/img/fırtına.png"
              className="weather-video"
              preload="metadata"
            >
              <source src="/videos/fırtına.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="video-info">
              <h4>💡 Bilimsel Açıklama</h4>
              <p>Fırtına, sıcak ve nemli havanın yükselmesi, soğuk hava ile karşılaşması sonucu oluşur. Şimşek, gök gürültüsü ve güçlü rüzgar eşlik eder!</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="storm-game-scene">
        <div className="storm-simulator">
          <div className="weather-controls">
            <h3>Hava Elementleri</h3>
            {elements.map((element) => (
              <div key={element.id} className="element-control">
                <div className="element-header">
                  <span className="element-emoji">{element.emoji}</span>
                  <span className="element-name">{element.name}</span>
                  <span className="element-value">{element.value}{element.unit}</span>
                </div>
                <input
                  type="range"
                  min={element.min}
                  max={element.max}
                  value={element.value}
                  onChange={(e) => updateElement(element.id, parseInt(e.target.value))}
                  className="element-slider"
                  disabled={showResult || gameOver}
                />
                <div className="element-range">
                  <span>{element.min}{element.unit}</span>
                  <span>{element.max}{element.unit}</span>
                </div>
              </div>
            ))}
            
            <button 
              className="create-storm-btn"
              onClick={checkStorm}
              disabled={showResult || gameOver}
            >
              ⚡ Fırtına Oluştur!
            </button>
          </div>
          
          <div className="target-storm">
            <h3>Hedef Fırtına</h3>
            {targetStorm && (
              <div className="target-values">
                <div className="target-item">
                  <span>🌡️ Sıcaklık:</span>
                  <span>{targetStorm.temp}°C</span>
                </div>
                <div className="target-item">
                  <span>💧 Nem:</span>
                  <span>{targetStorm.humidity}%</span>
                </div>
                <div className="target-item">
                  <span>📊 Basınç:</span>
                  <span>{targetStorm.pressure} hPa</span>
                </div>
                <div className="target-item">
                  <span>💨 Rüzgar:</span>
                  <span>{targetStorm.wind} km/h</span>
                </div>
              </div>
            )}
          </div>
          
          <aside className="sidebar">
            <div className="game-info">
              <h3>🎯 Nasıl Oynanır?</h3>
              <p>Hedef fırtına değerlerine yakın elementleri ayarla! Fırtına oluşturmak için doğru kombinasyonu bul!</p>
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
            
            <div className="storm-info">
              <h4>⚡ Fırtına Bilgisi</h4>
              <p>Fırtına, yüksek nem, düşük basınç, güçlü rüzgar ve yüksek sıcaklık kombinasyonunda oluşur.</p>
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
          
          {showVillage && (
            <div className="village-simulation">
              <h3>Köy Simülasyonu</h3>
              <div className={`village-scene storm-intensity-${stormIntensity}`}>
                <div className="background">
                  <div className="mountainOne"></div>
                  <div className="mountainTwo"></div>
                  <div className="mountainThree"></div>
                  <div className="mountainFour"></div>
                  <div className="mountainFive"></div>
                  <div className="mountainSix"></div>
                  <div className="mountainSeven"></div>
                  
                  <div className="hillOne"></div>
                  <div className="hillTwo"></div>
                  <div className="hillThree"></div>
                  <div className="hillFour"></div>
                  <div className="hillFive"></div>
                  <div className="hillSix"></div>
                  <div className="hillSeven"></div>
                  
                  <div className="center houseWrapOne">
                    <div className="roof">
                      <div className="chevron"></div>
                    </div>
                    <div className="house">
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapTwo">
                    <div className="bigRoof">
                      <div className="chevron"></div>
                    </div>
                    <div className="bigHouse">
                      <div className="window-left-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-center-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapThree">
                    <div className="building-roof"></div>
                    <div className="building">
                      <div className="window-left-three">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-center-three">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-center-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-three">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapFour">
                    <div className="roof">
                      <div className="chevron"></div>
                    </div>
                    <div className="house">
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapFive">
                    <div className="bigRoof">
                      <div className="chevron"></div>
                    </div>
                    <div className="bigHouse">
                      <div className="window-left-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-center-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapSix">
                    <div className="building-roof"></div>
                    <div className="building">
                      <div className="window-left-three">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-center-three">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-center-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-three">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapSeven">
                    <div className="roof">
                      <div className="chevron"></div>
                    </div>
                    <div className="house">
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="center houseWrapEight">
                    <div className="bigRoof">
                      <div className="chevron"></div>
                    </div>
                    <div className="bigHouse">
                      <div className="window-left-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-center-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-right-two">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="window-left">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                      <div className="door">
                        <div className="door-knob"></div>
                      </div>
                      <div className="window-right">
                        <div className="window-pane-one"></div>
                        <div className="window-pane-two"></div>
                        <div className="window-pane-three"></div>
                        <div className="window-pane-four"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="sidewalk">
                    <div className="houseShadowOne"></div>
                    <div className="houseShadowTwo"></div>
                    <div className="houseShadowThree"></div>
                    <div className="houseShadowFour"></div>
                    <div className="houseShadowFive"></div>
                    <div className="houseShadowSix"></div>
                    <div className="houseShadowSeven"></div>
                    <div className="houseShadowEight"></div>
                  </div>
                  <div className="sidewalkEdge"></div>
                  <div className="street">
                    <div className="streetDashOne"></div>
                    <div className="streetDashTwo"></div>
                    <div className="streetDashThree"></div>
                    <div className="streetDashFour"></div>
                  </div>
                  <div className="sidewalk2"></div>
                  <div className="grass"></div>
                  
                  {/* Adventure Time Karakterleri - Profesyonel Versiyon */}
                  <div className="frame" style={{
                    position: 'absolute',
                    top: '30px',
                    left: '150px',
                    zIndex: 1000
                  }}>
                    {/* Jake - Profesyonel Adventure Time */}
                    <div className="jake">
                      <div className="leftArm">
                        <div className="harm"></div>
                        <div className="harm"></div>
                        <div className="hand"></div>
                      </div>
                      <div className="rightArm">
                        <div className="hand"></div>
                      </div>
                      <div className="body">
                        <div className="ear"></div>
                        <div className="eye"></div>
                        <div className="eye"></div>
                        <div className="nose">
                          <div className="snout"></div>
                          <div className="mouth"></div>
                        </div>
                      </div>
                      <div className="leg">
                        <div className="foot"></div>
                      </div>
                      <div className="leg">
                        <div className="foot"></div>
                      </div>
                    </div>

                    {/* Finn - Profesyonel Adventure Time */}
                    <div className="finn">
                      <div className="head">
                        <div className="cap">
                          <div className="ear"></div>
                          <div className="ear"></div>
                        </div>
                        <div className="face">
                          <div className="eye"></div>
                          <div className="eye"></div>
                          <div className="mouth"></div>
                        </div>
                      </div>
                      <div className="leftArm">
                        <div className="shirt"></div>
                        <div className="elbow"></div>
                        <div className="hand">
                          <div className="finger"></div>
                        </div>
                      </div>
                      <div className="rightArm">
                        <div className="shirt"></div>
                        <div className="elbow"></div>
                        <div className="hand">
                          <div className="finger"></div>
                        </div>
                      </div>
                      <div className="strap"></div>
                      <div className="backpackBot"></div>
                      <div className="backpackLeft"></div>
                      <div className="body"></div>
                      <div className="leg">
                        <div className="sock"></div>
                        <div className="foot"></div>
                      </div>
                      <div className="leg">
                        <div className="sock"></div>
                        <div className="foot"></div>
                      </div>
                    </div>

                    {/* BMO - Profesyonel Adventure Time */}
                    <div className="bmo">
                      <div className="bodyTop"></div>
                      <div className="bodyLeft">
                        <div className="sigle">BM</div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <div className="body">
                        <div className="face">
                          <div className="eye"></div>
                          <div className="eye"></div>
                          <div className="mouth"></div>
                        </div>
                        <div className="disk"></div>
                        <div className="disk2"></div>
                        <div className="disk3"></div>
                        <div className="power"></div>
                        <div className="cross"></div>
                        <div className="triangle"></div>
                        <div className="circleGreen"></div>
                        <div className="circleRed"></div>
                      </div>
                      <div className="arm">
                        <div className="hand"></div>
                      </div>
                      <div className="leg">
                        <div className="foot"></div>
                      </div>
                      <div className="leg">
                        <div className="foot"></div>
                      </div>
                      <div className="hand"></div>
                    </div>
                  </div>
                  
                  {/* Karakter Tepkileri */}
                  <div className="character-reactions" style={{
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                    zIndex: 1001,
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    maxWidth: '200px'
                  }}>
                    {stormIntensity === 1 && (
                      <div>
                        <strong>🌞 Sakin Hava</strong><br/>
                        Jake: "Matematiksel!"<br/>
                        Finn: "Hadi maceraya!"<br/>
                        BMO: "Oyun zamanı!"
                      </div>
                    )}
                    {stormIntensity === 2 && (
                      <div>
                        <strong>🌧️ Hafif Yağmur</strong><br/>
                        Jake: "Şemsiye lazım!"<br/>
                        Finn: "Yağmur da macera!"<br/>
                        BMO: "Su geçirmez mod!"
                      </div>
                    )}
                    {stormIntensity === 3 && (
                      <div>
                        <strong>⛈️ Güçlü Fırtına</strong><br/>
                        Jake: "Bu çok güçlü!"<br/>
                        Finn: "Dikkatli ol!"<br/>
                        BMO: "Güvenlik protokolü!"
                      </div>
                    )}
                    {stormIntensity === 4 && (
                      <div>
                        <strong>🌪️ Çok Güçlü Fırtına</strong><br/>
                        Jake: "Sığınak lazım!"<br/>
                        Finn: "Herkes içeri!"<br/>
                        BMO: "Acil durum modu!"
                      </div>
                    )}
                  </div>
                  
                </div>
                <div className="weather-effects">
                  {stormIntensity >= 2 && (
                    <div className="container">
                      <canvas id="canvas1"></canvas>
                      <canvas id="canvas2"></canvas>
                      <canvas id="canvas3"></canvas>
                    </div>
                  )}
                  {stormIntensity >= 4 && <div className="strong-wind"></div>}
                </div>
                <div className="storm-description">
                  {stormIntensity === 1 && "☀️ Sakin hava - Her şey normal, insanlar dışarıda"}
                  {stormIntensity === 2 && "🌧️ Hafif yağmur - İnsanlar şemsiye açıyor, ağaçlar hafif sallanıyor"}
                  {stormIntensity === 3 && "⛈️ Güçlü fırtına - Ağaçlar sallanıyor, şimşek çakıyor, insanlar koşuyor"}
                  {stormIntensity === 4 && "🌪️ Çok güçlü fırtına - Herkes evde kalıyor, ağaçlar devriliyor!"}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <audio ref={aThunder} src="/audio/thunder-sound.mp3" preload="auto"/>
      <audio ref={aRain} src="/audio/rain-sound.mp3" preload="auto"/>
      <audio ref={aWind} src="/audio/wind-sound.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/win-sound.mp3" preload="auto"/>
    </>
  );
}

export default function FirtinaSimulatoruPage() {
  return (
    <AuthGuard requiredBookId="hava-olaylari" gameId="firtina-simulatoru">
      <FirtinaSimulatoruOyunu />
    </AuthGuard>
  );
}
