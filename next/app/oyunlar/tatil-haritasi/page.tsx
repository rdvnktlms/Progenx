"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

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
  lastVisitedPlace: { x: number; y: number } | null;
}

interface DiaryEntry {
  id: string;
  date: string;
  steps: number;
  places: string[];
  notes: string;
  learnings: string;
}

function TatilHaritasiOyunu() {
  const [mapItems, setMapItems] = useState<MapItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>('toy-store');
  const [player, setPlayer] = useState<Player>({ x: 50, y: 50, totalSteps: 0, visitedPlaces: [], lastVisitedPlace: null });
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentLearning, setCurrentLearning] = useState('');
  const [showDiary, setShowDiary] = useState(false);
  const [muted, setMuted] = useState(false);
  const [customDistance, setCustomDistance] = useState('');
  
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
        // Mesafe hesaplama için başlangıç noktasını kullan
        const startX = player.lastVisitedPlace ? player.lastVisitedPlace.x : player.x;
        const startY = player.lastVisitedPlace ? player.lastVisitedPlace.y : player.y;
        
        // Manuel mesafe girişi varsa onu kullan, yoksa otomatik hesapla
        let steps = 0;
        if (customDistance && customDistance.trim() !== '' && !isNaN(Number(customDistance)) && Number(customDistance) > 0) {
          steps = Number(customDistance);
          console.log('Manuel mesafe kullanıldı:', steps);
        } else {
          // Mesafeyi hesapla (en son ziyaret edilen yerden veya başlangıçtan)
          const distance = Math.sqrt(Math.pow(item.x - startX, 2) + Math.pow(item.y - startY, 2));
          steps = Math.round(distance / 10);
          console.log('Otomatik mesafe hesaplandı:', steps);
        }
        
        // Çocuğu yeni konuma taşı ve son ziyaret edilen yeri güncelle
        setPlayer(prev => ({
          ...prev,
          x: item.x,
          y: item.y,
          totalSteps: prev.totalSteps + steps,
          visitedPlaces: [...prev.visitedPlaces, item.label],
          lastVisitedPlace: { x: item.x, y: item.y }
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

  const clearMap = () => {
    setMapItems([]);
    setPlayer({ x: 50, y: 50, totalSteps: 0, visitedPlaces: [], lastVisitedPlace: null });
    setDiaryEntries([]);
    setCurrentNote('');
    setCurrentLearning('');
  };

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Arka plan çiz
    ctx.fillStyle = '#E8F5E8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid çiz
    ctx.strokeStyle = '#D0E0D0';
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
    
    // Başlangıç noktasını çiz (ev) - sabit konum
    const homeX = 50;
    const homeY = 50;
    ctx.fillStyle = '#8B4513';
    ctx.font = '20px Arial';
    ctx.fillText('🏠', homeX - 10, homeY + 8);
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('BAŞLANGIÇ', homeX - 25, homeY + 25);
    
    // Çocuk emojisini çiz (şu anki konumunda)
    ctx.fillStyle = '#FF69B4';
    ctx.font = '16px Arial';
    ctx.fillText('🧒', player.x + 15, player.y + 5);
    
    // Harita öğelerini çiz
    mapItems.forEach(item => {
      const itemType = itemTypes.find(type => type.id === item.type);
      if (!itemType) return;
      
      // Ziyaret edilmiş yerler için farklı stil
      if (item.visited) {
        // Ziyaret edilmiş yer için çerçeve çiz
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3;
        ctx.strokeRect(item.x - 15, item.y - 15, 30, 30);
      }
      
      // İkon çiz
      ctx.font = '24px Arial';
      ctx.fillStyle = itemType.color;
      ctx.fillText(itemType.icon, item.x - 12, item.y + 8);
      
      // Label çiz
      ctx.font = '12px Arial';
      ctx.fillStyle = item.visited ? '#00AA00' : '#333';
      ctx.fillText(itemType.label, item.x - 20, item.y + 30);
      
      // Mesafe bilgisini çiz
      if (item.visited && item.distance > 0) {
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.fillText(`${item.distance} adım`, item.x - 15, item.y + 45);
      }
      
      // Bu yere çizgi çiz (sabit konumlar arasında)
      if (item.visited) {
        ctx.strokeStyle = '#00AA00';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        
        // Bu item'ın hangi sırada ziyaret edildiğini bul
        const visitedIndex = player.visitedPlaces.indexOf(item.label);
        
        if (visitedIndex === 0) {
          // İlk ziyaret edilen yer - başlangıç noktasından çiz
          ctx.moveTo(homeX, homeY);
        } else {
          // Sonraki ziyaretler - önceki ziyaret edilen yerden çiz
          const previousVisitedItem = mapItems.find(mapItem => 
            mapItem.visited && player.visitedPlaces[visitedIndex - 1] === mapItem.label
          );
          if (previousVisitedItem) {
            ctx.moveTo(previousVisitedItem.x, previousVisitedItem.y);
          } else {
            // Fallback: başlangıç noktasından çiz
            ctx.moveTo(homeX, homeY);
          }
        }
        
        ctx.lineTo(item.x, item.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  };

  useEffect(() => {
    drawMap();
  }, [mapItems, player]);

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
          <h3>🗺️ Şehir Haritası</h3>
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onClick={handleCanvasClick}
            className="map-canvas"
            style={{ cursor: 'crosshair', border: '2px solid #333', borderRadius: '8px' }}
          />
          <p className="canvas-instruction">Haritaya tıklayarak yerler ekle, eklediğin yerlere tıklayarak ziyaret et!</p>
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

export default function TatilHaritasiPage() {
  return (
    <AuthGuard requiredBookId="tatilde-50-macera" gameId="tatil-haritasi">
      <TatilHaritasiOyunu />
    </AuthGuard>
  );
}
