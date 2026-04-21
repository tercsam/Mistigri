import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useLibraryStore } from '../../store/libraryStore';
import { getDetails, getSimilar, getPosterUrl, getProviderUrl, type TMDBDetails } from '../../services/tmdb';
import { extractDominantColor } from '../../hooks/useExtractColor';
import { TMDB } from '../../utils/constants';
import type { TMDBSearchResult } from '../../types';
import StarRating from '../ui/StarRating';
import { PaintBlob } from '../ui/PaintSplash';

export default function DVDDetailModal({ itemId, onClose }: { itemId: string | null; onClose: () => void }) {
  const item = useLibraryStore((s) => itemId ? (s.items ?? []).find((i) => i.id === itemId) ?? null : null);
  const markAsWatched = useLibraryStore((s) => s.markAsWatched);
  const unmarkAsWatched = useLibraryStore((s) => s.unmarkAsWatched);
  const updateItem = useLibraryStore((s) => s.updateItem);
  const removeItem = useLibraryStore((s) => s.removeItem);
  const addItem = useLibraryStore((s) => s.addItem);
  const hasItem = useLibraryStore((s) => s.hasItem);

  const [comment, setComment] = useState('');
  const [showDel, setShowDel] = useState(false);
  const [details, setDetails] = useState<TMDBDetails | null>(null);
  const [similar, setSimilar] = useState<TMDBSearchResult[]>([]);
  const [loadingD, setLoadingD] = useState(false);

  useEffect(() => {
    if (item) {
      setComment(item.comment ?? ''); setShowDel(false); setDetails(null); setSimilar([]); setLoadingD(true);
      Promise.all([getDetails(item.tmdbId, item.mediaType), getSimilar(item.tmdbId, item.mediaType)])
        .then(([d, s]) => { setDetails(d); setSimilar(s); setLoadingD(false); });
    }
  }, [item?.id]); // eslint-disable-line

  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && itemId) onClose(); }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, [itemId, onClose]);

  const fire = (big = true) => confetti({ particleCount: big ? 80 : 40, spread: big ? 70 : 50, origin: { y: 0.6 }, colors: ['#c41e3a', '#b8860b', '#e8c76a', '#ff6b6b', '#ffd700'], disableForReducedMotion: true });
  const handleCommentBlur = () => { if (item) updateItem(item.id, { comment: comment.trim() || undefined }); };
  const handleToggle = () => { if (!item) return; if (item.watched) unmarkAsWatched(item.id); else { markAsWatched(item.id); fire(); } };
  const handleRate = (r: number) => { if (!item) return; if (!item.watched) { markAsWatched(item.id, r); fire(); } else { updateItem(item.id, { rating: r }); if (r >= 4) fire(false); } };
  const handleDel = () => { if (!item) return; removeItem(item.id); onClose(); };
  const handleAddRec = async (rec: TMDBSearchResult) => {
    const posterUrl = getPosterUrl(rec.posterPath);
    const spineColor = await extractDominantColor(getPosterUrl(rec.posterPath, TMDB.POSTER_SIZES.THUMB));
    await addItem({ title: rec.title, mediaType: rec.mediaType, posterUrl, tmdbId: rec.id, year: rec.releaseDate ? rec.releaseDate.split('-')[0] : undefined, spineColor });
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div key="det-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }}>
          <motion.div key="det-win" initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="brush-shape-modal"
            style={{
              width: '94%', maxWidth: 580, maxHeight: '90vh',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              background: 'var(--bg-white)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              position: 'relative',
              /* Padding généreux pour compenser la forme organique */
              padding: '0',
            }}>

            <PaintBlob color="var(--accent-red)" size={180} opacity={0.03} style={{ top: -50, right: -50 }} />
            <PaintBlob color="var(--accent-gold)" size={120} opacity={0.04} style={{ bottom: -30, left: -30 }} />

            {/* Header — padding large */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 30px 16px', borderBottom: '1px solid var(--border-lighter)', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{item.title}</h2>
              <button onClick={onClose} className="cursor-pointer brush-shape-1" style={{ width: 34, height: 34, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 200ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-red)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>✕</button>
            </div>

            {/* Body — padding large */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px 24px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div className="brush-shape-2" style={{ width: 120, height: 170, flexShrink: 0, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                  {item.posterUrl ? <img src={item.posterUrl} alt={item.title} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', background: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: 'var(--text-light)' }}>🎬</div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>{item.title}</h3>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    <span className="brush-shape-1" style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-red)', background: 'var(--accent-red-light)', padding: '4px 14px' }}>{item.mediaType === 'movie' ? 'Film' : 'Série'}</span>
                    {item.year && <span className="brush-shape-1" style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-warm)', padding: '4px 14px' }}>{item.year}</span>}
                    {item.watched && <span className="brush-shape-1" style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-success)', background: 'var(--color-success-light)', padding: '4px 14px' }}>✓ Vu</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Note</div>
                  <StarRating value={item.rating} onChange={handleRate} size={24} />
                </div>
              </div>

              <button type="button" onClick={handleToggle} className="cursor-pointer brush-shape-3"
                style={{ width: '100%', fontSize: 14, fontWeight: 600, padding: 16, border: 'none', background: item.watched ? 'var(--color-success-light)' : 'var(--bg-warm)', color: item.watched ? 'var(--color-success)' : 'var(--text-secondary)', marginBottom: 18, cursor: 'pointer', transition: 'all 250ms' }}>
                {item.watched ? '✓ Marqué comme vu — Annuler' : '○ Marquer comme vu'}
              </button>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Commentaire</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} onBlur={handleCommentBlur} placeholder="Ton avis..." maxLength={500} rows={3} className="brush-shape-4"
                  style={{ width: '100%', fontSize: 14, color: 'var(--text-primary)', backgroundColor: 'var(--bg-warm)', border: '2px solid var(--border-light)', padding: '14px 18px', outline: 'none', resize: 'vertical', caretColor: 'var(--accent-red)', lineHeight: 1.5 }} />
                <div style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'right', marginTop: 4 }}>{comment.length}/500</div>
              </div>

              {loadingD && <div style={{ textAlign: 'center', padding: 12, fontSize: 13, color: 'var(--accent-red)' }}>Chargement...</div>}
              {details && (
                <div className="brush-shape-3" style={{ marginBottom: 20, padding: 20, background: 'var(--bg-warm)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {details.genres.map((g) => <span key={g} className="brush-shape-1" style={{ fontSize: 11, color: 'var(--accent-gold)', background: 'var(--accent-gold-light)', padding: '3px 12px' }}>{g}</span>)}
                    {details.runtime && <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{item.mediaType === 'movie' ? `${Math.floor(details.runtime / 60)}h${String(details.runtime % 60).padStart(2, '0')}` : `~${details.runtime} min/ép.`}</span>}
                    <span style={{ fontSize: 11, color: 'var(--accent-gold)', fontWeight: 600 }}>{details.voteAverage.toFixed(1)}/10</span>
                  </div>
                  {details.overview && <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 12px' }}>{details.overview}</p>}
                  {details.director && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}><strong style={{ color: 'var(--text-primary)' }}>{item.mediaType === 'movie' ? 'Réalisé par' : 'Créé par'}</strong> {details.director}</div>}
                  {details.cast.length > 0 && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Casting</strong> {details.cast.map((c) => c.name).join(', ')}</div>}
                  
                  {/* Plateformes de streaming */}
                  {details.watchProviders.length > 0 && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Disponible en streaming</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        {details.watchProviders.map((p) => (
                          <a key={p.provider_id} href={getProviderUrl(p.provider_name, p.provider_id, item.title, details.watchLink)} target="_blank" rel="noopener noreferrer"
                            title={p.provider_name}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'var(--bg-cream)', textDecoration: 'none', transition: 'all 200ms', border: '1px solid var(--border-lighter)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-white)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-cream)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} style={{ width: 22, height: 22, borderRadius: 4 }} />
                            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontWeight: 500 }}>{p.provider_name}</span>
                          </a>
                        ))}
                      </div>
                      <p style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 6, fontStyle: 'italic' }}>Données JustWatch via TMDB</p>
                    </div>
                  )}
                </div>
              )}

              {similar.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--accent-gold)', marginBottom: 12, fontWeight: 600 }}>Tu pourrais aussi aimer</h4>
                  <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
                    {similar.map((rec) => { const has = hasItem(rec.id, rec.mediaType); return (
                      <button key={rec.id} type="button" disabled={has} onClick={() => { if (!has) handleAddRec(rec); }}
                        className="cursor-pointer" style={{ flexShrink: 0, width: 65, background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: has ? 0.35 : 1, textAlign: 'center' }}>
                        <div className="brush-shape-2" style={{ width: 65, height: 92, overflow: 'hidden', marginBottom: 4 }}>
                          {rec.posterPath ? <img src={getPosterUrl(rec.posterPath, TMDB.POSTER_SIZES.THUMB)} alt={rec.title} loading="lazy" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', background: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎬</div>}
                        </div>
                        <span style={{ fontSize: 9, color: has ? 'var(--color-success)' : 'var(--text-secondary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{has ? '✓ Ajouté' : rec.title}</span>
                      </button>
                    ); })}
                  </div>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--border-lighter)', paddingTop: 18 }}>
                {!showDel ? (
                  <button type="button" onClick={() => setShowDel(true)} className="cursor-pointer" style={{ width: '100%', fontSize: 13, padding: 12, borderRadius: 10, border: '1px solid rgba(220,38,38,0.2)', background: 'transparent', color: 'var(--color-error)', cursor: 'pointer', opacity: 0.5, transition: 'opacity 200ms' }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}>Supprimer de la collection</button>
                ) : (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={handleDel} className="cursor-pointer brush-shape-2" style={{ flex: 1, fontSize: 13, fontWeight: 600, padding: 12, border: 'none', background: 'var(--color-error)', color: '#fff', cursor: 'pointer' }}>Confirmer</button>
                    <button type="button" onClick={() => setShowDel(false)} className="cursor-pointer brush-shape-2" style={{ flex: 1, fontSize: 13, padding: 12, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Annuler</button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: '12px 30px', borderTop: '1px solid var(--border-lighter)', position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>Ajouté le {new Date(item.addedAt).toLocaleDateString('fr-FR')}{item.watchedAt && ` · Vu le ${new Date(item.watchedAt).toLocaleDateString('fr-FR')}`}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
