import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { DVDItem } from '../../types';
import { useShelfHover } from '../Shelf/ShelfRow';

const COVER_W = 140, COVER_H = 200, DEPTH = 30;

function darken(hex: string, a: number) { const n = parseInt(hex.replace('#', ''), 16); if (isNaN(n)) return '#222'; return `rgb(${Math.max(0, (n >> 16) - a)},${Math.max(0, ((n >> 8) & 0xff) - a)},${Math.max(0, (n & 0xff) - a)})`; }
function lighten(hex: string, a: number) { const n = parseInt(hex.replace('#', ''), 16); if (isNaN(n)) return '#888'; return `rgb(${Math.min(255, (n >> 16) + a)},${Math.min(255, ((n >> 8) & 0xff) + a)},${Math.min(255, (n & 0xff) + a)})`; }

export default function DVDCase({ item, index, onClick }: { item: DVDItem; index: number; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const { setDvdHovered, touchHoveredId } = useShelfHover();
  const c = item.spineColor || '#c41e3a';
  const isTouchRef = useRef(false);

  // Le DVD est "hovered" soit par la souris (desktop), soit par le touch swipe (mobile)
  const isTouchHovered = touchHoveredId === item.id;
  const isOpen = hovered || isTouchHovered;

  const handleHoverStart = () => { setHovered(true); setDvdHovered(true); };
  const handleHoverEnd = () => { setHovered(false); setDvdHovered(false); };

  const handleClick = () => {
    const isTouch = isTouchRef.current || window.matchMedia('(hover: none)').matches;
    if (isTouch) {
      // Mobile tap : ouverture brève puis modal
      handleHoverStart();
      setTimeout(() => { onClick?.(); handleHoverEnd(); }, 400);
    }
  };

  return (
    <motion.div className="relative" data-dvd-id={item.id}
      style={{ width: isOpen ? `${COVER_W + 20}px` : `${DEPTH}px`, height: `${COVER_H}px`, transition: 'width 600ms cubic-bezier(0.22,1,0.36,1)', zIndex: isOpen ? 50 : 1, cursor: 'pointer', perspective: '1000px' }}
      onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd}
      onTouchStart={() => { isTouchRef.current = true; }}
      onClick={handleClick}
      layout initial={{ opacity: 0, y: -60, scale: 0.8, rotateZ: -5 }} animate={{ opacity: 1, y: 0, scale: 1, rotateZ: 0 }} exit={{ opacity: 0, y: -40, scale: 0.7, rotateZ: 5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: Math.min(index * 0.03, 0.4) }}>
      <motion.div style={{ width: `${COVER_W}px`, height: `${COVER_H}px`, position: 'absolute', bottom: 0, left: 0, transformStyle: 'preserve-3d', transformOrigin: `${DEPTH / 2}px center` }}
        animate={{ rotateY: isOpen ? 20 : 90, translateZ: isOpen ? 120 : 0, y: isOpen ? -10 : 0 }}
        transition={{ type: 'tween', duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>

        {/* Face avant */}
        <div onClick={isOpen ? onClick : undefined} style={{ position: 'absolute', width: `${COVER_W}px`, height: `${COVER_H}px`, transform: `translateZ(${DEPTH / 2}px)`, backfaceVisibility: 'hidden', borderRadius: 2, overflow: 'hidden', boxShadow: isOpen ? '0 15px 50px rgba(0,0,0,0.7),0 0 20px rgba(196,30,58,0.08)' : '0 2px 8px rgba(0,0,0,0.3)', transition: 'box-shadow 500ms' }}>
          {item.posterUrl ? <img src={item.posterUrl} alt={item.title} loading="lazy" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> :
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(180deg,${c}55,#faf8f4)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div style={{ fontSize: 32, opacity: 0.5 }}>🎬</div><span style={{ fontFamily: 'var(--font-display)', fontSize: 6, textAlign: 'center', padding: '0 8px', lineHeight: 1.8 }}>{item.title.toUpperCase()}</span>
            </div>}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 2, background: 'linear-gradient(140deg,rgba(255,255,255,0.15) 0%,transparent 40%,transparent 60%,rgba(0,0,0,0.2) 100%)' }} />
          {item.watched && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 6, pointerEvents: 'none', background: 'linear-gradient(transparent,rgba(0,0,0,0.85))', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 5, color: 'var(--color-success)', letterSpacing: 1 }}>✓ VU</span>
              {item.rating && <span style={{ fontSize: 9, color: 'var(--accent-gold)' }}>{'★'.repeat(item.rating)}<span style={{ opacity: 0.3 }}>{'★'.repeat(5 - item.rating)}</span></span>}
            </div>
          )}
        </div>

        {/* Tranche */}
        <div style={{ position: 'absolute', width: `${DEPTH}px`, height: `${COVER_H}px`, transform: 'rotateY(-90deg)', transformOrigin: 'left center', backfaceVisibility: 'hidden', background: `linear-gradient(90deg,${darken(c, 35)},${c} 30%,${lighten(c, 15)} 50%,${c} 70%,${darken(c, 35)})`, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid rgba(0,0,0,0.5)', borderLeft: '1px solid rgba(0,0,0,0.3)' }}>
          <div style={{ width: '100%', height: 20, flexShrink: 0, background: `linear-gradient(180deg,${darken(c, 50)},${darken(c, 30)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 5, fontWeight: 700, color: lighten(c, 40), letterSpacing: 2, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>DVD</span>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${lighten(c, 40)}33,transparent)` }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.15),rgba(0,0,0,0.05))' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: item.title.length > 25 ? 4 : item.title.length > 18 ? 4.5 : 5.5, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', transform: 'rotate(-90deg)', textShadow: '0 1px 3px rgba(0,0,0,0.9),0 0 6px rgba(0,0,0,0.5),0 0 1px rgba(0,0,0,1)', letterSpacing: item.title.length > 25 ? 0.8 : 1.5, textTransform: 'uppercase' }}>{item.title}</span>
          </div>
          <div style={{ width: '100%', height: 20, flexShrink: 0, background: `linear-gradient(180deg,${darken(c, 30)},${darken(c, 50)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 4.5, fontWeight: 700, color: lighten(c, 40), letterSpacing: 1, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{item.mediaType === 'movie' ? 'FILM' : 'SÉRIE'}</span>
          </div>
        </div>

        <div style={{ position: 'absolute', width: `${COVER_W}px`, height: `${COVER_H}px`, transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)`, backfaceVisibility: 'hidden', background: `linear-gradient(180deg,${c}22,#faf8f4)`, borderRadius: 2 }} />
        <div style={{ position: 'absolute', width: `${COVER_W}px`, height: `${DEPTH}px`, transform: 'rotateX(90deg)', transformOrigin: 'top center', backfaceVisibility: 'hidden', background: `linear-gradient(90deg,${c}55,${c}33)` }} />
        <div style={{ position: 'absolute', width: `${COVER_W}px`, height: `${DEPTH}px`, bottom: 0, transform: 'rotateX(-90deg)', transformOrigin: 'bottom center', backfaceVisibility: 'hidden', background: `linear-gradient(90deg,${c}33,${c}11)` }} />
        <div style={{ position: 'absolute', width: `${DEPTH}px`, height: `${COVER_H}px`, right: 0, transform: 'rotateY(90deg)', transformOrigin: 'right center', backfaceVisibility: 'hidden', background: `linear-gradient(180deg,${c}33,${c}11)`, boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.3)' }} />
      </motion.div>

      <div style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)', width: isOpen ? 100 : 18, height: 6, background: 'radial-gradient(ellipse,rgba(0,0,0,0.5) 0%,transparent 70%)', transition: 'all 600ms cubic-bezier(0.22,1,0.36,1)', opacity: isOpen ? 0.7 : 0.2, filter: isOpen ? 'blur(4px)' : 'blur(1px)', pointerEvents: 'none' }} />
    </motion.div>
  );
}
