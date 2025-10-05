"use client";
import { useState, useEffect } from 'react';
import AuthGuard from "../../utils/authGuard";

interface Topic {
  id: string;
  title: string;
  description: string;
  words: Word[];
}

interface Word {
  id: number;
  term: string;
  definition: string;
  matched: boolean;
}

interface GameStats {
  score: number;
  attempts: number;
  timeElapsed: number;
}

function EslestirmeOyunu() {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "avustralya",
      title: "AVUSTRALYA'NIN İLK ÇEVRECİ HAKLARI",
      description: "Avustralya'nın eski kültürünü, çevreyi koruma yaklaşımlarını ve Pakanli, Muthi Muthi, Ngiyampaa gibi halkların Mungo ve Willandra Gölleri bölgesindeki yaşamlarını keşfet!",
      words: [
        { id: 1, term: "Gunyah", definition: "Avustralya Aborjinleri tarafından kullanılan, genellikle ağaç dalları ve kabuklarından yapılan basit barınak", matched: false },
        { id: 2, term: "Mungo Gölü", definition: "Avustralya'da, insanlık tarihinin en eski arkeolojik buluntularının (Mungo Adamı ve Mungo Kadını gibi) yapıldığı antik göl yatağı", matched: false },
        { id: 3, term: "Ayak İzleri", definition: "Mungo Gölü'nde bulunan antik ayak izleri, eski insanların yürüyüş yollarını ve günlük yaşamlarını gösterir", matched: false },
        { id: 4, term: "El Yapımı Ağlar", definition: "Bitki liflerinden yapılan, Murray morina balığı gibi yiyecekleri yakalamak için kullanılan geleneksel balık ağları", matched: false }
      ]
    },
    {
      id: "catalhoyuk",
      title: "ÇATALHÖYÜK'ÜN HİKÂYESİNDEN İZLER",
      description: "MÖ 7400-6500 yıllarında Anadolu'da filizlenen toplumsal cinsiyet eşitliği ve modern dünyanın kapısını aralayan toplumsal yaşam biçimini keşfet!",
      words: [
        { id: 5, term: "Pişirme Kapları", definition: "Çatalhöyük'te bulunan, günlük yaşamda kullanılan seramik kaplar ve mutfak eşyaları", matched: false },
        { id: 6, term: "Figürinler", definition: "Çatalhöyük'te bulunan, en eski derece tapıldığını gösteren küçük heykelcikler", matched: false },
        { id: 7, term: "Kerpiç Evler", definition: "Birbirine bitişik, çatılardan girilen, eşit büyüklükteki evler", matched: false },
        { id: 8, term: "Değirmen Taşları", definition: "Tahıl öğütmek için kullanılan, günlük yaşamın vazgeçilmez araçları", matched: false }
      ]
    },
    {
      id: "mungo-lake",
      title: "MUNGO GÖLÜ'NÜN HİKÂYESİNDEN İZLER",
      description: "Avustralya'da insanlık tarihinin en eski izlerini taşıyan Mungo Gölü'nün sırlarını ve antik yaşam biçimlerini keşfet!",
      words: [
        { id: 9, term: "MUNGO İNSANI", definition: "Avustralya'nın en eski bilinen insan kalıntıları, arkeolojik bulgular ve atalara saygı", matched: false },
        { id: 10, term: "Midden (Artıklar)", definition: "Mungo Gölü bölgesindeki eski insanların beslenme alışkanlıklarını gösteren kabuklu deniz ürünleri ve balık kalıntıları", matched: false },
        { id: 11, term: "Öğütme Taşları", definition: "Un yapmak ve ekmek için kullanılan, bölgede nadir bulunan taş aletler", matched: false },
        { id: 12, term: "Arkeologlar", definition: "Mungo Gölü'nde kazı yapan, kazma, mala ve kürek kullanarak 4000 yıllık izleri ortaya çıkaran bilim insanları", matched: false }
      ]
    }
  ]);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [words, setWords] = useState<Word[]>([]);

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [gameStats, setGameStats] = useState<GameStats>({ score: 0, attempts: 0, timeElapsed: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);

  // Oyun başladığında tanımları karıştır
  useEffect(() => {
    if (gameStarted && selectedTopic) {
      const definitions = selectedTopic.words.map(w => w.definition);
      setShuffledDefinitions(definitions.sort(() => Math.random() - 0.5));
    }
  }, [gameStarted, selectedTopic]);

  // Zamanlayıcı
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted && selectedTopic) {
      interval = setInterval(() => {
        setGameStats(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, selectedTopic]);

  const selectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setWords(topic.words);
    setGameStats({ score: 0, attempts: 0, timeElapsed: 0 });
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setGameCompleted(false);
  };

  const startGame = () => {
    if (selectedTopic) {
      setGameStarted(true);
      setGameStats({ score: 0, attempts: 0, timeElapsed: 0 });
      setWords(selectedTopic.words.map(w => ({ ...w, matched: false })));
      setSelectedTerm(null);
      setSelectedDefinition(null);
      setGameCompleted(false);
    }
  };

  const restartGame = () => {
    if (selectedTopic) {
      setGameStats({ score: 0, attempts: 0, timeElapsed: 0 });
      setWords(selectedTopic.words.map(w => ({ ...w, matched: false })));
      setSelectedTerm(null);
      setSelectedDefinition(null);
      setGameCompleted(false);
      setShuffledDefinitions([]);
      // Tanımları yeniden karıştır
      setTimeout(() => {
        const definitions = selectedTopic.words.map(w => w.definition);
        setShuffledDefinitions(definitions.sort(() => Math.random() - 0.5));
      }, 100);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setGameStats({ score: 0, attempts: 0, timeElapsed: 0 });
    setShuffledDefinitions([]);
    setSelectedTopic(null);
    setWords([]);
  };

  const handleTermClick = (term: string) => {
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(term);
      if (selectedDefinition) {
        checkMatch(term, selectedDefinition);
      }
    }
  };

  const handleDefinitionClick = (definition: string) => {
    if (selectedDefinition === definition) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(definition);
      if (selectedTerm) {
        checkMatch(selectedTerm, definition);
      }
    }
  };

  const checkMatch = (term: string, definition: string) => {
    const word = words.find(w => w.term === term);
    if (word && word.definition === definition && !word.matched) {
      // Doğru eşleşme
      const newWords = words.map(w => 
        w.term === term ? { ...w, matched: true } : w
      );
      setWords(newWords);
      setGameStats(prev => ({ 
        ...prev, 
        score: prev.score + 10, 
        attempts: prev.attempts + 1 
      }));
      
      // Oyun tamamlandı mı kontrol et
      const matchedCount = newWords.filter(w => w.matched).length;
      if (matchedCount === newWords.length) {
        setGameCompleted(true);
      }
    } else {
      // Yanlış eşleşme - puan azalt ve deneme sayısını artır
      setGameStats(prev => ({ 
        ...prev, 
        score: Math.max(0, prev.score - 5), // Minimum 0 puan
        attempts: prev.attempts + 1 
      }));
    }
    
    setSelectedTerm(null);
    setSelectedDefinition(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    const maxPossibleScore = words.length * 10; // Her kelime için maksimum 10 puan
    const scorePercentage = gameStats.score / maxPossibleScore * 100;
    
    if (scorePercentage >= 90) return "🌟 Mükemmel! Sen gerçek bir arkeoloji uzmanısın!";
    if (scorePercentage >= 70) return "🎯 Harika! Çok iyi bir performans gösterdin!";
    if (scorePercentage >= 50) return "👍 İyi gidiyorsun! Biraz daha pratik yap!";
    if (scorePercentage >= 30) return "💪 Fena değil! Daha dikkatli ol!";
    return "🎯 Denemeye devam et! Her deneme seni daha iyi yapar!";
  };

  return (
    <div className="matching-game-page">
      <div className="game-header">
        <div className="game-title">
          <h1>📚 Atalarımızdan Dersler - Kelime Eşleştirme Oyunu</h1>
          <p>Kitabımızda geçen önemli kelimeleri anlamlarıyla eşleştir!</p>
        </div>
        
        {(gameStarted || gameCompleted) && (
          <div className="game-stats">
            <div className="stat-item">
              <span className="stat-label">⏱️ Süre:</span>
              <span className="stat-value">{formatTime(gameStats.timeElapsed)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">🎯 Puan:</span>
              <span className="stat-value">{gameStats.score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">🔄 Deneme:</span>
              <span className="stat-value">{gameStats.attempts}</span>
            </div>
          </div>
        )}
      </div>

      {!selectedTopic ? (
        <div className="topic-selection">
          <h2>🎯 Hangi Konuyu Keşfetmek İstiyorsun?</h2>
          <div className="topics-grid">
            {topics.map(topic => (
              <div key={topic.id} className="topic-card" onClick={() => selectTopic(topic)}>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="topic-words-count">
                  <span>{topic.words.length} kelime</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : !gameStarted ? (
        <div className="game-start">
          <div className="selected-topic-info">
            <h2>{selectedTopic.title}</h2>
            <p>{selectedTopic.description}</p>
          </div>
          
          <div className="start-content">
            <h3>🎮 Oyun Nasıl Oynanır?</h3>
            <div className="instructions">
              <div className="instruction-item">
                <span className="instruction-icon">1️⃣</span>
                <p>Sol taraftaki kelimelerden birini seç</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">2️⃣</span>
                <p>Sağ taraftaki tanımlardan doğru olanını seç</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">3️⃣</span>
                <p>Doğru eşleşme için +10 puan, yanlış eşleşme için -5 puan!</p>
              </div>
              <div className="instruction-item">
                <span className="instruction-icon">4️⃣</span>
                <p>Tüm kelimeleri eşleştirmeye çalış!</p>
              </div>
            </div>
            <div className="start-actions">
              <button className="start-btn" onClick={startGame}>
                🚀 Oyunu Başlat!
              </button>
              <button className="back-to-topics-btn" onClick={resetGame}>
                ↩️ Konulara Dön
              </button>
            </div>
          </div>
        </div>
      ) : gameCompleted ? (
        <div className="game-completed">
          <div className="completion-content">
            <h2>🎉 Tebrikler! Oyunu Tamamladın!</h2>
            <div className="final-stats">
              <div className="final-stat">
                <span className="final-label">Toplam Süre:</span>
                <span className="final-value">{formatTime(gameStats.timeElapsed)}</span>
              </div>
              <div className="final-stat">
                <span className="final-label">Toplam Puan:</span>
                <span className="final-value">{gameStats.score}</span>
              </div>
              <div className="final-stat">
                <span className="final-label">Toplam Deneme:</span>
                <span className="final-value">{gameStats.attempts}</span>
              </div>
            </div>
            <div className="score-message">
              <p>{getScoreMessage()}</p>
            </div>
            <div className="completion-actions">
              <button className="play-again-btn" onClick={restartGame}>
                🔄 Tekrar Oyna
              </button>
              <button className="back-to-topics-btn" onClick={resetGame}>
                ↩️ Konulara Dön
              </button>
              <a href="/kitaplar/atalarimizdan-dersler" className="back-to-book-btn">
                📚 Kitaba Dön
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="game-area">
          <div className="game-columns">
            <div className="terms-column">
              <h3>📝 Kelimeler</h3>
              <div className="terms-list">
                {words.map(word => (
                  <div
                    key={word.id}
                    className={`term-card ${selectedTerm === word.term ? 'selected' : ''} ${word.matched ? 'matched' : ''}`}
                    onClick={() => !word.matched && handleTermClick(word.term)}
                  >
                    <span className="term-text">{word.term}</span>
                    {word.matched && <span className="match-indicator">✅</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="definitions-column">
              <h3>📖 Tanımlar</h3>
              <div className="definitions-list">
                {shuffledDefinitions.map((definition, index) => {
                  const isMatched = words.some(w => w.definition === definition && w.matched);
                  const isSelected = selectedDefinition === definition;
                  
                  return (
                    <div
                      key={index}
                      className={`definition-card ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
                      onClick={() => !isMatched && handleDefinitionClick(definition)}
                    >
                      <span className="definition-text">{definition}</span>
                      {isMatched && <span className="match-indicator">✅</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="game-controls">
            <button className="reset-btn" onClick={resetGame}>
              🔄 Oyunu Sıfırla
            </button>
            <button className="back-to-topics-btn" onClick={() => setSelectedTopic(null)}>
              ↩️ Konulara Dön
            </button>
            <a href="/kitaplar/atalarimizdan-dersler" className="back-btn">
              📚 Kitaba Dön
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EslestirmePage() {
  return (
    <AuthGuard requiredBookId="atalarimizdan-dersler" gameId="atalarimizdan-dersler-eslestirme">
      <EslestirmeOyunu />
    </AuthGuard>
  );
}
