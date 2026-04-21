import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrushStroke, PaintBlob, PaintSplatter } from '../ui/PaintSplash';

function ClapperBoard({ isOpen, size = 100 }: { isOpen: boolean; size?: number }) {
  return (
    <div style={{ width: size, height: size * 1.1, position: 'relative', display: 'inline-block' }}>
      <svg viewBox="0 0 110 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          {/* Corps — dégradé violet 3D */}
          <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9588C0" />
            <stop offset="50%" stopColor="#7E72AB" />
            <stop offset="100%" stopColor="#6B62A0" />
          </linearGradient>
          {/* Côté gauche 3D */}
          <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3E3562" />
            <stop offset="100%" stopColor="#564B80" />
          </linearGradient>
          {/* Barre charnière */}
          <linearGradient id="hinge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B5E96" />
            <stop offset="100%" stopColor="#554880" />
          </linearGradient>
          {/* Bras — fond */}
          <linearGradient id="arm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A7DB5" />
            <stop offset="100%" stopColor="#7A6EA5" />
          </linearGradient>
          {/* Bandes foncées */}
          <linearGradient id="dk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B5E96" />
            <stop offset="100%" stopColor="#584B82" />
          </linearGradient>
          {/* Bandes claires */}
          <linearGradient id="lt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C0B6DE" />
            <stop offset="100%" stopColor="#AEA3D0" />
          </linearGradient>
        </defs>

        {/* ====== CORPS (partie basse fixe) ====== */}

        {/* Côté gauche — donne le volume 3D */}
        <path d="M10,50 L10,108 Q10,114 16,114 L16,50 Z" fill="url(#side)" />

        {/* Rectangle principal — propre, arrondi, lisse */}
        <rect x="14" y="50" width="86" height="64" rx="8" fill="url(#body)" />

        {/* Reflet glossy subtil — bande claire en haut du corps */}
        <rect x="14" y="50" width="86" height="24" rx="8" fill="rgba(255,255,255,0.1)" />

        {/* Bas du côté gauche arrondi */}
        <path d="M10,108 Q10,114 16,114 L14,114 Q10,114 10,108 Z" fill="url(#side)" />

        {/* Barre charnière épaisse — entre le corps et le bras */}
        <rect x="8" y="42" width="94" height="12" rx="4" fill="url(#hinge)" />
        {/* Petit reflet sur la charnière */}
        <rect x="16" y="44" width="60" height="2.5" rx="1.5" fill="rgba(255,255,255,0.12)" />
      </svg>

      {/* ====== BRAS (partie rayée animée) ====== */}
      <motion.div
        style={{
          position: 'absolute',
          top: '6%',
          left: '7%',
          width: '86%',
          transformOrigin: '0% 100%',
        }}
        animate={{ rotate: isOpen ? -45 : -12 }}
        transition={
          isOpen
            ? { type: 'spring', stiffness: 160, damping: 10 }
            : { type: 'spring', stiffness: 500, damping: 20, delay: 0.45 }
        }
      >
        <svg viewBox="0 0 94 24" style={{ width: '100%', display: 'block', overflow: 'visible' }}>
          <defs>
            <clipPath id="ac"><rect x="0" y="0" width="94" height="24" rx="6" /></clipPath>
          </defs>
          {/* Fond du bras */}
          <rect x="0" y="0" width="94" height="24" rx="6" fill="url(#arm)" />
          {/* Bandes diagonales larges */}
          <g clipPath="url(#ac)">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <polygon key={i}
                points={`${i * 14 - 6},0 ${i * 14 + 5},0 ${i * 14 - 4},24 ${i * 14 - 15},24`}
                fill={i % 2 === 0 ? 'url(#dk)' : 'url(#lt)'}
              />
            ))}
          </g>
          {/* Reflet glossy */}
          <rect x="0" y="0" width="94" height="9" rx="6" fill="rgba(255,255,255,0.12)" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function LoginPage({ onGoogleLogin, loading }: { onGoogleLogin: () => void; loading?: boolean }) {
  const [clapOpen, setClapOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    if (animating || loading) return;
    setAnimating(true);
    setClapOpen(true);
    setTimeout(() => setClapOpen(false), 550);
    setTimeout(() => onGoogleLogin(), 1050);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '20px',
    }}>
      <PaintBlob color="var(--accent-red)" size={350} opacity={0.04} style={{ top: -100, right: -100 }} />
      <PaintBlob color="var(--accent-gold)" size={280} opacity={0.05} style={{ bottom: -80, left: -80 }} />
      <PaintSplatter color="var(--accent-red)" size={100} opacity={0.08} style={{ top: '20%', left: '10%' }} />
      <PaintSplatter color="var(--accent-gold)" size={70} opacity={0.1} style={{ bottom: '25%', right: '15%' }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ marginBottom: '20px' }}>
          <ClapperBoard isOpen={clapOpen} size={100} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700,
          color: 'var(--text-primary)', margin: '0 0 4px 0',
        }}>
          DVD <span style={{ color: 'var(--accent-red)' }}>Shelf</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-display)', fontSize: '14px', fontStyle: 'italic',
          color: 'var(--accent-gold)', margin: '0 0 24px 0',
        }}>
          Ta collection de films & séries
        </p>

        <div style={{ width: '100px', margin: '0 auto 32px auto' }}>
          <BrushStroke color="var(--accent-red)" opacity={0.4} />
        </div>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '15px',
          color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 32px 0',
        }}>
          Organise ta collection DVD, note tes films préférés, et partage tes listes avec tes amis.
        </p>

        <motion.button
          onClick={handleClick}
          disabled={animating || loading}
          className="cursor-pointer brush-shape-2"
          animate={animating ? { scale: [1, 0.97, 1] } : {}}
          transition={{ duration: 0.3, delay: 0.85 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600,
            padding: '14px 32px', border: 'none',
            background: 'var(--text-primary)', color: '#fff',
            cursor: (animating || loading) ? 'wait' : 'pointer',
            opacity: (animating || loading) ? 0.8 : 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            transition: 'opacity 200ms',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {animating ? 'Action !' : loading ? 'Connexion...' : 'Se connecter avec Google'}
        </motion.button>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '11px',
          color: 'var(--text-light)', marginTop: '24px', lineHeight: 1.5,
        }}>
          Connexion sécurisée via Google.
          <br />Aucune donnée personnelle n'est revendue ni partagée.
        </p>
      </div>
    </div>
  );
}
