import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTrending, getNowPlaying, getUpcoming, getPosterUrl, getDetails, getProviderUrl, type TMDBDetails } from '../../services/tmdb';
import { TMDB } from '../../utils/constants';
import type { TMDBSearchResult } from '../../types';
import { BrushStroke, PaintBlob } from '../ui/PaintSplash';

type NewsTab = 'trending' | 'now_playing' | 'upcoming';

const TABS: { id: NewsTab; label: string }[] = [
  { id: 'trending', label: '🔥 Tendances' },
  { id: 'now_playing', label: '🎬 Au cinéma' },
  { id: 'upcoming', label: '📅 Bientôt' },
];

/** Liens de recherche vers les cinémas avec le titre du film */
function getCinemaLinks(_title: string) {
  return [
    { name: 'Allociné', url: 'https://www.allocine.fr', color: '#FECC00', textColor: '#000' },
    { name: 'CGR', url: 'https://www.cgrcinemas.fr', color: '#E30613', textColor: '#fff' },
    { name: 'UGC', url: 'https://www.ugc.fr', color: '#C8102E', textColor: '#fff' },
    { name: 'Pathé', url: 'https://www.pathe.fr', color: '#00205B', textColor: '#fff' },
    { name: 'TMDB', url: 'https://www.themoviedb.org', color: '#01d277', textColor: '#fff' },
  ];
}

