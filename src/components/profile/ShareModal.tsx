import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLibraryStore, type Collaborator } from '../../store/libraryStore';
import { supabase } from '../../services/supabase';
import type { Profile } from '../../hooks/useAuth';

export default function ShareModal({ collectionId, collectionName, onClose }: { collectionId: string | null; collectionName: string; onClose: () => void }) {
  const { fetchCollaborators, addCollaborator, removeCollaborator, updateCollaboratorRole } = useLibraryStore();
  const [collabs, setCollabs] = useState<Collaborator[]>([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const [role, setRole] = useState<'viewer' | 'editor'>('viewer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { if (collectionId) fetchCollaborators(collectionId).then(setCollabs); }, [collectionId, fetchCollaborators]);

  // Recherche live d'utilisateurs
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.trim().length < 2) { setSuggestions([]); return; }
    timerRef.current = setTimeout(async () => {
      const { data } = await supabase.from('profiles').select('*')
        .or(`username.ilike.%${query.trim()}%,display_name.ilike.%${query.trim()}%`).limit(5);
      setSuggestions((data ?? []) as Profile[]);
    }, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query]);

  const handleAdd = async (username: string) => {
    if (!collectionId || !username.trim()) return;
    setLoading(true); setError(null); setSuccess(null);
    const { error: e } = await addCollaborator(collectionId, username.trim(), role);
    setLoading(false);
    if (e) setError(e);
    else { setSuccess(`${username.trim()} ajouté`); setQuery(''); setSuggestions([]); setCollabs(await fetchCollaborators(collectionId)); }
  };

  return (
    <AnimatePresence>
      {collectionId && (
        <motion.div key="share-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}>
          <motion.div key="share-win" initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '92%', maxWidth: 440, background: 'var(--bg-white)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: 24, borderRadius: 16, position: 'relative' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: 0 }}>Partager "{collectionName}"</h2>
              <button onClick={onClose} className="cursor-pointer" style={{ width: 32, height: 32, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>✕</button>
            </div>

            {/* Recherche live */}
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher un utilisateur..." autoFocus
                  style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 13, padding: '10px 14px', border: '2px solid var(--border-light)', background: 'var(--bg-warm)', outline: 'none', borderRadius: 10 }} />
                <select value={role} onChange={(e) => setRole(e.target.value as 'viewer' | 'editor')}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12, padding: '10px 10px', border: '2px solid var(--border-light)', background: 'var(--bg-white)', cursor: 'pointer', outline: 'none', borderRadius: 10 }}>
                  <option value="viewer">Lecteur</option><option value="editor">Éditeur</option>
                </select>
              </div>

              {/* Dropdown suggestions */}
              {suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 10, overflow: 'hidden' }}>
                  {suggestions.map((u) => (
                    <button key={u.id} onClick={() => u.username && handleAdd(u.username)} className="cursor-pointer"
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 150ms' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--border-light)', overflow: 'hidden', flexShrink: 0 }}>
                        {u.avatar_url ? <img src={u.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 12 }}>👤</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{u.display_name || 'Utilisateur'}</div>
                        {u.username && <div style={{ fontSize: 10, color: 'var(--text-light)' }}>@{u.username}</div>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {loading && <p style={{ fontSize: 12, color: 'var(--accent-red)' }}>Ajout...</p>}
            {error && <p style={{ fontSize: 12, color: 'var(--color-error)', marginBottom: 8 }}>{error}</p>}
            {success && <p style={{ fontSize: 12, color: 'var(--color-success)', marginBottom: 8 }}>✓ {success}</p>}

            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, marginTop: 16 }}>Accès ({collabs.length})</h3>
            {collabs.length === 0 ? <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', padding: '16px 0' }}>Aucun collaborateur.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {collabs.map((c) => (
                  <div key={c.user_id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg-warm)', borderRadius: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--border-light)', overflow: 'hidden', flexShrink: 0 }}>
                      {c.avatar_url ? <img src={c.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 12 }}>👤</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{c.display_name || c.username || 'Utilisateur'}</div>
                      {c.username && <div style={{ fontSize: 10, color: 'var(--text-light)' }}>@{c.username}</div>}
                    </div>
                    <select value={c.role} onChange={(e) => { updateCollaboratorRole(collectionId!, c.user_id, e.target.value as 'viewer' | 'editor'); setCollabs((p) => p.map((x) => x.user_id === c.user_id ? { ...x, role: e.target.value as 'viewer' | 'editor' } : x)); }}
                      style={{ fontSize: 11, padding: '4px 6px', border: '1px solid var(--border-light)', borderRadius: 6, background: 'var(--bg-white)', cursor: 'pointer', outline: 'none' }}>
                      <option value="viewer">Lecteur</option><option value="editor">Éditeur</option>
                    </select>
                    <button onClick={() => { removeCollaborator(collectionId!, c.user_id); setCollabs((p) => p.filter((x) => x.user_id !== c.user_id)); }} className="cursor-pointer"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--color-error)', opacity: 0.5, padding: 2 }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
