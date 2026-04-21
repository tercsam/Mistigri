import { useState, useEffect, useRef } from 'react';
import type { DVDItem } from '../../types';

interface Props { name: string; previews: DVDItem[]; totalCount: number; onClick: () => void; isOwner?: boolean; onDelete?: () => void; }

/** Hook compteur animé : part de 0, incrémente jusqu'à target en duration ms */
function useAnimatedCount(target: number, duration = 500) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current || target === 0) { setCount(target); return; }
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

export default function CollectionCard({ name, previews, totalCount, onClick, isOwner = true, onDelete }: Props) {
  const posters = previews.filter((p) => p.posterUrl).slice(0, 4);
  const count = totalCount;
  const animCount = useAnimatedCount(count, 600);

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={onClick} className="cursor-pointer"
        style={{
          width: '100%', aspectRatio: '1', position: 'relative',
          background: 'var(--bg-warm)', border: 'none', cursor: 'pointer', padding: 0,
          overflow: 'hidden',
          borderRadius: '40% 60% 50% 50% / 40% 50% 60% 50%',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'all 250ms ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
      >
        {posters.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: posters.length === 1 ? '1fr' : '1fr 1fr',
            gridTemplateRows: posters.length <= 2 ? '1fr' : '1fr 1fr',
            width: '100%', height: '100%', gap: 0,
          }}>
            {posters.map((p, i) => (
              <img key={i} src={p.posterUrl} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ))}
            {posters.length === 3 && <div style={{ background: 'var(--bg-warm)' }} />}
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 40, opacity: 0.15 }}>🎬</span>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.2) 100%)', pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute', bottom: 10, right: 14,
          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
          color: '#fff', background: 'rgba(0,0,0,0.5)',
          padding: '2px 8px', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          backdropFilter: 'blur(4px)',
        }}>
          {animCount}
        </div>
      </button>

      <div style={{ padding: '10px 4px 0' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{count} titre{count > 1 ? 's' : ''}</span>
          {!isOwner && <span className="brush-shape-1" style={{ fontSize: 10, color: 'var(--accent-gold)', background: 'var(--accent-gold-light)', padding: '1px 8px' }}>Partagé</span>}
        </div>
        {isOwner && onDelete && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="cursor-pointer"
            style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 6, opacity: 0.4, transition: 'opacity 200ms', padding: '2px 8px' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4'; }}>
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}
