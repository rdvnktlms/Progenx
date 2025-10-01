export default function Book(){
  return (
    <>
      <div className="hero"><h2>Oyunlarla Satranç</h2><p>Koyunlar ve Kurt, Hırsız ve Polis ile eğitici mini oyunlar.</p></div>
      <div className="card-grid">
        <article className="card">
          <h3>🐑🐺 Kurt vs Koyunlar</h3>
          <p>1 Kurt vs 8 Koyun – Koyunlar en üste ulaşmaya çalışırken kurdu yakalamaya çalışın!</p>
          <a className="cta" href="/oyunlar/kurt-vs-koyunlar">Oyna</a>
        </article>
        <article className="card">
          <h3>👮🏃 Hırsız & Polis</h3>
          <p>Polis olarak hırsızları yakalayın veya hırsız olarak kaçmaya çalışın!</p>
          <a className="cta" href="/oyunlar/hirsiz-polis">Oyna</a>
        </article>
      </div>
    </>
  );
}


