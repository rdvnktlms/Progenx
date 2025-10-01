"use client";
import { useEffect, useRef, useState } from "react";

interface MapItem {
  id: string;
  type: 'house' | 'tree' | 'cafe' | 'shop' | 'elf' | 'bigfoot' | 'fairy';
  x: number;
  y: number;
  label: string;
}

interface Score {
  fun: number;
  courage: number;
  discoveries: number;
  silliness: number;
}

export default function TatilHaritasiOyunu() {
  const [mapItems, setMapItems] = useState<MapItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('house');
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState<Score>({ fun: 0, courage: 0, discoveries: 0, silliness: 0 });
  const [muted, setMuted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aSuccess = useRef<HTMLAudioElement | null>(null);
  const aPlace = useRef<HTMLAudioElement | null>(null);

  const play = (el: HTMLAudioElement | null) => { 
    if(!muted && el){ 
      try { 
        el.currentTime = 0; 
        el.play(); 
      } catch {} 
    } 
  };

  const itemTypes = [
    { id: 'house', icon: '🏠', label: 'Ev', color: '#8B4513' },
    { id: 'tree', icon: '🌳', label: 'Büyük Meşe', color: '#228B22' },
    { id: 'cafe', icon: '☕', label: 'Kafe', color: '#D2691E' },
    { id: 'shop', icon: '🏪', label: 'Büfe', color: '#4169E1' },
    { id: 'elf', icon: '🧝', label: 'Orman Elfi', color: '#32CD32' },
    { id: 'bigfoot', icon: '🦶', label: 'Koca Ayak', color: '#8B4513' },
    { id: 'fairy', icon: '🧚', label: 'Tuz Perisi', color: '#FF69B4' }
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newItem: MapItem = {
      id: `${selectedItem}-${Date.now()}`,
      type: selectedItem as any,
      x: x,
      y: y,
      label: itemTypes.find(item => item.id === selectedItem)?.label || ''
    };
    
    setMapItems(prev => [...prev, newItem]);
    play(aPlace.current);
    
    // Puan hesaplama
    updateScore(selectedItem);
  };

  const updateScore = (itemType: string) => {
    setScore(prev => {
      const newScore = { ...prev };
      
      switch(itemType) {
        case 'house':
          newScore.fun += 1;
          newScore.discoveries += 1;
          break;
        case 'tree':
          newScore.fun += 2;
          newScore.courage += 1;
          break;
        case 'cafe':
          newScore.fun += 2;
          newScore.discoveries += 1;
          break;
        case 'shop':
          newScore.fun += 1;
          newScore.discoveries += 1;
          break;
        case 'elf':
          newScore.fun += 3;
          newScore.courage += 2;
          newScore.silliness += 3;
          break;
        case 'bigfoot':
          newScore.fun += 4;
          newScore.courage += 3;
          newScore.silliness += 4;
          break;
        case 'fairy':
          newScore.fun += 3;
          newScore.courage += 2;
          newScore.silliness += 3;
          break;
      }
      
      return newScore;
    });
  };

  const clearMap = () => {
    setMapItems([]);
    setScore({ fun: 0, courage: 0, discoveries: 0, silliness: 0 });
    setShowScore(false);
  };

  const finishMap = () => {
    play(aSuccess.current);
    setShowScore(true);
  };

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Arka plan çiz
    ctx.fillStyle = '#F0F8FF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid çiz
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Harita öğelerini çiz
    mapItems.forEach(item => {
      const itemType = itemTypes.find(type => type.id === item.type);
      if (!itemType) return;
      
      // İkon çiz
      ctx.font = '24px Arial';
      ctx.fillStyle = itemType.color;
      ctx.fillText(itemType.icon, item.x - 12, item.y + 8);
      
      // Label çiz
      ctx.font = '12px Arial';
      ctx.fillStyle = '#333';
      ctx.fillText(itemType.label, item.x - 20, item.y + 30);
    });
  };

  useEffect(() => {
    drawMap();
  }, [mapItems]);

  const totalScore = score.fun + score.courage + score.discoveries + score.silliness;

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🗺️ Tatil Haritası Çizme</span>
          <span className="game-message">Haritana önemli yerleri ve hayalî karakterleri ekle!</span>
        </div>
        <div className="game-controls">
          <button className="control-btn mute-btn" aria-pressed={muted} onClick={()=>setMuted(m=>!m)} title={muted?"Sesi Aç":"Sesi Kapat"}>
            {muted?"🔇":"🔊"}
          </button>
          <button className="control-btn new-game-btn" onClick={clearMap} title="Haritayı Temizle">
            🗑️
          </button>
        </div>
      </section>

      <section className="map-creation-section">
        <div className="map-tools">
          <h3>🎨 Harita Araçları</h3>
          <div className="tool-selection">
            {itemTypes.map(item => (
              <button
                key={item.id}
                className={`tool-btn ${selectedItem === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedItem(item.id)}
                title={item.label}
              >
                <span className="tool-icon">{item.icon}</span>
                <span className="tool-label">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="map-actions">
            <button className="action-btn finish-btn" onClick={finishMap} disabled={mapItems.length === 0}>
              ✅ Haritayı Bitir
            </button>
          </div>
        </div>

        <div className="map-canvas-container">
          <h3>🗺️ Tatil Haritası</h3>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onClick={handleCanvasClick}
            className="map-canvas"
            style={{ cursor: 'crosshair', border: '2px solid #333', borderRadius: '8px' }}
          />
          <p className="canvas-instruction">Haritana tıklayarak öğeler ekle!</p>
        </div>

        <div className="score-panel">
          <h3>📊 Macera Puanları</h3>
          <div className="score-grid">
            <div className="score-item">
              <span className="score-label">😄 Eğlence:</span>
              <span className="score-value">{score.fun}</span>
            </div>
            <div className="score-item">
              <span className="score-label">💪 Cesaret:</span>
              <span className="score-value">{score.courage}</span>
            </div>
            <div className="score-item">
              <span className="score-label">🔍 Keşifler:</span>
              <span className="score-value">{score.discoveries}</span>
            </div>
            <div className="score-item">
              <span className="score-label">🤪 Aptallıklar:</span>
              <span className="score-value">{score.silliness}</span>
            </div>
            <div className="score-item total">
              <span className="score-label">🏆 Toplam:</span>
              <span className="score-value">{totalScore}</span>
            </div>
          </div>
        </div>
      </section>

      {showScore && (
        <div className="score-modal">
          <div className="modal-content">
            <h2>🎉 Harita Tamamlandı!</h2>
            <div className="final-scores">
              <h3>📊 Macera Değerlendirmesi</h3>
              <div className="score-breakdown">
                <div className="score-row">
                  <span>😄 Eğlence:</span>
                  <span>{score.fun}/20</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: `${(score.fun/20)*100}%`}}></div>
                  </div>
                </div>
                <div className="score-row">
                  <span>💪 Cesaret:</span>
                  <span>{score.courage}/15</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: `${(score.courage/15)*100}%`}}></div>
                  </div>
                </div>
                <div className="score-row">
                  <span>🔍 Keşifler:</span>
                  <span>{score.discoveries}/15</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: `${(score.discoveries/15)*100}%`}}></div>
                  </div>
                </div>
                <div className="score-row">
                  <span>🤪 Aptallıklar:</span>
                  <span>{score.silliness}/20</span>
                  <div className="score-bar">
                    <div className="score-fill" style={{width: `${(score.silliness/20)*100}%`}}></div>
                  </div>
                </div>
              </div>
              <div className="total-score">
                <h3>🏆 Toplam Puan: {totalScore}/70</h3>
                <p className="score-message">
                  {totalScore >= 60 ? "🌟 Mükemmel bir maceracı oldun!" :
                   totalScore >= 40 ? "🎯 İyi bir başlangıç yaptın!" :
                   totalScore >= 20 ? "🚀 Devam et, daha da iyisini yapabilirsin!" :
                   "💪 Daha çok keşfetmeye ihtiyacın var!"}
                </p>
              </div>
            </div>
            <button className="modal-btn" onClick={() => setShowScore(false)}>
              🗺️ Haritaya Dön
            </button>
          </div>
        </div>
      )}

      <audio ref={aSuccess} src="/audio/success-sound.mp3" preload="auto"/>
      <audio ref={aPlace} src="/audio/place-sound.mp3" preload="auto"/>
    </>
  );
}
