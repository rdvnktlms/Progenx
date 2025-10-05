"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page(){
  const [favorites, setFavorites] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('Tümü');

  // localStorage'dan favorileri ve istek listesini yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      const savedWishlist = localStorage.getItem('wishlist');
      
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    }
  }, []);

  const books = [
    {
      id: 1,
      title: "Oyunlarla Satranç",
      author: "Ozan ÇAPAN",
      cover: "/img/oyunlarla-satranc-4228-9.webp",
      originalPrice: "₺450,00",
      currentPrice: "₺360,00",
      discount: "20%",
      link: "/kitaplar/oyunlarla-satranc",
      buyLink: "https://www.odtuyayincilik.com.tr/oyunlarla-satranc-233",
      category: "Satranç",
      ageGroup: "7-12 Yaş",
      comingSoon: false
    },
    {
      id: 2,
      title: "Hava Olayları",
      author: "Elisabeth de LAMBILLY",
      cover: "/img/hava-4a9c-b724-.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/hava-olaylari",
      buyLink: "https://www.odtuyayincilik.com.tr/hava-307",
      category: "Bilim",
      ageGroup: "7-12 Yaş",
      comingSoon: false
    },
    {
      id: 3,
      title: "Benim Küçük Deneylerim",
      author: "Melanie PEREZ",
      cover: "/img/benim-kucuk-deneylerim-mekanik...-5-4bcd.jpg",
      originalPrice: "₺195,00",
      currentPrice: "₺156,00",
      discount: "20%",
      link: "/kitaplar/benim-kucuk-deneylerim",
      buyLink: "https://www.odtuyayincilik.com.tr/benim-kucuk-deneylerim-mekanik...-317",
      category: "Bilim",
      ageGroup: "7-12 Yaş",
      comingSoon: false
    },
    {
      id: 4,
      title: "Atalarımızdan Dersler",
      author: "Raksha Dave",
      cover: "/img/atalarımızdan dersler.jpg",
      originalPrice: "₺350,00",
      currentPrice: "₺280,00",
      discount: "20%",
      link: "/kitaplar/atalarimizdan-dersler",
      buyLink: "https://www.odtuyayincilik.com.tr/atalarimizdan-dersler",
      category: "Tarih",
      ageGroup: "7-12 Yaş",
      comingSoon: false
    },
    {
      id: 5,
      title: "13 Yaşına Gelmeden Tatilde Yaşanacak 50 Macera İçin Kılavuz",
      author: "P.D. BACCALARIO",
      cover: "/img/tatil kitabı.jpg",
      originalPrice: "₺400,00",
      currentPrice: "₺320,00",
      discount: "20%",
      link: "/kitaplar/tatilde-50-macera",
      buyLink: "https://www.odtuyayincilik.com.tr/13-yasina-gelmeden-tatilde-yasanacak-50-macera-icin-kilavuz",
      category: "Macera",
      ageGroup: "7-12 Yaş",
      comingSoon: false
    },
  ];


  const toggleFavorite = (bookId: number) => {
    const newFavorites = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];
    
    setFavorites(newFavorites);
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const toggleWishlist = (bookId: number) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter(id => id !== bookId)
      : [...wishlist, bookId];
    
    setWishlist(newWishlist);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
  };

  // Kategorileri ve yaş gruplarını al
  const categories = ['Tümü', ...Array.from(new Set(books.map(book => book.category)))];
  const ageGroups = ['Tümü', ...Array.from(new Set(books.map(book => book.ageGroup)))];

  // Filtrelenmiş kitapları al
  const filteredBooks = books.filter(book => {
    const categoryMatch = selectedCategory === 'Tümü' || book.category === selectedCategory;
    const ageGroupMatch = selectedAgeGroup === 'Tümü' || book.ageGroup === selectedAgeGroup;
    return categoryMatch && ageGroupMatch;
  });

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgb(205, 23, 25) 0%, rgb(180, 20, 22) 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        margin: '20px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            margin: '0 0 20px 0',
            background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            İnteraktif Çocuk Kitapları
          </h1>
          <p style={{
            fontSize: '1.3rem',
            margin: '0 0 30px 0',
            opacity: 0.9,
            fontWeight: '300'
          }}>
            Eğlenceli oyunlar ve deneylerle öğrenmeyi keşfedin!
          </p>
        </div>
      </section>
      
      {/* Books Section */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 15px 0'
          }}>
            Popüler Kitaplar
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6b7280',
            margin: '0'
          }}>
            Çocuklarınız için özenle seçilmiş eğitici kitaplar
          </p>
        </div>

        {/* Filtreleme Arayüzü */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151'
              }}>Kategori:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '10px 15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white',
                  cursor: 'pointer',
                  minWidth: '150px'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <label style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#374151'
              }}>Yaş Grubu:</label>
              <select 
                value={selectedAgeGroup} 
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                style={{
                  padding: '10px 15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white',
                  cursor: 'pointer',
                  minWidth: '150px'
                }}
              >
                {ageGroups.map(ageGroup => (
                  <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{
            background: '#f3f4f6',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {filteredBooks.length} kitap bulundu
          </div>
        </div>
        
        {/* Books Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {filteredBooks.map(book => (
            <div key={book.id} style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            }}
            >
              <div style={{
                position: 'relative',
                height: '280px',
                overflow: 'hidden'
              }}>
                <img 
                  src={book.cover} 
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '20px'
                  }}
                />
                {book.comingSoon ? (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    Yakında
                  </div>
                ) : (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {book.discount}
                  </div>
                )}
                
                {/* Action Buttons Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                className="book-actions-overlay"
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
                >
                  <button 
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => toggleFavorite(book.id)}
                    title={favorites.includes(book.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                  >
                    {favorites.includes(book.id) ? '❤️' : '🤍'}
                  </button>
                  <button 
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => toggleWishlist(book.id)}
                    title={wishlist.includes(book.id) ? 'İstek listesinden çıkar' : 'İstek listesine ekle'}
                  >
                    {wishlist.includes(book.id) ? '💝' : '💌'}
                  </button>
                </div>
              </div>
              
              <div style={{
                padding: '25px'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 8px 0',
                  lineHeight: '1.4',
                  minHeight: '2.8rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {book.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: '0 0 15px 0',
                  fontWeight: '500'
                }}>
                  {book.author}
                </p>
                
                {/* Kategori ve Yaş Grubu */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '15px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {book.category}
                  </span>
                  <span style={{
                    background: '#f3e8ff',
                    color: '#7c3aed',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {book.ageGroup}
                  </span>
        </div>

                {!book.comingSoon && (
                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#059669'
                      }}>
                        {book.currentPrice}
                      </span>
                      <span style={{
                        fontSize: '1rem',
                        color: '#9ca3af',
                        textDecoration: 'line-through'
                      }}>
                        {book.originalPrice}
                      </span>
          </div>
        </div>
                )}
                
                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button 
                    style={{
                      flex: 1,
                      background: book.comingSoon ? '#f3f4f6' : 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
                      color: book.comingSoon ? '#9ca3af' : 'white',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: book.comingSoon ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    disabled={book.comingSoon}
                    onClick={() => {
                      if (!book.comingSoon && book.buyLink) {
                        window.open(book.buyLink, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {book.comingSoon ? 'Yakında' : 'Satın Al'}
                  </button>
                  <Link 
                    href={book.link} 
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#667eea',
                      border: '2px solid #667eea',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#667eea';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#667eea';
                    }}
                  >
                    Kitabı İncele
                  </Link>
                </div>
        </div>
          </div>
          ))}
        </div>
      </section>

      {/* Test Demo Butonu */}
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>🧪 Test Demo Sistemi</h2>
        <p>Demo sistemini test etmek için aşağıdaki butona tıklayın:</p>
        <a 
          href="/oyunlar/test-demo" 
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgb(205, 23, 25), rgb(180, 20, 22))',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            marginTop: '10px'
          }}
        >
          Test Demo Oyunu
        </a>
      </section>
    </>
  );
}