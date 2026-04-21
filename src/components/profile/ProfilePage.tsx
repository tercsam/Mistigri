import { useState, useRef, useEffect } from 'react';
import type { Profile } from '../../hooks/useAuth';
import { useLibraryStore, type Collection } from '../../store/libraryStore';
import type { DVDItem } from '../../types';
import { PaintBlob, BrushStroke } from '../ui/PaintSplash';

interface Props { profile: Profile; collections: Collection[]; userId: string; onUpdateProfile: (u: Partial<Pick<Profile, 'username' | 'display_name' | 'avatar_url'>>) => Promise<{ error: string | null }>; onUploadAvatar: (f: File) => Promise<{ error: string | null }>; onClose: () => void; onSignOut: () => void; }

export default function ProfilePage({ profile, collections, userId, onUpdateProfile, onUploadAvatar, onClose, onSignOut }: Props) {
  const fetchAllDVDs = useLibraryStore((s) => s.fetchAllDVDsForUser);
  const [allDVDs, setAllDVDs] = useState<DVDItem[]>([]);
  const [username, setUsername] = useState(profile.username ?? '');
  const [displayName, setDisplayName] = useState(profile.display_name ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchAllDVDs(userId).then(setAllDVDs); }, [userId, fetchAllDVDs]);

  const totalItems = allDVDs.length;
  const watchedCount = allDVDs.filter((i) => i.watched).length;
  const rated = allDVDs.filter((i) => i.rating);
  const avgRating = rated.length > 0 ? rated.reduce((s, i) => s + (i.rating ?? 0), 0) / rated.length : 0;

  const handleSave = async () => {
    setSaving(true); setError(null); setSuccess(false);
    const updates: Record<string, string | null> = {};
    if (username.trim() !== (profile.username ?? '')) updates.username = username.trim() || null;
    if (displayName.trim() !== (profile.display_name ?? '')) updates.display_name = displayName.trim() || null;
    if (Object.keys(updates).length === 0) { setSaving(false); return; }
    const { error: e } = await onUpdateProfile(updates);
    setSaving(false);
    if (e) setError(e); else setSuccess(true);
  };

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError('Image trop lourde (max 2 Mo)'); return; }
    setSaving(true); setError(null);
    const { error: e2 } = await onUploadAvatar(file);
    setSaving(false);
    if (e2) setError(e2); else setSuccess(true);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        className="brush-shape-modal"
        style={{
          width: '94%', maxWidth: 520, maxHeight: '88vh', overflow: 'auto',
          background: 'var(--bg-white)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          /* Padding très généreux pour que le contenu ne soit pas coupé par la forme */
          padding: '32px 36px',
          position: 'relative',
        }}>

        <PaintBlob color="var(--accent-red)" size={160} opacity={0.03} style={{ top: -40, right: -40 }} />
        <PaintBlob color="var(--accent-gold)" size={100} opacity={0.04} style={{ bottom: -20, left: -20 }} />

        <button onClick={onClose} className="cursor-pointer brush-shape-1" style={{ position: 'absolute', top: 20, right: 24, width: 34, height: 34, border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>✕</button>

        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <button onClick={() => fileRef.current?.click()} className="cursor-pointer" style={{ width: 88, height: 88, borderRadius: '50%', border: '3px solid var(--accent-gold)', background: 'var(--bg-warm)', cursor: 'pointer', overflow: 'hidden', padding: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} title="Changer la photo">
            {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 36 }}>👤</span>}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{ display: 'none' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', marginTop: 6 }}>Clique pour changer</p>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, textAlign: 'center', margin: '0 0 24px', position: 'relative', zIndex: 1 }}>Mon Profil</h2>

        {/* Stats globales — bien visibles */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', margin: '0 0 24px', position: 'relative', zIndex: 1 }}>
          {[{ l: 'Titres', v: totalItems }, { l: 'Vus', v: watchedCount }, { l: 'Note moy.', v: avgRating > 0 ? `${avgRating.toFixed(1)} ★` : '—' }, { l: 'Collections', v: collections.length }].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--accent-red)' }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ margin: '0 15% 24px', position: 'relative', zIndex: 1 }}><BrushStroke color="var(--accent-gold)" opacity={0.3} /></div>

        {/* Champs */}
        <div style={{ marginBottom: 16, position: 'relative', zIndex: 1 }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Username (pour le partage)</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="cinephile42" className="brush-shape-1"
            style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 14, padding: '12px 18px', border: '2px solid var(--border-light)', background: 'var(--bg-warm)', outline: 'none' }} />
        </div>
        <div style={{ marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Nom affiché</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Marie Dupont" className="brush-shape-1"
            style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 14, padding: '12px 18px', border: '2px solid var(--border-light)', background: 'var(--bg-warm)', outline: 'none' }} />
        </div>

        {error && <p style={{ fontSize: 12, color: 'var(--color-error)', marginBottom: 12, position: 'relative', zIndex: 1 }}>{error}</p>}
        {success && <p style={{ fontSize: 12, color: 'var(--color-success)', marginBottom: 12, position: 'relative', zIndex: 1 }}>✓ Profil mis à jour !</p>}

        <button onClick={handleSave} disabled={saving} className="cursor-pointer brush-shape-2"
          style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, padding: 14, border: 'none', cursor: saving ? 'wait' : 'pointer', background: 'var(--accent-red)', color: '#fff', opacity: saving ? 0.7 : 1, marginBottom: 28, position: 'relative', zIndex: 1 }}>
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>

        {/* Collections */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, margin: '0 0 12px', position: 'relative', zIndex: 1 }}>Mes Collections</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
          {collections.map((c) => (
            <div key={c.id} className="brush-shape-1" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-warm)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}>{c.name}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-light)' }}>{c.is_public ? 'Public' : 'Privé'}</span>
            </div>
          ))}
        </div>

        <button onClick={onSignOut} className="cursor-pointer"
          style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: 13, padding: 12, borderRadius: 10, border: '1px solid rgba(220,38,38,0.2)', background: 'transparent', color: 'var(--color-error)', cursor: 'pointer', marginTop: 28, opacity: 0.5, transition: 'opacity 200ms', position: 'relative', zIndex: 1 }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
