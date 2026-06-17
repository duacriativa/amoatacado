'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ContaDesativadaPage() {
  const [segundos, setSegundos] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSegundos((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href = '/';
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Página desativada</h1>
        <p className="text-gray-600 mb-6">
          Esta página não está mais disponível. Você será redirecionado para a Amo Atacado em {segundos}s.
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Ir para a home agora
        </Link>
      </div>
    </main>
  );
}
