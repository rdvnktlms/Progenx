"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function CikisPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/');
  }, [logout, router]);

  return (
    <>
      <section className="hero">
        <h2>🚪 Çıkış Yapılıyor...</h2>
        <p>Güvenli bir şekilde çıkış yapılıyor</p>
      </section>
    </>
  );
}
