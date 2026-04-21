import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MediaType, TMDBSearchResult } from '../../types';
import { useTMDB } from '../../hooks/useTMDB';
import { extractDominantColor } from '../../hooks/useExtractColor';
import { getPosterUrl } from '../../services/tmdb';
import { TMDB } from '../../utils/constants';
import { useLibraryStore } from '../../store/libraryStore';
import Input from '../ui/Input';
import MediaToggle from '../ui/MediaToggle';
import SearchResult from './SearchResult';
import { PaintBlob } from '../ui/PaintSplash';

export default function AddModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const { results, isLoading, error } = useTMDB(query, mediaType);
  const addItem = useLibraryStore((s) => s.addItem);
  const hasItem = useLibraryStore((s) => s.hasItem);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isOpen) { setQuery(''); setMediaType('movie'); setTimeout(() => inputRef.current?.focus(), 200); } }, [isOpen]);
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, [isOpen, onClose]);

  const handleSelect = async (result: TMDBSearchResult) => {
    const posterUrl = getPosterUrl(result.posterPath);
    const spineColor = await extractDominantColor(getPosterUrl(result.posterPath, TMDB.POSTER_SIZES.THUMB));
    await addItem({ title: result.title, mediaType: result.mediaType, posterUrl, tmdbId: result.id, year: result.releaseDate ? result.releaseDate.split('-')[0] : undefined, spineColor });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div key="add-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}>
          <motion.div key="add-win" initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 8 }}
            onClick={(e) => e.stopPropagation()}
            className="brush-shape-modal"
            style={{
              width: '94%', maxWidth: 540, maxHeight: '82vh',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              background: 'var(--bg-white)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              position: 'relative',
            }}>

            <PaintBlob color="var(--accent-red)" size={150} opacity={0.04} style={{ top: -40, right: -30 }} />
            <PaintBlob color="var(--accent-gold)" size={100} opacity={0.05} style={{ bottom: -20, left: -20 }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 30px 16px', borderBottom: '1px solid var(--border-lighter)', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: 0 }}>Ajouter un titre</h2>
              <button onClick={onClose} className="cursor-pointer brush-shape-1" style={{ width: 34, height: 34, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-red)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>✕</button>
            </div>
            <div style={{ padding: '18px 30px', borderBottom: '1px solid var(--border-lighter)', position: 'relative', zIndex: 1 }}>
              <MediaToggle value={mediaType} onChange={setMediaType} />
              <div style={{ marginTop: 14 }}><Input ref={inputRef} label="Titre" placeholder="Ex: Get Out, Andor, Inception..." value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" spellCheck={false} /></div>
              {query.trim().length >= 2 && <div style={{ marginTop: 8, fontSize: 12 }}>
                {isLoading && <span style={{ color: 'var(--accent-red)' }}>Recherche...</span>}
                {error && <span style={{ color: 'var(--color-error)' }}>{error}</span>}
                {!isLoading && !error && results.length === 0 && <span style={{ color: 'var(--text-light)' }}>Aucun résultat.</span>}
              </div>}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px', position: 'relative', zIndex: 1 }}>
              {results.map((r) => <SearchResult key={r.id} result={r} onSelect={handleSelect} alreadyInCollection={hasItem(r.id, r.mediaType)} />)}
            </div>
            <div style={{ padding: '12px 30px', borderTop: '1px solid var(--border-lighter)', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{results.length > 0 ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Tape un titre pour chercher'}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
