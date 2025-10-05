"use client";
import AuthGuard from "../../utils/authGuard";

function TestDemoOyunu() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Demo Oyunu</h1>
      <p>Bu bir test oyunudur. Demo sistemi çalışıyor mu kontrol ediyoruz.</p>
    </div>
  );
}

export default function TestDemoPage() {
  return (
    <AuthGuard requiredBookId="test-kitap">
      <TestDemoOyunu />
    </AuthGuard>
  );
}
