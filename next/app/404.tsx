"use client";
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <style jsx>{`
        /*======================
            404 page
        =======================*/
        
        .page_404{ 
          padding: 60px 0; 
          background: linear-gradient(135deg, #667eea, #764ba2); 
          font-family: 'Arvo', serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page_404 img{ 
          width: 100%;
        }

        .four_zero_four_bg{
          background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
          height: 600px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
         
        .four_zero_four_bg h1{
          font-size: 200px;
          color: white;
          text-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
          margin: 0;
          font-weight: bold;
        }
         
        .four_zero_four_bg h3{
          font-size: 200px;
          color: white;
          text-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
          margin: 0;
          font-weight: bold;
        }
         
        .link_404{			 
          color: #fff!important;
          padding: 20px 40px;
          background: #39ac31;
          margin: 30px 0;
          display: inline-block;
          text-decoration: none;
          border-radius: 15px;
          font-size: 1.3rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .link_404:hover {
          background: #2d8a25;
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
        }
        
        .contant_box_404{ 
          margin-top: -80px;
          text-align: center;
          color: white;
        }
        
        .contant_box_404 h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .contant_box_404 p {
          font-size: 1.5rem;
          margin-bottom: 30px;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-40px);
          }
          60% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
      <div className="page_404">
        <div className="four_zero_four_bg">
          <h1>404</h1>
        </div>
        
        <div className="contant_box_404">
          <h2>Sayfa Bulunamadı!</h2>
          <p>Aradığınız sayfa mevcut değil veya erişim yetkiniz bulunmuyor.</p>
          
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/" className="link_404">
              🏠 Ana Sayfaya Dön
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="link_404"
              style={{
                background: 'transparent',
                border: '2px solid #39ac31',
                cursor: 'pointer'
              }}
            >
              ← Geri Dön
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
