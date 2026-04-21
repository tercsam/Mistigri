import { useState, useCallback, createContext, useContext, type ReactNode } from 'react';
import { BrushStroke } from '../ui/PaintSplash';

interface ShelfCtx {
  dvdHovered: boolean;
  setDvdHovered: (v: boolean) => void;
  touchHoveredId: string | null;
}

export const ShelfHoverContext = createContext<ShelfCtx>({ dvdHovered: false, setDvdHovered: () => {}, touchHoveredId: null });
export function useShelfHover() { return useContext(ShelfHoverContext); }

export default function ShelfRow({ children, rowIndex = 0 }: { children: ReactNode; rowIndex?: number }) {
  const [dvdHovered, setDvdHovered] = useState(false);
  const [touchHoveredId, setTouchHoveredId] = useState<string | null>(null);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    // Trouver l'élément sous le doigt
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!el) { setTouchHoveredId(null); setDvdHovered(false); return; }
    // Remonter dans le DOM pour trouver le data-dvd-id
    const dvdEl = el.closest('[data-dvd-id]');
    if (dvdEl) {
      const id = dvdEl.getAttribute('data-dvd-id');
      if (id !== touchHoveredId) {
        setTouchHoveredId(id);
        setDvdHovered(true);
      }
    } else {
      setTouchHoveredId(null);
      setDvdHovered(false);
    }
  }, [touchHoveredId]);

  const handleTouchEnd = useCallback(() => {
    setTouchHoveredId(null);
    setDvdHovered(false);
  }, []);

  return (
    <ShelfHoverContext.Provider value={{ dvdHovered, setDvdHovered, touchHoveredId }}>
      <div style={{ position: 'relative', padding: '10px 16px 4px 16px', marginBottom: 8, overflow: 'visible' }}
        onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchEnd}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0, minHeight: 'calc(var(--dvd-height) + 8px)', paddingBottom: 8, overflow: 'visible' }}>
          {children}
        </div>
        <BrushStroke color="var(--accent-gold)" opacity={0.2} />
      </div>
    </ShelfHoverContext.Provider>
  );
}
