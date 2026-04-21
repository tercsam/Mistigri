import { useState } from 'react';
export default function StarRating({ value = 0, onChange, size = 24, readOnly = false }: { value?: number; onChange?: (r: number) => void; size?: number; readOnly?: boolean }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (<div role="group" aria-label="Note" style={{ display: 'flex', gap: '2px' }} onMouseLeave={() => !readOnly && setHover(0)}>
    {[1,2,3,4,5].map((s) => (<button key={s} type="button" onClick={() => !readOnly && onChange?.(s)} onMouseEnter={() => !readOnly && setHover(s)}
      style={{ background: 'none', border: 'none', cursor: readOnly ? 'default' : 'pointer', padding: '2px', fontSize: `${size}px`, lineHeight: 1, color: s <= display ? 'var(--accent-gold)' : 'var(--border-light)', transition: 'all 150ms', transform: s <= display ? 'scale(1.15)' : 'scale(1)' }}>★</button>))}
  </div>);
}
