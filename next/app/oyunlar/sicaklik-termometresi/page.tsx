"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface WeatherScenario {
  id: number;
  name: string;
  emoji: string;
  description: string;
  targetTemp: number;
  minTemp: number;
  maxTemp: number;
}

interface MultipleChoiceOption {
  id: number;
  name: string;
  emoji: string;
  description: string;
  temperature: number;
  clothing: string;
  isCorrect: boolean;
}

const multipleChoiceScenarios: MultipleChoiceOption[][] = [
  // Kış senaryosu - doğru: kalın giyim, -5°C
  [
    { id: 1, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı, eldiven", temperature: -5, clothing: "🧥", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: -5, clothing: "👕", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Şort ve sandalet", temperature: -5, clothing: "🩳", isCorrect: false }
  ],
  // Yaz senaryosu - doğru: ince giyim, 32°C
  [
    { id: 1, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört, şort", temperature: 32, clothing: "👕", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 32, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Eldiven ve bere", temperature: 32, clothing: "🧤", isCorrect: false }
  ],
  // İlkbahar senaryosu - doğru: orta giyim, 18°C
  [
    { id: 1, name: "İlkbahar", emoji: "🌸", description: "Hafif mont, uzun kollu", temperature: 18, clothing: "👔", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 18, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 18, clothing: "👕", isCorrect: false }
  ],
  // Sonbahar senaryosu - doğru: orta giyim, 12°C
  [
    { id: 1, name: "Sonbahar", emoji: "🍂", description: "Hafif mont, uzun kollu", temperature: 12, clothing: "👔", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 12, clothing: "👕", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 12, clothing: "🧥", isCorrect: false }
  ],
  // Tropikal senaryosu - doğru: ince giyim, 28°C
  [
    { id: 1, name: "Tropikal", emoji: "🌴", description: "İnce kıyafet, şort", temperature: 28, clothing: "👕", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 28, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Eldiven ve bere", temperature: 28, clothing: "🧤", isCorrect: false }
  ],
  // Kutup senaryosu - doğru: çok kalın giyim, -15°C
  [
    { id: 1, name: "Kutup", emoji: "🧊", description: "Çok kalın mont, eldiven, atkı", temperature: -15, clothing: "🧥", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: -15, clothing: "👕", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Şort ve sandalet", temperature: -15, clothing: "🩳", isCorrect: false }
  ],
  // Serin yaz sabahı - doğru: orta giyim, 15°C
  [
    { id: 1, name: "Serin Sabah", emoji: "🌅", description: "Hafif mont, uzun kollu", temperature: 15, clothing: "👔", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 15, clothing: "👕", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 15, clothing: "🧥", isCorrect: false }
  ],
  // Sıcak yaz günü - doğru: ince giyim, 35°C
  [
    { id: 1, name: "Sıcak Yaz", emoji: "🔥", description: "İnce tişört, şort", temperature: 35, clothing: "👕", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 35, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Eldiven ve bere", temperature: 35, clothing: "🧤", isCorrect: false }
  ],
  // Soğuk kış günü - doğru: kalın giyim, -10°C
  [
    { id: 1, name: "Soğuk Kış", emoji: "🥶", description: "Kalın mont, atkı, eldiven", temperature: -10, clothing: "🧥", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: -10, clothing: "👕", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Şort ve sandalet", temperature: -10, clothing: "🩳", isCorrect: false }
  ],
  // Ilık bahar günü - doğru: orta giyim, 20°C
  [
    { id: 1, name: "Ilık Bahar", emoji: "🌺", description: "Hafif mont, uzun kollu", temperature: 20, clothing: "👔", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 20, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 20, clothing: "👕", isCorrect: false }
  ],
  // Çok sıcak gün - doğru: ince giyim, 38°C
  [
    { id: 1, name: "Çok Sıcak", emoji: "🌡️", description: "İnce tişört, şort", temperature: 38, clothing: "👕", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 38, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Eldiven ve bere", temperature: 38, clothing: "🧤", isCorrect: false }
  ],
  // Soğuk sonbahar - doğru: kalın giyim, 5°C
  [
    { id: 1, name: "Soğuk Sonbahar", emoji: "🍁", description: "Kalın mont, atkı", temperature: 5, clothing: "🧥", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 5, clothing: "👕", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Şort ve sandalet", temperature: 5, clothing: "🩳", isCorrect: false }
  ],
  // Ilık sonbahar - doğru: orta giyim, 16°C
  [
    { id: 1, name: "Ilık Sonbahar", emoji: "🍂", description: "Hafif mont, uzun kollu", temperature: 16, clothing: "👔", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 16, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 16, clothing: "👕", isCorrect: false }
  ],
  // Çok soğuk kış - doğru: çok kalın giyim, -20°C
  [
    { id: 1, name: "Çok Soğuk", emoji: "🧊", description: "Çok kalın mont, eldiven, atkı", temperature: -20, clothing: "🧥", isCorrect: true },
    { id: 2, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: -20, clothing: "👕", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Şort ve sandalet", temperature: -20, clothing: "🩳", isCorrect: false }
  ],
  // Sıcak bahar günü - doğru: ince giyim, 25°C
  [
    { id: 1, name: "Sıcak Bahar", emoji: "🌸", description: "İnce tişört, uzun kollu", temperature: 25, clothing: "👕", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 25, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Kış", emoji: "❄️", description: "Eldiven ve bere", temperature: 25, clothing: "🧤", isCorrect: false }
  ],
  // Serin yaz akşamı - doğru: orta giyim, 22°C
  [
    { id: 1, name: "Serin Akşam", emoji: "🌆", description: "Hafif mont, uzun kollu", temperature: 22, clothing: "👔", isCorrect: true },
    { id: 2, name: "Kış", emoji: "❄️", description: "Kalın mont, atkı", temperature: 22, clothing: "🧥", isCorrect: false },
    { id: 3, name: "Yaz", emoji: "☀️", description: "Kısa kollu tişört", temperature: 22, clothing: "👕", isCorrect: false }
  ]
];

function SicaklikTermometresiOyunu() {
  const [currentOptions, setCurrentOptions] = useState<MultipleChoiceOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<MultipleChoiceOption | null>(null);
  const [currentTemp, setCurrentTemp] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameMessage, setGameMessage] = useState("Termometre ile sıcaklığı ayarla ve 'Kontrol Et' butonuna bas!");
  const [muted, setMuted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [canSelect, setCanSelect] = useState(false);
  
  const aThermometer = useRef<HTMLAudioElement | null>(null);
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
    generateNewScenario();
  }, []);

  const generateNewScenario = () => {
    const randomIndex = Math.floor(Math.random() * multipleChoiceScenarios.length);
    setCurrentOptions(multipleChoiceScenarios[randomIndex]);
    setSelectedOption(null);
    setCurrentTemp(0);
    setShowResult(false);
    setShowPerson(false);
    setWaitingForNext(false);
    setCanSelect(false);
    setGameMessage("Termometre ile sıcaklığı ayarla ve 'Kontrol Et' butonuna bas!");
  };

  const checkTemperature = () => {
    if (gameOver || canSelect) return;
    
    // Hedef sıcaklık kontrolü
    const targetTemp = currentOptions[0]?.temperature;
    if (currentTemp !== targetTemp) {
      setGameMessage(`❌ Yanlış sıcaklık! Hedef: ${targetTemp}°C, Şu anki: ${currentTemp}°C`);
      return;
    }
    
    setCanSelect(true);
    setGameMessage("✅ Doğru sıcaklık! Şimdi doğru seçeneği seç!");
  };

  const selectOption = (option: MultipleChoiceOption) => {
    if (gameOver || !canSelect) return;
    
    setSelectedOption(option);
    setShowResult(true);
    setShowPerson(true);
    
    if (option.isCorrect) {
      setScore(prev => prev + 10);
      setGameMessage("🎉 Doğru! " + option.name + " mevsimi doğru seçim! 🎉");
      play(aCorrect.current);
    } else {
      setGameMessage("❌ Yanlış! Doğru cevap: " + currentOptions.find(opt => opt.isCorrect)?.name + " ❌");
      play(aWrong.current);
    }
    
    setWaitingForNext(true);
  };

  const updateTemperature = (temp: number) => {
    if (showResult || gameOver || waitingForNext) return;
    
    const clampedTemp = Math.max(-20, Math.min(40, temp));
    setCurrentTemp(clampedTemp);
  };

  const nextRound = () => {
    if (round >= 5) {
      setGameOver(true);
      setGameMessage("🎮 Oyun bitti! Toplam puan: " + score);
      play(aWin.current);
    } else {
      setRound(prev => prev + 1);
      generateNewScenario();
    }
  };


  const resetGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setSelectedOption(null);
    setCurrentTemp(0);
    setShowResult(false);
    setWaitingForNext(false);
    setCanSelect(false);
    generateNewScenario();
  };


  const getTemperatureColor = () => {
    if (currentTemp < -5) return "#87CEEB"; // Soğuk - mavi
    if (currentTemp < 5) return "#98FB98"; // Serin - açık yeşil
    if (currentTemp < 15) return "#FFD700"; // Ilık - sarı
    if (currentTemp < 25) return "#FFA500"; // Sıcak - turuncu
    return "#FF4500"; // Çok sıcak - kırmızı
  };

  const getTemperatureEmoji = () => {
    if (currentTemp < -5) return "🧊";
    if (currentTemp < 5) return "❄️";
    if (currentTemp < 15) return "🌤️";
    if (currentTemp < 25) return "☀️";
    return "🔥";
  };

  const getPersonOutfit = () => {
    if (!selectedOption) return { emoji: "👤", description: "Normal kıyafet", category: "normal" };
    
    // Seçilen seçeneğe göre giyim belirle
    if (selectedOption.temperature < 0) {
      // Soğuk giyim seçenekleri
      const coldOutfits = [
        { emoji: "🧥", description: "Kalın mont ve eldiven", category: "cold" },
        { emoji: "🧣", description: "Mont, atkı ve bere", category: "cold" },
        { emoji: "🧤", description: "Kışlık mont ve bot", category: "cold" },
        { emoji: "🎿", description: "Kayak kıyafeti", category: "cold" }
      ];
      return coldOutfits[Math.floor(Math.random() * coldOutfits.length)];
    } else if (selectedOption.temperature < 20) {
      // Ilık giyim seçenekleri
      const warmOutfits = [
        { emoji: "👔", description: "Gömlek ve pantolon", category: "warm" },
        { emoji: "👕", description: "Uzun kollu tişört", category: "warm" },
        { emoji: "🧥", description: "Hafif mont", category: "warm" },
        { emoji: "👖", description: "Jean ve tişört", category: "warm" }
      ];
      return warmOutfits[Math.floor(Math.random() * warmOutfits.length)];
    } else {
      // Sıcak giyim seçenekleri
      const hotOutfits = [
        { emoji: "🏖️", description: "Şort ve tişört", category: "hot" },
        { emoji: "👕", description: "İnce tişört", category: "hot" },
        { emoji: "🩳", description: "Şort ve sandalet", category: "hot" },
        { emoji: "👙", description: "Mayo ve şapka", category: "hot" }
      ];
      return hotOutfits[Math.floor(Math.random() * hotOutfits.length)];
    }
  };

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🌡️ Sıcaklık Termometresi</span>
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
          <h3>🎬 Sıcaklık Nasıl Ölçülür?</h3>
          <div className="video-player">
            <video 
              controls 
              poster="/img/termometre.png"
              className="weather-video"
              preload="metadata"
            >
              <source src="/videos/termometre.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="video-info">
              <h4>💡 Bilimsel Açıklama</h4>
              <p>Termometre, sıcaklık değişimlerini ölçer. Sıcaklık arttıkça sıvı genleşir, azaldıkça büzülür. Bu prensip ile sıcaklığı ölçebiliriz!</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="thermometer-game-scene">
        <div className="thermometer-area">
          <div className="weather-scenario">
            <h3>🌤️ Hangi Mevsim Doğru?</h3>
            <p>Termometre ile doğru sıcaklığa gel ve seçeneği seç!</p>
          </div>

          <div className="thermometer-container">
            <div className="thermometer">
              <div className="thermometer-body">
                <div 
                  className="mercury" 
                  style={{ 
                    height: `${((currentTemp + 10) / 50) * 100}%`,
                    backgroundColor: getTemperatureColor()
                  }}
                ></div>
              </div>
              <div className="thermometer-bulb">
                <div className="temp-emoji">{getTemperatureEmoji()}</div>
              </div>
            </div>
            
              <div className="temperature-control">
                <div className="temp-display">
                  <div className="temp-value">{currentTemp}°C</div>
                </div>
                <div className="temp-slider-container">
                <input
                  type="range"
                  min="-20"
                  max="40"
                  value={currentTemp}
                  onChange={(e) => updateTemperature(parseInt(e.target.value))}
                  className="temp-slider"
                />
                <div className="temp-labels">
                  <span>-20°C</span>
                  <span>40°C</span>
                </div>
                </div>
                <button 
                  className={`check-temp-btn ${currentTemp === currentOptions[0]?.temperature ? 'target-matched' : ''}`}
                  onClick={checkTemperature}
                  disabled={canSelect || gameOver}
                >
                  {canSelect ? "✅ Kontrol Edildi" : 
                   currentTemp === currentOptions[0]?.temperature ? "🎯 Doğru Sıcaklık!" : "🌡️ Kontrol Et"}
                </button>
              </div>
          </div>
          
          <div className="scenario-target-temp">
            <div className="target-temp-info">
              <span className="target-temp-label">🎯 Hedef Sıcaklık:</span>
              <span className="target-temp-value">{currentOptions[0]?.temperature}°C</span>
            </div>
          </div>
          
          <div className="multiple-choice-options">
            {currentOptions.map((option) => (
              <button
                key={option.id}
                className={`option-card ${selectedOption?.id === option.id ? 'selected' : ''} ${showResult ? (option.isCorrect ? 'correct' : 'wrong') : ''}`}
                onClick={() => selectOption(option)}
                disabled={gameOver || !canSelect}
              >
                <div className="option-emoji">{option.emoji}</div>
                <div className="option-content">
                  <div className="option-name">{option.name}</div>
                  <div className="option-description">{option.description}</div>
                  <div className="option-details">
                    <span className="clothing">{option.clothing}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {waitingForNext && (
            <div className="next-round-section">
              <button className="next-round-btn" onClick={nextRound}>
                {round >= 5 ? "Oyunu Bitir" : "Sonraki Tur"}
              </button>
            </div>
          )}
          
          
          {showPerson && (
            <div className="person-simulation">
              <h3>Kişi Simülasyonu</h3>
              <div className="person-scene">
                <div className="person-outfit">
                  <div className={`person-emoji ${getPersonOutfit().category}`}>{getPersonOutfit().emoji}</div>
                  <div className="outfit-description">{getPersonOutfit().description}</div>
                  <div className="outfit-category">
                    {getPersonOutfit().category === "cold" && "❄️ Soğuk Hava Giyimi"}
                    {getPersonOutfit().category === "warm" && "🌤️ Ilık Hava Giyimi"}
                    {getPersonOutfit().category === "hot" && "☀️ Sıcak Hava Giyimi"}
                  </div>
                </div>
                <div className="temperature-feedback">
                  <div className="feedback-text">
                    {currentTemp < 0 && "❄️ Çok soğuk! Kalın giysiler giy!"}
                    {currentTemp >= 0 && currentTemp < 10 && "🧥 Soğuk! Mont giy!"}
                    {currentTemp >= 10 && currentTemp < 20 && "👕 Serin! Uzun kollu giy!"}
                    {currentTemp >= 20 && currentTemp < 30 && "👔 Ilık! Gömlek yeterli!"}
                    {currentTemp >= 30 && "🏖️ Sıcak! İnce giysiler giy!"}
                  </div>
                  <div className="temperature-tip">
                    💡 Her sıcaklık seviyesinde farklı giyim seçenekleri var!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <aside className="sidebar">
          <div className="game-info">
            <h3>🎯 Nasıl Oynanır?</h3>
            <p>Hava durumuna göre doğru sıcaklığı ayarla! Termometreyi sürükleyerek sıcaklığı değiştir!</p>
          </div>
          
          <div className="score-card">
            <h4>📊 İstatistikler</h4>
            <div className="score-item">
              <span>Tur:</span>
              <span className="score-value">{round}/6</span>
            </div>
            <div className="score-item">
              <span>Puan:</span>
              <span className="score-value">{score}</span>
            </div>
          </div>
          
          <div className="temperature-info">
            <h4>🌡️ Sıcaklık Bilgisi</h4>
            <p>Sıcaklık, havanın ne kadar sıcak veya soğuk olduğunu gösterir. Termometre ile ölçülür.</p>
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

      <audio ref={aThermometer} src="/audio/thermometer-sound.mp3" preload="auto"/>
      <audio ref={aCorrect} src="/audio/correct-sound.mp3" preload="auto"/>
      <audio ref={aWrong} src="/audio/wrong-sound.mp3" preload="auto"/>
      <audio ref={aWin} src="/audio/win-sound.mp3" preload="auto"/>
    </>
  );
}

export default function TermometrePage() {
  return (
    <AuthGuard requiredBookId="hava-olaylari" gameId="sicaklik-termometresi">
      <SicaklikTermometresiOyunu />
    </AuthGuard>
  );
}
