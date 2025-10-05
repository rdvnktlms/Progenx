"use client";
import { useEffect, useRef, useState } from "react";
import AuthGuard from "../../utils/authGuard";

interface Item {
  id: string;
  name: string;
  icon: string;
  weight: number;
  category: 'light' | 'medium' | 'heavy';
  essential: boolean;
  description: string;
}

interface BackpackItem extends Item {
  position: { x: number; y: number };
  inBackpack: boolean;
}

function SirtCantasiOyunu() {
  const [items, setItems] = useState<BackpackItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Client-side rendering için useEffect kullan
  useEffect(() => {
    setIsClient(true);
    
    // Tüm eşyaları karışık sırada oluştur
    const allItems: BackpackItem[] = [
      { id: 'hat', name: 'Şapka', icon: '🧢', weight: 0.2, category: 'light', essential: true, description: 'Güneşten ve soğuktan korur', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'thermos', name: 'Termos', icon: '🍼', weight: 0.8, category: 'heavy', essential: true, description: 'Suyu sıcak/soğuk tutar', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'snacks', name: 'Atıştırmalık', icon: '🍎', weight: 0.5, category: 'medium', essential: true, description: 'Enerji verir', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'knife', name: 'Çakı', icon: '🔪', weight: 0.3, category: 'medium', essential: true, description: 'Çok amaçlı alet', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'jacket', name: 'Rüzgârlık', icon: '🧥', weight: 0.6, category: 'medium', essential: true, description: 'Hava değişimine karşı', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'firstaid', name: 'İlk Yardım', icon: '🩹', weight: 0.4, category: 'light', essential: true, description: 'Güvenlik için gerekli', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'flashlight', name: 'El Feneri', icon: '🔦', weight: 0.3, category: 'light', essential: true, description: 'Gece aydınlatması', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'rope', name: 'İp', icon: '🧶', weight: 0.4, category: 'medium', essential: true, description: 'Çok amaçlı ip', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'book', name: 'Kitap', icon: '📚', weight: 1.2, category: 'heavy', essential: false, description: '1800 sayfalık roman', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'camera', name: 'Kamera', icon: '📷', weight: 0.7, category: 'heavy', essential: false, description: 'Anıları kaydetmek için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'towel', name: 'Havlu', icon: '🏖️', weight: 0.3, category: 'light', essential: false, description: 'Deniz için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'sunglasses', name: 'Güneş Gözlüğü', icon: '🕶️', weight: 0.1, category: 'light', essential: false, description: 'Güneş ışığından korur', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'phone', name: 'Telefon', icon: '📱', weight: 0.2, category: 'light', essential: false, description: 'Acil durumlar için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'tent', name: 'Çadır', icon: '⛺', weight: 2.5, category: 'heavy', essential: false, description: 'Kamp için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'sleepingbag', name: 'Uyku Tulumu', icon: '🛌', weight: 1.5, category: 'heavy', essential: false, description: 'Gece konaklama', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'binoculars', name: 'Dürbün', icon: '🔭', weight: 0.6, category: 'heavy', essential: false, description: 'Uzaktan gözlem', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'compass', name: 'Pusula', icon: '🧭', weight: 0.2, category: 'light', essential: false, description: 'Yön bulma', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'matches', name: 'Kibrit', icon: '🔥', weight: 0.1, category: 'light', essential: false, description: 'Ateş yakma', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'whistle', name: 'Düdük', icon: '📯', weight: 0.1, category: 'light', essential: false, description: 'Sinyal verme', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'sunscreen', name: 'Güneş Kremi', icon: '🧴', weight: 0.3, category: 'light', essential: false, description: 'Güneşten korunma', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'batteries', name: 'Pil', icon: '🔋', weight: 0.4, category: 'medium', essential: false, description: 'Elektronik cihazlar için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'notebook', name: 'Defter', icon: '📝', weight: 0.2, category: 'light', essential: false, description: 'Not almak için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'pen', name: 'Kalem', icon: '✏️', weight: 0.1, category: 'light', essential: false, description: 'Yazı yazma', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'umbrella', name: 'Şemsiye', icon: '☂️', weight: 0.8, category: 'heavy', essential: false, description: 'Yağmurdan korunma', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'magazine', name: 'Dergi', icon: '📰', weight: 0.3, category: 'medium', essential: false, description: 'Okuma materyali', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'game', name: 'Oyun', icon: '🎲', weight: 0.2, category: 'light', essential: false, description: 'Eğlence için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'pillow', name: 'Yastık', icon: '🛏️', weight: 0.5, category: 'medium', essential: false, description: 'Rahatlık için', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'mirror', name: 'Ayna', icon: '🪞', weight: 0.2, category: 'light', essential: false, description: 'Kişisel bakım', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'toothbrush', name: 'Diş Fırçası', icon: '🪥', weight: 0.1, category: 'light', essential: false, description: 'Hijyen', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'soap', name: 'Sabun', icon: '🧼', weight: 0.2, category: 'light', essential: false, description: 'Temizlik', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'extra_shoes', name: 'Yedek Ayakkabı', icon: '👟', weight: 1.0, category: 'heavy', essential: false, description: 'Ayak sağlığı', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'socks', name: 'Çorap', icon: '🧦', weight: 0.1, category: 'light', essential: false, description: 'Ayak sağlığı', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'cap', name: 'Bere', icon: '🎩', weight: 0.2, category: 'light', essential: false, description: 'Kafa koruması', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'gloves', name: 'Eldiven', icon: '🧤', weight: 0.2, category: 'light', essential: false, description: 'El koruması', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'watch', name: 'Saat', icon: '⌚', weight: 0.1, category: 'light', essential: false, description: 'Zaman takibi', position: { x: 0, y: 0 }, inBackpack: false },
      
      // Komik ve Absürt Eşyalar
      { id: 'doll', name: 'Oyuncak Bebek', icon: '🧸', weight: 0.8, category: 'heavy', essential: false, description: 'En sevdiğin oyuncak bebek - bazen en iyi arkadaşın olur!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'whistle_pot', name: 'Düdüklü Tencere', icon: '🍲', weight: 2.0, category: 'heavy', essential: false, description: 'Acil durumlarda ses çıkarmak için... ya da çorba yapmak için!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'rubber_duck', name: 'Lastik Ördek', icon: '🦆', weight: 0.3, category: 'light', essential: false, description: 'Banyoda yüzen arkadaşın - maceralarda da işe yarar mı acaba?', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'fake_mustache', name: 'Sahte Bıyık', icon: '🥸', weight: 0.05, category: 'light', essential: false, description: 'Kimliğini gizlemek için... ya da sadece komik görünmek için!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'party_hat', name: 'Parti Şapkası', icon: '🎉', weight: 0.1, category: 'light', essential: false, description: 'Her an parti zamanı! Macerada da eğlence olmalı!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'slinky', name: 'Yaylı Oyuncak', icon: '🌀', weight: 0.4, category: 'medium', essential: false, description: 'Merdivenden aşağı inerken eğlence garantili!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'whoopee_cushion', name: 'Şakacı Yastık', icon: '💨', weight: 0.2, category: 'light', essential: false, description: 'Arkadaşları güldürmek için... ya da kendini eğlendirmek için!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'magic_8ball', name: 'Sihirli 8 Topu', icon: '🎱', weight: 0.3, category: 'light', essential: false, description: 'Zor kararlar için büyülü cevaplar!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'superhero_cape', name: 'Süper Kahraman Pelerini', icon: '🦸', weight: 0.3, category: 'light', essential: false, description: 'İçindeki süper kahramanı ortaya çıkar!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'rubber_chicken', name: 'Lastik Tavuk', icon: '🐔', weight: 0.6, category: 'medium', essential: false, description: 'Klasik şaka malzemesi - herkesi güldürür!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'fake_nose', name: 'Sahte Burun', icon: '👃', weight: 0.1, category: 'light', essential: false, description: 'Kırmızı, yuvarlak ve çok komik!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'confetti', name: 'Konfeti', icon: '🎊', weight: 0.2, category: 'light', essential: false, description: 'Her an kutlama zamanı!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'bubble_wrap', name: 'Baloncuklu Naylon', icon: '🫧', weight: 0.3, category: 'light', essential: false, description: 'Stres atma garantili - pop pop pop!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'whoopee_hand', name: 'Şakacı El', icon: '🤚', weight: 0.1, category: 'light', essential: false, description: 'Arkadaşları şaşırtmak için mükemmel!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'fake_spider', name: 'Sahte Örümcek', icon: '🕷️', weight: 0.05, category: 'light', essential: false, description: 'Korkakları korkutmak için... ya da sadece eğlenmek için!', position: { x: 0, y: 0 }, inBackpack: false },
      { id: 'whoopee_glasses', name: 'Şakacı Gözlük', icon: '🤓', weight: 0.1, category: 'light', essential: false, description: 'Büyük gözlerle dünyayı gör!', position: { x: 0, y: 0 }, inBackpack: false }
    ];
    
    // Eşyaları karıştır
    const shuffledItems = allItems.sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
  }, []); // Boş dependency array - sadece mount'ta çalışsın
  
  const [userWeight, setUserWeight] = useState(40);
  const [maxWeight, setMaxWeight] = useState(4);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const aSuccess = useRef<HTMLAudioElement | null>(null);
  const aError = useRef<HTMLAudioElement | null>(null);
  const aPlace = useRef<HTMLAudioElement | null>(null);

  const play = (el: HTMLAudioElement | null) => { 
    if(!muted && el){ 
      try { 
        el.currentTime = 0; 
        el.play(); 
      } catch {} 
    } 
  };

  useEffect(() => {
    setMaxWeight(Math.round(userWeight * 0.1)); // Vücut ağırlığının %10'u
  }, [userWeight]);

  useEffect(() => {
    const totalWeight = items.filter(item => item.inBackpack).reduce((sum, item) => sum + item.weight, 0);
    setCurrentWeight(totalWeight);
  }, [items]);

  const toggleItemInBackpack = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (!item.inBackpack) {
      // Eşya ekleniyor
      const newWeight = currentWeight + item.weight;
      if (newWeight > maxWeight) {
        play(aError.current);
        return;
      }
      play(aPlace.current);
    } else {
      // Eşya çıkarılıyor
      play(aPlace.current);
    }

    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, inBackpack: !item.inBackpack }
        : item
    ));
  };

  const calculateScore = () => {
    const backpackItems = items.filter(item => item.inBackpack);
    const essentialItems = backpackItems.filter(item => item.essential);
    const nonEssentialItems = backpackItems.filter(item => !item.essential);
    const allEssentialItems = items.filter(item => item.essential);
    
    let points = 0;
    
    // Temel eşyalar puanı (maksimum 50 puan)
    const essentialScore = (essentialItems.length / allEssentialItems.length) * 50;
    points += essentialScore;
    
    // Gereksiz eşyalar puanı (az olması iyi, maksimum 25 puan)
    const nonEssentialPenalty = Math.min(25, nonEssentialItems.length * 2);
    points += Math.max(0, 25 - nonEssentialPenalty);
    
    // Ağırlık puanı (doğru ağırlıkta olması iyi, maksimum 25 puan)
    if (currentWeight > maxWeight) {
      points -= 20; // Aşırı ağırlık cezası
    } else if (currentWeight >= maxWeight * 0.7 && currentWeight <= maxWeight) {
      points += 25; // Mükemmel ağırlık
    } else if (currentWeight >= maxWeight * 0.5) {
      points += 15; // İyi ağırlık
    } else {
      points += 5; // Çok hafif ama yine de puan
    }
    
    // Maksimum 100 puan sınırı
    return Math.max(0, Math.min(100, Math.round(points)));
  };

  const finishPacking = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResult(true);
    play(aSuccess.current);
  };

  const resetBackpack = () => {
    setItems(prev => prev.map(item => ({ ...item, inBackpack: false })));
    setScore(0);
    setShowResult(false);
  };

  const backpackItems = items.filter(item => item.inBackpack);
  const essentialItemsInBackpack = backpackItems.filter(item => item.essential);
  const allEssentialItems = items.filter(item => item.essential);

  // Client-side rendering kontrolü
  if (!isClient) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <section className="game-top">
        <div className="status">
          <span className="turn-label">🎒 Sırt Çantası Hazırlama</span>
          <span className="game-message">Hey maceracı! Çantanı akıllıca hazırla ve yeni keşiflere hazırlan! 🗺️✨</span>
        </div>
        <div className="game-controls">
          <button className="control-btn mute-btn" aria-pressed={muted} onClick={()=>setMuted(m=>!m)} title={muted?"Sesi Aç":"Sesi Kapat"}>
            {muted?"🔇":"🔊"}
          </button>
          <button className="control-btn new-game-btn" onClick={resetBackpack} title="Çantayı Boşalt">
            🗑️
          </button>
        </div>
      </section>

      <section className="backpack-section">
        <div className="user-info">
          <h3>👤 Kişisel Bilgiler</h3>
          <div className="weight-selector">
            <label>Kilonuz: {userWeight} kg</label>
            <input
              type="range"
              min="20"
              max="80"
              value={userWeight}
              onChange={(e) => setUserWeight(parseInt(e.target.value))}
              className="weight-slider"
            />
            <div className="weight-info">
              <span>Çantanın taşıyabileceği en fazla ağırlık: {maxWeight} kg</span>
            </div>
          </div>
        </div>

        <div className="backpack-container">
          <div className="backpack-header">
            <h3>🎒 Sırt Çantası</h3>
            <div className="weight-status">
              <div className="weight-bar">
                <div 
                  className="weight-fill" 
                  style={{ 
                    width: `${Math.min(100, (currentWeight / maxWeight) * 100)}%`,
                    backgroundColor: currentWeight > maxWeight ? '#ff4444' : '#4CAF50'
                  }}
                ></div>
              </div>
              <span className="weight-text">
                {currentWeight.toFixed(1)} kg / {maxWeight} kg
              </span>
            </div>
          </div>

          <div className="backpack-area">
            <div className="backpack-layers">
              <div className="layer light-layer">
                <h4>🪶 Hafif Eşyalar (Çantanın Alt Katı)</h4>
                <div className="layer-items">
                  {backpackItems.filter(item => item.category === 'light').map(item => (
                    <div key={item.id} className="packed-item light" title={item.description}>
                      <span className="item-icon">{item.icon}</span>
                      <span className="item-weight">{item.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="layer heavy-layer">
                <h4>⚖️ Ağır Eşyalar (Çantanın Orta Katı)</h4>
                <div className="layer-items">
                  {backpackItems.filter(item => item.category === 'heavy').map(item => (
                    <div key={item.id} className="packed-item heavy" title={item.description}>
                      <span className="item-icon">{item.icon}</span>
                      <span className="item-weight">{item.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="layer medium-layer">
                <h4>📦 Orta Ağırlık Eşyalar (Çantanın Üst Katı)</h4>
                <div className="layer-items">
                  {backpackItems.filter(item => item.category === 'medium').map(item => (
                    <div key={item.id} className="packed-item medium" title={item.description}>
                      <span className="item-icon">{item.icon}</span>
                      <span className="item-weight">{item.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="backpack-actions">
              <button 
                className="finish-btn" 
                onClick={finishPacking}
                disabled={backpackItems.length === 0}
              >
                ✅ Çantayı Hazırla
              </button>
            </div>
          </div>
        </div>

        <div className="items-selection">
          <h3>📦 Mevcut Eşyalar</h3>
          <div className="items-grid">
            {items.map(item => (
              <div
                key={item.id}
                className={`item-card ${item.inBackpack ? 'selected' : ''} ${item.essential ? 'essential' : ''}`}
                onClick={() => toggleItemInBackpack(item.id)}
                title={item.description}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-weight">{item.weight} kg</div>
                <div className="item-category">
                  {item.category === 'light' ? '🪶 Hafif' : 
                   item.category === 'medium' ? '📦 Orta' : 
                   '⚖️ Ağır'}
                </div>
                {item.essential && <div className="essential-badge">⭐ Gerekli</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="progress-panel">
          <h3>📊 Hazırlık Durumu</h3>
          <div className="progress-items">
            <div className="progress-item">
              <span>⭐ Temel Eşyalar:</span>
              <span>{essentialItemsInBackpack.length}/{allEssentialItems.length}</span>
            </div>
            <div className="progress-item">
              <span>⚖️ Çanta Ağırlığı:</span>
              <span className={currentWeight > maxWeight ? 'error' : 'success'}>
                {currentWeight > maxWeight ? 'Çok Ağır!' : 'Tamam!'}
              </span>
            </div>
            <div className="progress-item">
              <span>📦 Toplam Eşya:</span>
              <span>{backpackItems.length}</span>
            </div>
          </div>
        </div>
      </section>

      {showResult && (
        <div className="result-modal">
          <div className="modal-content">
            <h2>🎒 Maceracı Çantan Hazır! 🌟</h2>
            <div className="result-details">
              <div className="score-display">
                <h3>🏆 Puan: {score}/100</h3>
                <div className="score-message">
                  {score >= 80 ? "🌟 Vay canına! Sen gerçek bir macera uzmanısın! Çantan öyle mükemmel hazırlanmış ki, artık her köşede yeni bir hikaye yaşayacaksın. Hazırsın küçük kaşif! 🗺️✨" :
                   score >= 60 ? "🎯 Güzel bir başlangıç yapıyorsun! Çantan iyi duruyor ama daha da cesur olabilirsin. Bazen en güzel maceralar, en beklenmedik eşyalarla başlar! 🚀" :
                   score >= 40 ? "🚀 Hey küçük maceracı! Çantan orta seviyede ama daha fazla cesaret ve eğlence eklemeye ne dersin? Unutma, her macera güzel anılarla dolu! 🌟" :
                   "💪 Hey dostum! Çantan biraz boş kalmış. Daha fazla macera ve keşif eklemeye ne dersin? Her güzel yolculuk iyi bir hazırlıkla başlar! 🎒"}
                </div>
              </div>
              
              <div className="result-breakdown">
                <h4>📊 Detaylar:</h4>
                <div className="breakdown-item">
                  <span>⭐ Temel Eşyalar:</span>
                  <span>{essentialItemsInBackpack.length}/{allEssentialItems.length}</span>
                </div>
                <div className="breakdown-item">
                  <span>⚖️ Çanta Ağırlığı:</span>
                  <span>{currentWeight.toFixed(1)} kg / {maxWeight} kg</span>
                </div>
                <div className="breakdown-item">
                  <span>📦 Toplam Eşya Sayısı:</span>
                  <span>{backpackItems.length}</span>
                </div>
              </div>

              <div className="advice">
                <h4>💡 Maceracı Tavsiyeleri:</h4>
                <ul>
                  {essentialItemsInBackpack.length < allEssentialItems.length && 
                    <li>⭐ Hey kaşif! Tüm temel eşyaları almayı unutma! Her macerada güvenlik önce gelir! 🛡️</li>
                  }
                  {currentWeight > maxWeight && 
                    <li>⚖️ Vay vay! Çantan çok ağır olmuş! Hafif ol ki rahatça koşabilesin! 🏃‍♂️</li>
                  }
                  {backpackItems.filter(item => !item.essential).length > 3 && 
                    <li>📦 Hmm, çok fazla gereksiz eşya var! Bazen az eşya daha çok macera demektir! ✨</li>
                  }
                  {score >= 80 && 
                    <li>🎉 Harika! Sen gerçek bir macera ustası olmuşsun! Artık her yerde yeni keşifler seni bekliyor! 🌈🗺️</li>
                  }
                  {score < 80 && score >= 60 && 
                    <li>🌟 İyi gidiyorsun! Bir sonraki macerada daha da iyi hazırlanacaksın! 🚀</li>
                  }
                  {score < 60 && 
                    <li>💪 Her güzel macera deneyimle gelir! Bir dahaki sefere daha da hazırlıklı olacaksın! 🌟</li>
                  }
                </ul>
              </div>
            </div>
            
            <button className="modal-btn" onClick={() => setShowResult(false)}>
              🗺️ Maceraya Devam Et!
            </button>
          </div>
        </div>
      )}

      <audio ref={aSuccess} src="/audio/success-sound.mp3" preload="auto"/>
      <audio ref={aError} src="/audio/error-sound.mp3" preload="auto"/>
      <audio ref={aPlace} src="/audio/place-sound.mp3" preload="auto"/>
    </>
  );
}

export default function SirtCantasiPage() {
  return (
    <AuthGuard requiredBookId="tatilde-50-macera" gameId="sirt-cantasi">
      <SirtCantasiOyunu />
    </AuthGuard>
  );
}
