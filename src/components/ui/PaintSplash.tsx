import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function BrushStroke({ color = 'var(--accent-red)', width = '100%', opacity = 0.5 }: { color?: string; width?: string; opacity?: number }) {
  return (<svg viewBox="0 0 400 12" style={{ width, height: 'auto', display: 'block', opacity }} preserveAspectRatio="none"><path d="M0 8 C30 2,60 10,100 6 C140 2,180 9,220 5 C260 1,300 8,340 4 C360 2,380 7,400 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/></svg>);
}

// 8 formes de blobs très différentes — organiques, étirées, irrégulières
const BLOB_PATHS = [
  // Blob rond classique
  'M44.5,-62.3C57.3,-53.8,67.1,-40.5,72.5,-25.6C77.9,-10.7,78.8,5.8,73.8,20.1C68.8,34.4,57.8,46.6,44.6,55.1C31.3,63.6,15.7,68.4,-0.8,69.5C-17.3,70.7,-34.5,68.2,-47.2,59.2C-59.9,50.2,-68,34.7,-72.2,18.1C-76.3,1.5,-76.4,-16.2,-69.4,-30.4C-62.4,-44.6,-48.3,-55.3,-34,-63.1C-19.6,-70.9,-4.9,-75.8,6.6,-84.3C18.1,-92.8,31.8,-70.8,44.5,-62.3Z',
  // Blob étiré horizontalement
  'M62,-42C72,-28,66,-5,56,14C46,33,32,49,14,55C-4,61,-26,57,-42,45C-58,33,-68,13,-66,-7C-64,-27,-50,-47,-34,-55C-18,-63,0,-60,16,-54C32,-48,52,-56,62,-42Z',
  // Blob étiré verticalement
  'M28,-75C38,-58,48,-42,48,-24C48,-6,38,14,24,38C10,62,-8,90,-26,88C-44,86,-62,54,-66,28C-70,2,-60,-18,-48,-36C-36,-54,-22,-70,-4,-72C14,-74,18,-92,28,-75Z',
  // Blob très irrégulier
  'M52,-48C60,-30,54,-4,42,18C30,40,12,58,-10,62C-32,66,-58,56,-68,36C-78,16,-72,-14,-58,-34C-44,-54,-22,-64,0,-62C22,-60,44,-66,52,-48Z',
  // Blob en étoile douce
  'M30,-52C42,-40,56,-30,60,-16C64,-2,58,16,46,30C34,44,16,54,-4,58C-24,62,-46,60,-58,48C-70,36,-72,14,-66,-6C-60,-26,-46,-44,-30,-54C-14,-64,4,-66,18,-62C32,-58,18,-64,30,-52Z',
  // Blob allongé courbe
  'M70,-30C78,-10,68,16,50,34C32,52,6,62,-18,60C-42,58,-64,44,-72,24C-80,4,-74,-22,-58,-38C-42,-54,-16,-60,8,-58C32,-56,62,-50,70,-30Z',
  // Petit blob compact
  'M38,-55C48,-42,54,-26,52,-10C50,6,40,22,26,34C12,46,-6,54,-22,52C-38,50,-52,38,-58,22C-64,6,-62,-14,-52,-30C-42,-46,-24,-58,-4,-60C16,-62,28,-68,38,-55Z',
  // Blob très étiré en longueur
  'M80,-20C86,-2,74,20,56,32C38,44,14,46,-8,44C-30,42,-50,36,-62,22C-74,8,-78,-14,-68,-28C-58,-42,-34,-48,-12,-50C10,-52,74,-38,80,-20Z',
];

function seeded(s: number) { return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }

export function PaintBlob({ color = 'var(--accent-red)', size = 200, opacity = 0.06, style = {}, duration = 10 }: { color?: string; size?: number; opacity?: number; style?: React.CSSProperties; duration?: number }) {
  return (
    <motion.svg viewBox="0 0 200 200"
      style={{ width: `${size}px`, height: `${size}px`, position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ scale: [0.85, 1.15, 0.9, 1.1, 0.85], opacity: [opacity * 0.7, opacity, opacity * 0.8, opacity * 1.1, opacity * 0.7], x: [0, 12, -8, 10, 0], y: [0, -10, 6, -5, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity }}>
      <path d={BLOB_PATHS[0]} transform="translate(100 100)" fill={color} />
    </motion.svg>
  );
}

export function PaintSplatter({ color = 'var(--accent-gold)', size = 60, opacity = 0.15, style = {}, duration = 12 }: { color?: string; size?: number; opacity?: number; style?: React.CSSProperties; duration?: number }) {
  return (
    <motion.svg viewBox="0 0 100 100"
      style={{ width: `${size}px`, height: `${size}px`, position: 'absolute', pointerEvents: 'none', ...style }}
      animate={{ scale: [0.9, 1.2, 0.85, 1.15, 0.9], opacity: [opacity * 0.7, opacity, opacity * 0.5, opacity * 0.9, opacity * 0.7], rotate: [0, 8, -5, 6, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity }}>
      <circle cx="50" cy="50" r="20" fill={color} />
      <circle cx="30" cy="35" r="6" fill={color} /><circle cx="72" cy="40" r="8" fill={color} />
      <ellipse cx="50" cy="50" rx="28" ry="22" fill={color} opacity="0.4" />
    </motion.svg>
  );
}

/**
 * BlobField — 24 blobs animés, formes très variées, no-overlap, distribution périphérie
 */
export function BlobField() {
  const blobs = useMemo(() => {
    const colors = ['var(--accent-red)', 'var(--accent-gold)', '#7B6FA8', '#5DA36F', '#D4896A', '#c41e3a', '#b8860b'];
    const rand = seeded(73);
    const placed: { x: number; y: number; r: number }[] = [];

    const items: { x: number; y: number; size: number; color: string; duration: number; delay: number; path: string; opacity: number; rotate: number }[] = [];

    // Zones de placement — forcer la périphérie et les coins
    // 0-25% et 75-100% en x/y = périphérie
    const zones = [
      // Coins
      { xMin: 0, xMax: 20, yMin: 0, yMax: 20 },
      { xMin: 80, xMax: 100, yMin: 0, yMax: 20 },
      { xMin: 0, xMax: 20, yMin: 80, yMax: 100 },
      { xMin: 80, xMax: 100, yMin: 80, yMax: 100 },
      // Bords
      { xMin: 0, xMax: 15, yMin: 20, yMax: 80 },
      { xMin: 85, xMax: 100, yMin: 20, yMax: 80 },
      { xMin: 20, xMax: 80, yMin: 0, yMax: 15 },
      { xMin: 20, xMax: 80, yMin: 85, yMax: 100 },
      // Quelques-uns au milieu mais pas trop
      { xMin: 25, xMax: 75, yMin: 25, yMax: 75 },
      { xMin: 15, xMax: 50, yMin: 40, yMax: 70 },
      { xMin: 50, xMax: 85, yMin: 30, yMax: 60 },
    ];

    for (let i = 0; i < 24; i++) {
      const size = 100 + rand() * 280;
      const radiusApprox = size * 0.4; // rayon approx du blob en px (pour no-overlap)

      // Choisir une zone
      const zone = zones[i % zones.length];
      let x: number, y: number;
      let attempts = 0;
      let valid = false;

      // Trouver une position sans overlap
      do {
        x = zone.xMin + rand() * (zone.xMax - zone.xMin);
        y = zone.yMin + rand() * (zone.yMax - zone.yMin);
        // Convertir % en px approx (sur un écran 1400x900)
        const px = x * 14;
        const py = y * 9;
        valid = placed.every(p => {
          const dx = px - p.x;
          const dy = py - p.y;
          return Math.sqrt(dx * dx + dy * dy) > (radiusApprox * 0.5 + p.r * 0.5);
        });
        attempts++;
      } while (!valid && attempts < 15);

      placed.push({ x: x * 14, y: y * 9, r: radiusApprox });

      items.push({
        x, y, size,
        color: colors[Math.floor(rand() * colors.length)],
        duration: 8 + rand() * 12,
        delay: rand() * 6,
        path: BLOB_PATHS[Math.floor(rand() * BLOB_PATHS.length)],
        opacity: 0.04 + rand() * 0.07,
        rotate: rand() * 360,
      });
    }
    return items;
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {blobs.map((b, i) => (
        <motion.svg key={i} viewBox="0 0 200 200"
          style={{
            position: 'absolute', left: `${b.x}%`, top: `${b.y}%`,
            width: `${b.size}px`, height: `${b.size}px`,
            transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.85, 1.15, 0.8],
            opacity: [b.opacity * 0.6, b.opacity, b.opacity * 0.7, b.opacity * 1.1, b.opacity * 0.6],
            x: [0, 15 * (i % 2 === 0 ? 1 : -1), -10 * (i % 3 === 0 ? 1 : -1), 12, 0],
            y: [0, -12 * (i % 2 === 0 ? 1 : -1), 8, -6, 0],
            rotate: [0, 3 * (i % 2 === 0 ? 1 : -1), -2, 4 * (i % 2 === 0 ? -1 : 1), 0],
          }}
          transition={{ duration: b.duration, ease: 'easeInOut', repeat: Infinity, delay: b.delay }}>
          <path d={b.path} transform="translate(100 100)" fill={b.color} />
        </motion.svg>
      ))}
    </div>
  );
}
