import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../services/supabase';
import type { Profile } from '../../hooks/useAuth';
import PublicProfilePage from '../profile/PublicProfilePage';

export default function UserSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.ilike.%${query.trim()}%,display_name.ilike.%${query.trim()}%`)
        .limit(10);
      setResults((data ?? []) as Profile[]);
      setLoading(false);
    }, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  // Si on regarde un profil public, on affiche le PublicProfilePage
  if (viewingUserId) {
    return <PublicProfilePage userId={viewingUserId} onClose={() => setViewingUserId(null)} />;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80, backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="brush-shape-modal"
        style={{ width: '92%', maxWidth: 440, background: 'var(--bg-white)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', padding: '24px 28px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: 0 }}>Rechercher un utilisateur</h2>
          <button onClick={onClose} className="cursor-pointer brush-shape-1" style={{ width: 32, height: 32, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher par username ou nom..." autoFocus className="brush-shape-1"
          style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 16px', border: '2px solid var(--border-light)', background: 'var(--bg-warm)', outline: 'none', marginBottom: 12 }} />

        {loading && <p style={{ fontSize: 13, color: 'var(--accent-red)', textAlign: 'center' }}>Recherche...</p>}

        {!loading && query.trim().length >= 2 && results.length === 0 && (
          <p style={{ fontSize: 13, color: 'var(--text-light)', textAlign: 'center', padding: '16px 0' }}>Aucun utilisateur trouvé.</p>
        )}

        {results.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {results.map((u) => (
              <button key={u.id} onClick={() => setViewingUserId(u.id)} className="cursor-pointer brush-shape-1"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-warm)', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 200ms' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--border-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--border-light)', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--accent-gold)' }}>
                  {u.avatar_url ? <img src={u.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 18 }}>👤</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{u.display_name || 'Utilisateur'}</div>
                  {u.username && <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>@{u.username}</div>}
                </div>
                <span style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 600, flexShrink: 0 }}>Voir profil →</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
