"use client";
import { useEffect, useRef, useState } from "react";

interface MapItem {
  id: string;
  type: string;
  x: number;
  y: number;
  label: string;
  visited: boolean;
  distance: number;
  notes: string;
}

interface Player {
  x: number;
  y: number;
  totalSteps: number;
  visitedPlaces: string[];
}

interface DiaryEntry {
  id: string;
  date: string;
  steps: number;
  places: string[];
  notes: string;
  learnings: string;
}

export default function TatilHaritasiOyunu() {
  const [mapItems, setMapItems] = useState<MapItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('toy-store');
  const [player, setPlayer] = useState<Player>({ x: 50, y: 50, totalSteps: 0, visitedPlaces: [] });
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentLearning, setCurrentLearning] = useState('');
  const [showDiary, setShowDiary] = useState(false);
  const [muted, setMuted] = useState(false);
  const [customDistance, setCustomDistance] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  
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
    { id: 'toy-store', icon: '🧸', label: 'Oyuncakçı', color: '#FF69B4' },
    { id: 'bookstore', icon: '📚', label: 'Kitapçı', color: '#8B4513' },
    { id: 'hairdresser', icon: '💇', label: 'Kuaför', color: '#FF1493' },
    { id: 'library', icon: '📖', label: 'Kütüphane', color: '#4169E1' },
    { id: 'pharmacy', icon: '💊', label: 'Eczane', color: '#32CD32' },
    { id: 'hospital', icon: '🏥', label: 'Hastane', color: '#FF6347' },
    { id: 'cafe', icon: '☕', label: 'Kafe', color: '#D2691E' },
    { id: 'park', icon: '🌳', label: 'Park', color: '#228B22' },
    { id: 'school', icon: '🏫', label: 'Okul', color: '#9370DB' },
    { id: 'playground', icon: '🎠', label: 'Oyun Parkı', color: '#FFD700' },
    { id: 'museum', icon: '🏛️', label: 'Müze', color: '#B8860B' },
    { id: 'restaurant', icon: '🍽️', label: 'Restoran', color: '#DC143C' }
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newItem: MapItem = {
      id: `${selectedItem}-${Date.now()}`,
      type: selectedItem,
      x: x,
      y: y,
      label: itemTypes.find(item => item.id === selectedItem)?.label || '',
      visited: false,
      distance: 0,
      notes: ''
    };
    
    setMapItems(prev => [...prev, newItem]);
    play(aPlace.current);
  };

  const visitPlace = (itemId: string) => {
    setMapItems(prev => prev.map(item => {
      if (item.id === itemId && !item.visited) {
        // Manuel mesafe girişi varsa onu kullan, yoksa otomatik hesapla
        let steps = 0;
        if (customDistance && customDistance.trim() !== '' && !isNaN(Number(customDistance)) && Number(customDistance) > 0) {
          steps = Number(customDistance);
          console.log('Manuel mesafe kullanıldı:', steps);
        } else {
          // Mesafeyi hesapla (basit mesafe hesabı)
          const distance = Math.sqrt(Math.pow(item.x - player.x, 2) + Math.pow(item.y - player.y, 2));
          steps = Math.round(distance / 10);
          console.log('Otomatik mesafe hesaplandı:', steps);
        }
        
        // Sadece adım sayısını artır, çocuk başlangıç konumunda kalsın
        setPlayer(prev => ({
          ...prev,
          totalSteps: prev.totalSteps + steps,
          visitedPlaces: [...prev.visitedPlaces, item.label]
        }));
        
        // Mesafe girişini temizle
        setCustomDistance('');
        
        return {
          ...item,
          visited: true,
          distance: steps
        };
      }
      return item;
    }));
    play(aSuccess.current);
  };

  const addDiaryEntry = () => {
    if (currentNote.trim() || currentLearning.trim()) {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('tr-TR'),
        steps: player.totalSteps,
        places: [...player.visitedPlaces],
        notes: currentNote,
        learnings: currentLearning
      };
      
      setDiaryEntries(prev => [...prev, newEntry]);
      setCurrentNote('');
      setCurrentLearning('');
    }
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanX(0);
    setPanY(0);
  };

  const goToPlayer = () => {
    setPanX(-player.x + 300);
    setPanY(-player.y + 200);
  };

  const clearMap = () => {
    setMapItems([]);
    setPlayer({ x: 50, y: 50, totalSteps: 0, visitedPlaces: [] });
    setDiaryEntries([]);
    setCurrentNote('');
    setCurrentLearning('');
    resetView();
  };

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Transform uygula (zoom + pan)
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(zoomLevel, zoomLevel);
    
    // Arka plan çiz
    ctx.fillStyle = '#E8F5E8';
    ctx.fillRect(-panX / zoomLevel, -panY / zoomLevel, canvas.width / zoomLevel, canvas.height / zoomLevel);
    
    // Grid çiz
    ctx.strokeStyle = '#D0E0D0';
    ctx.lineWidth = 1 / zoomLevel;
    const gridSize = 50;
    const startX = Math.floor(-panX / zoomLevel / gridSize) * gridSize;
    const startY = Math.floor(-panY / zoomLevel / gridSize) * gridSize;
    const endX = startX + canvas.width / zoomLevel + gridSize;
    const endY = startY + canvas.height / zoomLevel + gridSize;
    
    for (let i = startX; i <= endX; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, startY);
      ctx.lineTo(i, endY);
      ctx.stroke();
    }
    for (let i = startY; i <= endY; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, i);
      ctx.lineTo(endX, i);
      ctx.stroke();
    }
    
    // Başlangıç noktasını çiz (ev)
    ctx.fillStyle = '#8B4513';
    ctx.font = `${20 / zoomLevel}px Arial`;
    ctx.fillText('🏠', player.x - 10 / zoomLevel, player.y + 8 / zoomLevel);
    ctx.fillStyle = '#333';
    ctx.font = `${12 / zoomLevel}px Arial`;
    ctx.fillText('BAŞLANGIÇ', player.x - 25 / zoomLevel, player.y + 25 / zoomLevel);
    
    // Çocuk emojisini çiz
    ctx.fillStyle = '#FF69B4';
    ctx.font = `${16 / zoomLevel}px Arial`;
    ctx.fillText('🧒', player.x + 15 / zoomLevel, player.y + 5 / zoomLevel);
    
    // Harita öğelerini çiz
    mapItems.forEach(item => {
      const itemType = itemTypes.find(type => type.id === item.type);
      if (!itemType) return;
      
      // Ziyaret edilmiş yerler için farklı stil
      if (item.visited) {
        // Ziyaret edilmiş yer için çerçeve çiz
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3 / zoomLevel;
        ctx.strokeRect(item.x - 15 / zoomLevel, item.y - 15 / zoomLevel, 30 / zoomLevel, 30 / zoomLevel);
      }
      
      // İkon çiz
      ctx.font = `${24 / zoomLevel}px Arial`;
      ctx.fillStyle = itemType.color;
      ctx.fillText(itemType.icon, item.x - 12 / zoomLevel, item.y + 8 / zoomLevel);
      
      // Label çiz
      ctx.font = `${12 / zoomLevel}px Arial`;
      ctx.fillStyle = item.visited ? '#00AA00' : '#333';
      ctx.fillText(itemType.label, item.x - 20 / zoomLevel, item.y + 30 / zoomLevel);
      
      // Mesafe bilgisini çiz
      if (item.visited && item.distance > 0) {
        ctx.fillStyle = '#666';
        ctx.font = `${10 / zoomLevel}px Arial`;
        ctx.fillText(`${item.distance} adım`, item.x - 15 / zoomLevel, item.y + 45 / zoomLevel);
      }
      
      // Oyuncudan bu yere çizgi çiz
      if (item.visited) {
        ctx.strokeStyle = '#00AA00';
        ctx.lineWidth = 2 / zoomLevel;
        ctx.setLineDash([5 / zoomLevel, 5 / zoomLevel]);
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(item.x, item.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
    
    // Transform'u geri al
    ctx.restore();
  };

  useEffect(() => {
    drawMap();
  }, [mapItems, player, zoomLevel, panX, panY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.max(0.5, Math.min(3, zoomLevel + delta));
      
      // Zoom merkezi mouse pozisyonu
      const zoomRatio = newZoom / zoomLevel;
      setPanX(x - (x - panX) * zoomRatio);
      setPanY(y - (y - panY) * zoomRatio);
      setZoomLevel(newZoom);
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [zoomLevel, panX, panY]);

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🗺️ Tatil Haritası Keşfi</span>
          <span className="game-message">Şehirdeki yerleri keşfet ve günlük tut!</span>
        </div>
        <div className="game-controls">
          <button className="control-btn mute-btn" aria-pressed={muted} onClick={()=>setMuted(m=>!m)} title={muted?"Sesi Aç":"Sesi Kapat"}>
            {muted?"🔇":"🔊"}
          </button>
          <button className="control-btn new-game-btn" onClick={clearMap} title="Haritayı Temizle">
            🗑️
          </button>
          <button className="control-btn diary-btn" onClick={()=>setShowDiary(!showDiary)} title="Günlüğü Aç/Kapat">
            📔
          </button>
          <button className="control-btn zoom-in-btn" onClick={zoomIn} title="Yakınlaştır">
            🔍+
          </button>
          <button className="control-btn zoom-out-btn" onClick={zoomOut} title="Uzaklaştır">
            🔍-
          </button>
          <button className="control-btn reset-view-btn" onClick={resetView} title="Görünümü Sıfırla">
            🎯
          </button>
          <button className="control-btn player-location-btn" onClick={goToPlayer} title="Konumuma Git">
            📍
          </button>
        </div>
      </section>

      <section className="map-creation-section">
        <div className="map-tools">
          <h3>🎨 Yer Ekleme Araçları</h3>
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
        </div>

        <div className="map-canvas-container">
          <div className="canvas-header">
            <h3>🗺️ Şehir Haritası</h3>
            <div className="zoom-indicator">
              <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onClick={handleCanvasClick}
            className="map-canvas"
            style={{ cursor: 'crosshair', border: '2px solid #333', borderRadius: '8px' }}
          />
          <p className="canvas-instruction">Haritaya tıklayarak yerler ekle, eklediğin yerlere tıklayarak ziyaret et! Mouse wheel ile zoom yapabilirsin.</p>
        </div>

        <div className="player-stats">
          <h3>🧒 Oyuncu Bilgileri</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">📍 Konum:</span>
              <span className="stat-value">({Math.round(player.x)}, {Math.round(player.y)})</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">👣 Toplam Adım:</span>
              <span className="stat-value">{player.totalSteps}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">🏪 Ziyaret Edilen Yerler:</span>
              <span className="stat-value">{player.visitedPlaces.length}</span>
            </div>
          </div>
          
          <div className="distance-input">
            <label>👣 Mesafe Girişi (Adım):</label>
            <div className="distance-input-row">
              <input 
                type="number" 
                value={customDistance}
                onChange={(e) => setCustomDistance(e.target.value)}
                placeholder="Boş bırak otomatik hesapla"
                min="0"
                className="distance-input-field"
              />
              <button 
                className="clear-distance-btn"
                onClick={() => setCustomDistance('')}
                title="Mesafe girişini temizle"
              >
                🗑️
              </button>
            </div>
            <small>Boş bırakırsan otomatik hesaplanır. Şu an: {customDistance ? `${customDistance} adım` : 'Otomatik'}</small>
          </div>
          
          <div className="visited-places">
            <strong>Ziyaret Edilen Yerler:</strong>
            <div className="places-list">
              {player.visitedPlaces.map((place, index) => (
                <span key={index} className="visited-place">✓ {place}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="places-list-container">
          <h3>🏪 Eklenen Yerler</h3>
          <div className="places-grid">
            {mapItems.map(item => (
              <div key={item.id} className={`place-card ${item.visited ? 'visited' : ''}`}>
                <div className="place-icon">
                  {itemTypes.find(type => type.id === item.type)?.icon}
                </div>
                <div className="place-info">
                  <h4>{item.label}</h4>
                  <p>Konum: ({Math.round(item.x)}, {Math.round(item.y)})</p>
                  {item.visited && (
                    <p className="distance-info">Mesafe: {item.distance} adım</p>
                  )}
                </div>
                <button 
                  className={`visit-btn ${item.visited ? 'visited' : ''}`}
                  onClick={() => visitPlace(item.id)}
                  disabled={item.visited}
                >
                  {item.visited ? '✓ Ziyaret Edildi' : '🎯 Ziyaret Et'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showDiary && (
        <div className="diary-section">
          <h3>📔 Günlük</h3>
          <div className="diary-form">
            <div className="form-group">
              <label>📝 Bu gün neler yaptın?</label>
              <textarea 
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Bugün hangi yerleri ziyaret ettin? Neler gördün?"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>🧠 Neler öğrendin?</label>
              <textarea 
                value={currentLearning}
                onChange={(e) => setCurrentLearning(e.target.value)}
                placeholder="Bu yerlerde neler öğrendin? Hangi bilgileri edindin?"
                rows={3}
              />
            </div>
            <button className="add-entry-btn" onClick={addDiaryEntry}>
              📝 Günlüğe Ekle
            </button>
          </div>
          
          <div className="diary-entries">
            <h4>📚 Günlük Kayıtları</h4>
            {diaryEntries.length === 0 ? (
              <p className="no-entries">Henüz günlük kaydı yok. İlk kaydını ekle!</p>
            ) : (
              diaryEntries.map(entry => (
                <div key={entry.id} className="diary-entry">
                  <div className="entry-header">
                    <span className="entry-date">📅 {entry.date}</span>
                    <span className="entry-steps">👣 {entry.steps} adım</span>
                  </div>
                  <div className="entry-places">
                    <strong>Ziyaret Edilen Yerler:</strong>
                    <div className="entry-places-list">
                      {entry.places.map((place, index) => (
                        <span key={index} className="entry-place">• {place}</span>
                      ))}
                    </div>
                  </div>
                  {entry.notes && (
                    <div className="entry-notes">
                      <strong>📝 Notlar:</strong>
                      <p>{entry.notes}</p>
                    </div>
                  )}
                  {entry.learnings && (
                    <div className="entry-learnings">
                      <strong>🧠 Öğrendiklerim:</strong>
                      <p>{entry.learnings}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <audio ref={aSuccess} src="/audio/success-sound.mp3" preload="auto"/>
      <audio ref={aPlace} src="/audio/place-sound.mp3" preload="auto"/>
    </>
  );
}
