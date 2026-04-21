import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../services/supabase';
import type { Profile } from '../../hooks/useAuth';
import type { DVDItem, MediaType } from '../../types';
import { getRandomSpineColor } from '../../utils/colors';
import { BrushStroke, PaintBlob } from '../ui/PaintSplash';
import StarRating from '../ui/StarRating';

interface PublicCollection {
  id: string;
  name: string;
  dvds: DVDItem[];
}

function mapRow(row: Record<string, unknown>): DVDItem {
  return {
    id: row.id as string, title: row.title as string, mediaType: row.media_type as MediaType,
    posterUrl: (row.poster_url as string) ?? '', tmdbId: row.tmdb_id as number,
    spineColor: (row.spine_color as string) ?? getRandomSpineColor(), addedAt: row.added_at as string,
    year: (row.year as string) ?? undefined, watched: (row.watched as boolean) ?? false,
    rating: (row.rating as number) ?? undefined, comment: (row.comment as string) ?? undefined,
    watchedAt: (row.watched_at as string) ?? undefined,
  };
}

export default function PublicProfilePage({ userId, onClose }: { userId: string; onClose: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [collections, setCollections] = useState<PublicCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCol, setSelectedCol] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: prof, error: e1 } = await supabase.from('profiles').select('*').eq('id', userId).single();
      console.log('[PUBLIC] profile:', prof, e1);
      setProfile(prof as Profile | null);

      // Toutes les collections (les RLS gèrent la visibilité)
      const { data: cols, error: e2 } = await supabase.from('collections').select('*').eq('owner_id', userId);
      console.log('[PUBLIC] collections:', cols, e2);
      if (!cols || cols.length === 0) { setCollections([]); setLoading(false); return; }

      const publicCols: PublicCollection[] = await Promise.all(
        (cols as { id: string; name: string }[]).map(async (col) => {
          const { data: dvds, error: e3 } = await supabase.from('dvds').select('*').eq('collection_id', col.id).order('position');
          console.log('[PUBLIC] dvds for', col.name, ':', dvds?.length, e3);
          return { id: col.id, name: col.name, dvds: (dvds ?? []).map((r) => mapRow(r as Record<string, unknown>)) };
        })
      );
      setCollections(publicCols);
      if (publicCols.length > 0) setSelectedCol(publicCols[0].id);
      setLoading(false);
    })();
  }, [userId]);

  const allDVDs = collections.flatMap((c) => c.dvds);
  const watchedDVDs = allDVDs.filter((d) => d.watched);
  const ratedDVDs = allDVDs.filter((d) => d.rating);
  const avgRating = ratedDVDs.length > 0 ? ratedDVDs.reduce((s, d) => s + (d.rating ?? 0), 0) / ratedDVDs.length : 0;
  const currentCol = collections.find((c) => c.id === selectedCol);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="brush-shape-modal"
        style={{ width: '96%', maxWidth: 600, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--bg-white)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', position: 'relative' }}>

        <PaintBlob color="var(--accent-red)" size={160} opacity={0.03} style={{ top: -40, right: -40 }} />
        <PaintBlob color="var(--accent-gold)" size={100} opacity={0.04} style={{ bottom: -20, left: -20 }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 30px 16px', borderBottom: '1px solid var(--border-lighter)', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: 0 }}>Profil</h2>
          <button onClick={onClose} className="cursor-pointer brush-shape-1" style={{ width: 34, height: 34, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-red)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 30px 24px', position: 'relative', zIndex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--accent-red)' }}>Chargement...</div>
          ) : !profile ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>Utilisateur introuvable.</div>
          ) : (
            <>
              {/* Avatar + Nom */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid var(--accent-gold)', overflow: 'hidden', margin: '0 auto 10px', background: 'var(--bg-warm)' }}>
                  {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 32 }}>👤</span>}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{profile.display_name || 'Utilisateur'}</h3>
                {profile.username && <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-light)', margin: 0 }}>@{profile.username}</p>}
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '0 0 20px' }}>
                {[{ l: 'Titres', v: allDVDs.length }, { l: 'Vus', v: watchedDVDs.length }, { l: 'Note moy.', v: avgRating > 0 ? `${avgRating.toFixed(1)} ★` : '—' }, { l: 'Collections', v: collections.length }].map((s) => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--accent-red)' }}>{s.v}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ margin: '0 15% 20px' }}><BrushStroke color="var(--accent-gold)" opacity={0.3} /></div>

              {collections.length === 0 ? (
                <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-light)', padding: 20 }}>Aucune collection publique.</p>
              ) : (
                <>
                  {/* Tabs collections */}
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
                    {collections.map((c) => (
                      <button key={c.id} onClick={() => setSelectedCol(c.id)} className="cursor-pointer brush-shape-1"
                        style={{
                          flexShrink: 0, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: selectedCol === c.id ? 600 : 400,
                          padding: '8px 16px', border: 'none', cursor: 'pointer',
                          background: selectedCol === c.id ? 'var(--accent-red)' : 'var(--bg-warm)',
                          color: selectedCol === c.id ? '#fff' : 'var(--text-secondary)',
                          transition: 'all 200ms',
                        }}>
                        {c.name} <span style={{ fontSize: 11, opacity: 0.7 }}>({c.totalCount})</span>
                      </button>
                    ))}
                  </div>

                  {/* Films */}
                  {currentCol && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {currentCol.dvds.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-light)', padding: 16 }}>Collection vide.</p>
                      ) : currentCol.dvds.map((dvd) => (
                        <div key={dvd.id} className="brush-shape-1" style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'var(--bg-warm)' }}>
                          <div style={{ width: 45, height: 64, flexShrink: 0, borderRadius: 6, overflow: 'hidden', background: 'var(--border-light)' }}>
                            {dvd.posterUrl ? <img src={dvd.posterUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 18 }}>🎬</span>}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dvd.title}</div>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
                              <span className="brush-shape-1" style={{ fontSize: 10, fontWeight: 600, color: 'var(--accent-red)', background: 'var(--accent-red-light)', padding: '2px 8px' }}>{dvd.mediaType === 'movie' ? 'Film' : 'Série'}</span>
                              {dvd.year && <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{dvd.year}</span>}
                              {dvd.watched && <span className="brush-shape-1" style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-success)', background: 'var(--color-success-light)', padding: '2px 8px' }}>✓ Vu</span>}
                            </div>
                            {dvd.rating != null && dvd.rating > 0 && (
                              <div style={{ marginTop: 6 }}><StarRating value={dvd.rating} size={14} /></div>
                            )}
                            {dvd.comment && (
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 0', fontStyle: 'italic' }}>"{dvd.comment}"</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
