'use client';

const WA_URL =
  'https://wa.me/5585988839020?text=Ol%C3%A1%20gostaria%20de%20revender%20Kyrefh%2C%20vim%20pela%20amoatacado%2F2';

export default function KyrefhV2ObrigadoPage() {

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#050505',
        color: '#f5efe6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-manrope), sans-serif',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(26,39,71,0.45) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
        {/* Check icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '2px solid rgba(245,239,230,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: 32,
          }}
        >
          ✓
        </div>

        <p
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,239,230,0.4)',
            marginBottom: 16,
          }}
        >
          Cadastro recebido
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(64px, 10vw, 96px)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            color: '#f5efe6',
            margin: '0 0 24px',
          }}
        >
          Obrigado!
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 17,
            lineHeight: 1.65,
            color: 'rgba(245,239,230,0.65)',
            margin: '0 0 40px',
          }}
        >
          Recebemos seus dados. Em até 1 minuto nossa equipe vai entrar em
          contato pelo WhatsApp com a tabela e as fotos da coleção.
        </p>

        <a
          href={WA_URL}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 32px',
            background: '#f5efe6',
            color: '#0a0a0a',
            fontFamily: 'var(--font-manrope), sans-serif',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 4,
            marginBottom: 20,
          }}
        >
          Ir para o WhatsApp
        </a>

      </div>
    </main>
  );
}
