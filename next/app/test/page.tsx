export default function TestPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Test Sayfası</h1>
      <p>Bu sayfa çalışıyorsa, Next.js düzgün çalışıyor demektir.</p>
      <div style={{ 
        width: '100px', 
        height: '100px', 
        backgroundColor: 'red',
        margin: '20px 0'
      }}>
        Kırmızı Kutu
      </div>
    </div>
  );
}
