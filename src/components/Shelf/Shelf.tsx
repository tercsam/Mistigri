import { useRef, useState, useEffect, type ReactNode } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence } from 'framer-motion';
import type { DVDItem } from '../../types';
import { useLibraryStore } from '../../store/libraryStore';
import DVDCase from '../DVDCase/DVDCase';
import ShelfRow, { useShelfHover } from './ShelfRow';
import { BlackCat, GiantPlant, SHELF_OBJECTS } from './ShelfDecorations';

function getMaxPerRow() {
  if (typeof window === 'undefined') return 18;
  const w = window.innerWidth;
  if (w < 480) return 6;
  if (w < 768) return 10;
  return 18;
}

function SortableDVD({ item, index, onDVDClick }: { item: DVDItem; index: number; onDVDClick?: (i: DVDItem) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  return (<div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 100 : undefined }} {...attributes} {...listeners}>
    <DVDCase item={item} index={index} onClick={() => onDVDClick?.(item)} />
  </div>);
}

function DecoWrapper({ children }: { children: (h: boolean) => ReactNode }) {
  const { dvdHovered } = useShelfHover();
  return <>{children(dvdHovered)}</>;
}

/** Objet déco avec espacement symétrique garanti */
function seeded(s: number) { return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
function chunk<T>(arr: T[], size: number): T[][] { const r: T[][] = []; for (let i = 0; i < arr.length; i += size) r.push(arr.slice(i, i + size)); return r; }

export default function Shelf({ items, onDVDClick }: { items: DVDItem[]; onDVDClick?: (i: DVDItem) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reorder = useLibraryStore((s) => s.reorderItems);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const handleDragEnd = (e: DragEndEvent) => { if (!e.over || e.active.id === e.over.id) return; reorder(String(e.active.id), String(e.over.id)); };

  const [maxPerRow, setMaxPerRow] = useState(getMaxPerRow);
  useEffect(() => {
    const onResize = () => setMaxPerRow(getMaxPerRow());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const rows = chunk(items, maxPerRow);
  const totalRows = rows.length;
  const rand = seeded(91);
  const shuffled = [...SHELF_OBJECTS].sort(() => rand() - 0.5);

  return (
    <div ref={ref} style={{ padding: '16px 20px', background: 'var(--bg-white)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', borderRadius: 16, maxWidth: 1100, margin: '0 auto', overflow: 'visible' }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
          {rows.map((row, ri) => {
            const isFirst = ri === 0;
            const isLast = ri === totalRows - 1;
            const n = row.length;

            // Nombre d'objets proportionnel au nombre de DVD
            let decoCount = 0;
            if (n >= 12) decoCount = 2;
            else if (n >= 6) decoCount = 1;
            else if (n >= 3 && totalRows > 1) decoCount = 1;

            // Positions aléatoires avec écarts irréguliers
            const positions: number[] = [];
            for (let d = 0; d < decoCount; d++) {
              let pos: number;
              let attempts = 0;
              do {
                pos = 2 + Math.floor(rand() * (n - 3));
                attempts++;
              } while (attempts < 20 && positions.some(p => Math.abs(p - pos) < 4));
              positions.push(pos);
            }
            positions.sort((a, b) => a - b);

            // Associer chaque position à un objet
            const decos = positions.map((pos, di) => ({
              pos,
              Comp: shuffled[(ri * 3 + di) % shuffled.length],
            }));

            return (
              <ShelfRow key={`r-${ri}`} rowIndex={ri}>
                {/* Chat — toujours visible */}
                {isFirst && (
                  <div style={{ alignSelf: 'flex-end', marginRight: 8, position: 'relative', zIndex: 10, flexShrink: 0 }}>
                    <DecoWrapper>{(h) => <BlackCat dvdHovered={h} />}</DecoWrapper>
                  </div>
                )}

                <AnimatePresence mode="popLayout">
                  {row.map((item, ii) => {
                    const elements: ReactNode[] = [];

                    {/* Autres décos — desktop uniquement */}
                    for (const deco of decos) {
                      if (deco.pos === ii) {
                        const C = deco.Comp;
                        elements.push(
                          <div key={`d-${ri}-${ii}`} className="hidden sm:flex" style={{ alignSelf: 'flex-end', paddingLeft: 16, paddingRight: 16, alignItems: 'flex-end' }}>
                            <DecoWrapper>{(h) => <C dvdHovered={h} />}</DecoWrapper>
                          </div>
                        );
                      }
                    }

                    elements.push(
                      <SortableDVD key={item.id} item={item} index={ri * maxPerRow + ii} onDVDClick={onDVDClick} />
                    );

                    return elements;
                  })}
                </AnimatePresence>

                {/* Plante — toujours visible */}
                {isLast && (
                  <div style={{ alignSelf: 'flex-end', marginLeft: 8, flexShrink: 0 }}>
                    <DecoWrapper>{(h) => <GiantPlant dvdHovered={h} />}</DecoWrapper>
                  </div>
                )}
              </ShelfRow>
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
