'use client';

const PHONE = '5585988839020';
const MESSAGE = 'Olá! Me cadastrei no site e quero receber o catálogo com os preços de atacado da Kyrefh Jeans.';
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

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
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(26,39,71,0.45) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>

        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(37,211,102,0.12)',
            border: '1.5px solid rgba(37,211,102,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            fontSize: 28,
            color: '#25D366',
          }}
        >
          ✓
        </div>

        <p
          style={{
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,239,230,0.4)',
            marginBottom: 12,
          }}
        >
          Cadastro recebido
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(56px, 10vw, 80px)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            color: '#f5efe6',
            margin: '0 0 20px',
          }}
        >
          Último passo!
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: 'rgba(245,239,230,0.65)',
            margin: '0 0 32px',
          }}
        >
          Envie uma mensagem para nós no WhatsApp e receba{' '}
          <strong style={{ color: '#f5efe6' }}>agora mesmo</strong> o catálogo
          completo com modelos e preços de atacado.
        </p>

        <div
          style={{
            background: 'rgba(245,239,230,0.05)',
            border: '1px solid rgba(245,239,230,0.1)',
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 28,
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,239,230,0.3)',
              marginBottom: 10,
            }}
          >
            Mensagem que será enviada
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: 'rgba(245,239,230,0.75)',
              fontStyle: 'italic',
            }}
          >
            &ldquo;{MESSAGE}&rdquo;
          </p>
        </div>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '18px 32px',
            background: '#25D366',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 8,
            marginBottom: 16,
            boxShadow: '0 4px 24px rgba(37,211,102,0.25)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar mensagem e receber catálogo
        </a>

        <p
          style={{
            fontSize: 12,
            color: 'rgba(245,239,230,0.3)',
            lineHeight: 1.5,
          }}
        >
          A mensagem já vem preenchida — só clique em{' '}
          <strong style={{ color: 'rgba(245,239,230,0.45)' }}>Enviar</strong> no WhatsApp.
        </p>

      </div>
    </main>
  );
}