/** Modal détail d'un film/série du bandeau */
function NewsDetailModal({ item, onClose }: { item: TMDBSearchResult; onClose: () => void }) {
  const [details, setDetails] = useState<TMDBDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDetails(item.id, item.mediaType).then((d) => { setDetails(d); setLoading(false); });
  }, [item.id, item.mediaType]);

  const formatDate = (d: string) => {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  const cinemaLinks = getCinemaLinks(item.title);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="brush-shape-modal"
        style={{ width: '94%', maxWidth: 520, maxHeight: '85vh', overflow: 'auto', background: 'var(--bg-white)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '0', position: 'relative' }}>

        <PaintBlob color="var(--accent-gold)" size={140} opacity={0.03} style={{ top: -40, right: -40 }} />

        {/* Header avec poster */}
        <div style={{ display: 'flex', gap: 16, padding: '24px 28px 16px' }}>
          <div className="brush-shape-2" style={{ width: 120, height: 180, flexShrink: 0, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            {item.posterPath ? (
              <img src={getPosterUrl(item.posterPath, TMDB.POSTER_SIZES.COVER)} alt={item.title} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🎬</div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: '0 0 8px', paddingRight: 30 }}>{item.title}</h2>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              <span className="brush-shape-1" style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-red)', background: 'var(--accent-red-light)', padding: '3px 12px' }}>
                {item.mediaType === 'movie' ? 'Film' : 'Série'}
              </span>
              {item.releaseDate && (
                <span className="brush-shape-1" style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-warm)', padding: '3px 12px' }}>
                  {formatDate(item.releaseDate)}
                </span>
              )}
            </div>
            {loading ? (
              <p style={{ fontSize: 13, color: 'var(--accent-gold)' }}>Chargement...</p>
            ) : details && (
              <>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                  {details.genres.map((g) => (
                    <span key={g} className="brush-shape-1" style={{ fontSize: 10, color: 'var(--accent-gold)', background: 'var(--accent-gold-light)', padding: '2px 10px' }}>{g}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-gold)' }}>{details.voteAverage.toFixed(1)}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-light)' }}>/10</span>
                  {details.runtime && (
                    <span style={{ fontSize: 12, color: 'var(--text-light)', marginLeft: 8 }}>
                      {item.mediaType === 'movie' ? `${Math.floor(details.runtime / 60)}h${String(details.runtime % 60).padStart(2, '0')}` : `~${details.runtime} min/ép.`}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          {/* Bouton fermer */}
          <button onClick={onClose} className="cursor-pointer brush-shape-1"
            style={{ position: 'absolute', top: 16, right: 20, width: 34, height: 34, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-red)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>✕</button>
        </div>

        {/* Synopsis */}
        {!loading && details?.overview && (
          <div style={{ padding: '0 28px 16px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{details.overview}</p>
          </div>
        )}

        {/* Casting + Réalisateur */}
        {!loading && details && (
          <div className="brush-shape-3" style={{ margin: '0 20px 16px', padding: '14px 18px', background: 'var(--bg-warm)' }}>
            {details.director && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 6px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{item.mediaType === 'movie' ? 'Réalisé par' : 'Créé par'}</strong> {details.director}
              </p>
            )}
            {details.cast.length > 0 && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Casting</strong> {details.cast.map((c) => c.name).join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Plateformes de streaming */}
        {!loading && details && details.watchProviders.length > 0 && (
          <div style={{ padding: '0 28px 16px' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Regarder en streaming</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {details.watchProviders.map((p) => (
                <a key={p.provider_id} href={getProviderUrl(p.provider_name, p.provider_id, item.title, details.watchLink)} target="_blank" rel="noopener noreferrer"
                  className="brush-shape-1"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', textDecoration: 'none', background: 'var(--bg-warm)', transition: 'all 200ms', border: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-white)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                  <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name} style={{ width: 24, height: 24, borderRadius: 5 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{p.provider_name}</span>
                </a>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--text-light)', marginTop: 6, fontStyle: 'italic' }}>Données JustWatch via TMDB</p>
          </div>
        )}

        {/* Séparateur */}
        <div style={{ margin: '0 25%', marginBottom: 16 }}><BrushStroke color="var(--accent-gold)" opacity={0.25} /></div>

        {/* Boutons liens cinéma */}
        <div style={{ padding: '0 28px 24px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>Voir les séances & infos</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cinemaLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="brush-shape-1"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                  padding: '8px 16px', textDecoration: 'none',
                  background: link.color, color: link.textColor,
                  transition: 'all 200ms', opacity: 0.9,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'none'; }}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NewsBanner() {
  const [tab, setTab] = useState<NewsTab>('trending');
  const [data, setData] = useState<Record<NewsTab, TMDBSearchResult[]>>({ trending: [], now_playing: [], upcoming: [] });
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TMDBSearchResult | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [trending, nowPlaying, upcoming] = await Promise.all([getTrending(), getNowPlaying(), getUpcoming()]);
      setData({ trending, now_playing: nowPlaying, upcoming });
      setLoading(false);
    })();
  }, []);

  const items = data[tab];
  const doubled = [...items, ...items];
  const duration = items.length * 3;

  const formatDate = (d: string) => {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); }
    catch { return d; }
  };

  return (
    <div style={{ marginTop: 32, position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--accent-gold)' }}>À l'affiche</h3>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className="cursor-pointer brush-shape-1"
              style={{
                fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: tab === t.id ? 600 : 400,
                padding: '4px 12px', border: 'none',
                background: tab === t.id ? 'var(--accent-gold)' : 'var(--bg-warm)',
                color: tab === t.id ? '#fff' : 'var(--text-light)',
                cursor: 'pointer', transition: 'all 200ms',
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '60px', marginBottom: 14 }}><BrushStroke color="var(--accent-gold)" opacity={0.3} /></div>

      {/* Ticker */}
      <div style={{
        overflow: 'hidden', position: 'relative',
        maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
      }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>

        {loading ? (
          <div style={{ display: 'flex', gap: 12, padding: '8px 0' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ width: 100, height: 150, flexShrink: 0, borderRadius: 8, background: 'var(--bg-warm)' }} />
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex', gap: 14,
            animation: `ticker ${duration}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            width: 'max-content',
          }}>
            {doubled.map((item, i) => (
              <button key={`${tab}-${i}`} onClick={() => setSelectedItem(item)} className="cursor-pointer"
                style={{
                  width: 100, flexShrink: 0, cursor: 'pointer',
                  transition: 'transform 200ms', background: 'none', border: 'none', padding: 0, textAlign: 'left',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
                <div className="brush-shape-2" style={{
                  width: 100, height: 150, overflow: 'hidden', marginBottom: 6,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)', position: 'relative',
                }}>
                  {item.posterPath ? (
                    <img src={getPosterUrl(item.posterPath, TMDB.POSTER_SIZES.THUMB)} alt={item.title} loading="lazy" draggable="false"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎬</div>
                  )}
                  <span style={{
                    position: 'absolute', top: 6, left: 6,
                    fontSize: 8, fontWeight: 600, padding: '2px 8px', borderRadius: 8,
                    background: item.mediaType === 'movie' ? 'rgba(196,30,58,0.8)' : 'rgba(184,134,11,0.8)',
                    color: '#fff', backdropFilter: 'blur(4px)',
                  }}>
                    {item.mediaType === 'movie' ? 'Film' : 'Série'}
                  </span>
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
                  margin: 0, overflow: 'hidden', textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap', color: 'var(--text-primary)',
                }}>{item.title}</h4>
                {item.releaseDate && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: 'var(--text-light)' }}>
                    {formatDate(item.releaseDate)}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal détail */}
      <AnimatePresence>
        {selectedItem && <NewsDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
