import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLibraryStore } from './store/libraryStore';
import type { DVDItem, SortType } from './types';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import Shelf from './components/Shelf/Shelf';
import AddModal from './components/AddModal/AddModal';
import DVDDetailModal from './components/DVDCase/DVDDetailModal';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/profile/ProfilePage';
import ShareModal from './components/profile/ShareModal';
import CollectionCard from './components/home/CollectionCard';
import UserSearch from './components/home/UserSearch';
import NewsBanner from './components/home/NewsBanner';
import PublicProfilePage from './components/profile/PublicProfilePage';
import { BrushStroke, BlobField } from './components/ui/PaintSplash';

function sortItems(items: DVDItem[], sort: SortType): DVDItem[] {
  const s = [...items];
  switch (sort) {
    case 'addedAt': return s.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case 'rating': return s.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1));
    case 'title': return s.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
  }
}

const SORTS: { value: SortType; label: string }[] = [
  { value: 'addedAt', label: 'Récents' }, { value: 'rating', label: 'Note' }, { value: 'title', label: 'A → Z' },
];

function SortBar({ sort, onChange }: { sort: SortType; onChange: (s: SortType) => void }) {
  return (<div style={{ display: 'flex', gap: 6 }}>
    {SORTS.map((s) => (<button key={s.value} onClick={() => onChange(s.value)} className="cursor-pointer brush-shape-1"
      style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: sort === s.value ? 600 : 400, padding: '5px 14px', border: 'none', background: sort === s.value ? 'var(--accent-red)' : 'var(--bg-warm)', color: sort === s.value ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 200ms' }}>{s.label}</button>))}
  </div>);
}

type Tab = 'watchlist' | 'watched';

function App() {
  const { user, profile, loading: authLoading, signInWithGoogle, signOut, updateProfile, uploadAvatar } = useAuth();
  const { theme, toggle: toggleTheme, isDark } = useTheme();
  const store = useLibraryStore();
  const { collections, collectionPreviews, collectionCounts, activeCollectionId, items, collectionsLoading, dvdsLoading, fetchCollections, setActiveCollection, clearActiveCollection, createCollection, deleteCollection } = store;
  const renameCollection = useLibraryStore((s) => s.renameCollection);

  const [addOpen, setAddOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('watchlist');
  const [sortU, setSortU] = useState<SortType>('addedAt');
  const [sortW, setSortW] = useState<SortType>('rating');
  const [showProfile, setShowProfile] = useState(false);
  const [shareId, setShareId] = useState<string | null>(null);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [publicUserId, setPublicUserId] = useState<string | null>(null);
  const [showNewCol, setShowNewCol] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editName, setEditName] = useState('');

  // Ne fetch qu'une seule fois au login — pas à chaque render
  const hasFetched = useRef(false);
  useEffect(() => { if (user && !hasFetched.current) { hasFetched.current = true; fetchCollections(user.id); } }, [user, fetchCollections]);

  const safeItems = items ?? [];
  const unwatched = useMemo(() => sortItems(safeItems.filter((i) => !i.watched), sortU), [safeItems, sortU]);
  const watched = useMemo(() => sortItems(safeItems.filter((i) => i.watched === true), sortW), [safeItems, sortW]);

  if (authLoading) return (<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div><p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>Chargement...</p></div></div>);
  if (!user) return <LoginPage onGoogleLogin={signInWithGoogle} />;

  const handleNewCol = async () => {
    if (!newColName.trim() || !user) return;
    const id = await createCollection(user.id, newColName.trim());
    if (id) { setActiveCollection(id); setNewColName(''); setShowNewCol(false); }
  };

  const activeCol = collections.find((c) => c.id === activeCollectionId);
  const isHome = !activeCollectionId;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Fond dynamique — plein de blobs animés */}
      <BlobField />

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--bg-header)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-lighter)', padding: '0 12px', transition: 'background 400ms ease' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 50, gap: 8 }}>
          {/* Logo */}
          <button onClick={() => clearActiveCollection()} className="cursor-pointer"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, margin: 0 }}>
              DVD <span style={{ color: 'var(--accent-red)' }}>Shelf</span>
            </h1>
          </button>

          {/* Centre — desktop seulement */}
          <div className="hidden md:flex" style={{ gap: 8, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {!isHome && (
              <>
                {editingName ? (
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus
                    onBlur={async () => { const n = editName.trim(); setEditingName(false); if (n && activeCollectionId && n !== activeCol?.name) await renameCollection(activeCollectionId, n); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') { setEditName(activeCol?.name ?? ''); setEditingName(false); } }}
                    className="brush-shape-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', padding: '4px 12px', border: '2px solid var(--accent-gold)', background: 'var(--bg-white)', outline: 'none', width: 180, textAlign: 'center' }} />
                ) : (
                  <button onClick={() => { setEditName(activeCol?.name ?? ''); setEditingName(true); }} className="cursor-pointer"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 8, transition: 'all 200ms' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-warm)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}>
                    {activeCol?.name} ✎
                  </button>
                )}
                <button onClick={() => activeCollectionId && setShareId(activeCollectionId)} className="cursor-pointer brush-shape-1"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, padding: '4px 12px', border: '1px solid var(--border-light)', background: 'var(--bg-white)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Partager
                </button>
                <div style={{ width: 1, height: 18, background: 'var(--border-light)' }} />
                {([{ id: 'watchlist' as Tab, label: 'À voir', count: unwatched.length }, { id: 'watched' as Tab, label: 'Déjà vus', count: watched.length }]).map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)} className="cursor-pointer"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: tab === t.id ? 600 : 400, padding: '5px 12px', border: 'none', cursor: 'pointer', background: tab === t.id ? 'var(--accent-red-light)' : 'transparent', color: tab === t.id ? 'var(--accent-red)' : 'var(--text-secondary)', borderRadius: '30% 70% 70% 30%/60% 40% 60% 40%', transition: 'all 200ms' }}>
                    {t.label} <span style={{ fontSize: 10, opacity: 0.6 }}>{t.count}</span>
                  </button>))}
              </>
            )}
          </div>

          {/* Mobile — nom de collection centré */}
          <div className="flex md:hidden" style={{ flex: 1, justifyContent: 'center', minWidth: 0 }}>
            {!isHome && (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeCol?.name}
              </span>
            )}
          </div>

          {/* Droite */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {/* Rechercher — icône seulement sur mobile */}
            <button onClick={() => setShowUserSearch(true)} className="cursor-pointer"
              style={{ fontFamily: 'var(--font-body)', fontSize: 12, padding: '6px 10px', border: '1px solid var(--border-light)', background: 'var(--bg-white)', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: 8 }}>
              <span className="hidden md:inline">Rechercher</span>
              <span className="md:hidden">🔍</span>
            </button>

            <button onClick={toggleTheme} className="cursor-pointer" title={isDark ? 'Mode clair' : 'Mode sombre'}
              style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid var(--border-light)', background: 'var(--bg-white)', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 300ms', padding: 0 }}>
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Créer/Ajouter — desktop seulement, mobile = bottom bar */}
            <span className="hidden md:inline-flex">
              {isHome ? (
                <button onClick={() => setShowNewCol(true)} className="cursor-pointer"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, padding: '6px 14px', border: 'none', cursor: 'pointer', background: 'var(--accent-red)', color: '#fff', borderRadius: 8 }}>
                  + Créer une liste
                </button>
              ) : (
                <button onClick={() => setAddOpen(true)} className="cursor-pointer"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, padding: '6px 14px', border: 'none', cursor: 'pointer', background: 'var(--accent-red)', color: '#fff', borderRadius: 8 }}>
                  + Ajouter
                </button>
              )}
            </span>

            <button onClick={() => setShowProfile(true)} className="cursor-pointer" title="Mon profil"
              style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid var(--border-light)', background: 'var(--bg-warm)', cursor: 'pointer', overflow: 'hidden', padding: 0 }}>
              {profile?.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 14 }}>👤</span>}
            </button>
          </div>
        </div>

        {/* Barre de création */}
        {showNewCol && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '6px 0 10px', display: 'flex', gap: 8 }}>
            <input value={newColName} onChange={(e) => setNewColName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNewCol()} placeholder="Nom de la collection..." autoFocus
              style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 13, padding: '7px 14px', border: '1px solid var(--border-light)', background: 'var(--bg-white)', outline: 'none', borderRadius: 8 }} />
            <button onClick={handleNewCol} className="cursor-pointer" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, padding: '7px 14px', border: 'none', background: 'var(--accent-gold)', color: '#fff', cursor: 'pointer', borderRadius: 8 }}>Créer</button>
            <button onClick={() => setShowNewCol(false)} className="cursor-pointer" style={{ fontSize: 12, padding: '7px 10px', border: 'none', background: 'var(--bg-warm)', color: 'var(--text-secondary)', cursor: 'pointer', borderRadius: 8 }}>✕</button>
          </div>
        )}
      </header>

      {/* CONTENU */}
      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '16px 12px 100px', position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">

        {/* ============================================================
         * HOME PAGE — Grille de collections style Pinterest
         * ============================================================ */}
        {isHome && (
          <motion.div key="home"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, margin: 0 }}>
                Mes Collections
              </h2>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-light)' }}>
                {collections.length} liste{collections.length > 1 ? 's' : ''}
              </span>
            </div>

            {collectionsLoading ? (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>Chargement...</div>
            ) : collections.length === 0 ? (
              <div className="animate-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>Aucune collection</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', maxWidth: 280, lineHeight: 1.6 }}>Crée ta première liste pour commencer à organiser tes films et séries.</p>
                <div style={{ marginTop: 20, width: 100 }}><BrushStroke color="var(--accent-red)" opacity={0.4} /></div>
              </div>
            ) : (
              <motion.div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 45vw), 1fr))',
                  gap: 20,
                }}
              >
                {collections.map((col, i) => (
                  <motion.div
                    key={col.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    layoutId={`collection-${col.id}`}
                  >
                    <CollectionCard
                      name={col.name}
                      previews={collectionPreviews[col.id] ?? []}
                      totalCount={collectionCounts[col.id] ?? 0}
                      onClick={() => setActiveCollection(col.id)}
                      isOwner={col.owner_id === user?.id}
                      onDelete={() => { if (confirm(`Supprimer "${col.name}" ? Cette action est irréversible.`)) deleteCollection(col.id); }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Bandeau actualités — en dessous des collections, style distinct */}
            <NewsBanner />

          </motion.div>
        )}

        {/* ============================================================
         * VUE COLLECTION — Les DVD
         * ============================================================ */}
        {!isHome && (
          <motion.div key={`col-${activeCollectionId}`}
            initial={{ opacity: 0, y: -30, scale: 1.02 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            {dvdsLoading ? <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>Chargement...</div>
            : safeItems.length === 0 ? (
              <div className="animate-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>{activeCol?.name} est vide</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', maxWidth: 300, lineHeight: 1.6 }}>Ajoute ton premier titre.</p>
                <div style={{ marginTop: 20, width: 100 }}><BrushStroke color="var(--accent-red)" opacity={0.4} /></div>
              </div>
            ) : (<>
              {tab === 'watchlist' && (<section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: 0 }}>À voir <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400, color: 'var(--text-light)' }}>({unwatched.length})</span></h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {unwatched.length > 1 && (
                      <button onClick={() => { const r = unwatched[Math.floor(Math.random() * unwatched.length)]; setDetailId(r.id); }} className="cursor-pointer brush-shape-1"
                        style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, padding: '6px 14px', border: 'none', background: 'var(--accent-gold)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 200ms' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
                        🎲 Film au hasard
                      </button>
                    )}
                    <SortBar sort={sortU} onChange={setSortU} />
                  </div>
                </div>
                {unwatched.length === 0 ? <div className="brush-shape-3" style={{ textAlign: 'center', padding: 40, background: 'var(--bg-white)', fontSize: 14, color: 'var(--text-secondary)' }}>Tout est vu !</div> : <Shelf items={unwatched} onDVDClick={(i) => setDetailId(i.id)} />}
              </section>)}
              {tab === 'watched' && (<section>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, margin: 0 }}>Déjà vus <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 400, color: 'var(--text-light)' }}>({watched.length})</span></h2>
                  <SortBar sort={sortW} onChange={setSortW} />
                </div>
                {watched.length === 0 ? <div className="brush-shape-3" style={{ textAlign: 'center', padding: 40, background: 'var(--bg-white)', fontSize: 14, color: 'var(--text-secondary)' }}>Aucun film vu.</div> : <Shelf items={watched} onDVDClick={(i) => setDetailId(i.id)} />}
              </section>)}
            </>)}
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      {/* Bottom bar mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden" style={{ background: 'var(--bg-header)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border-lighter)', padding: '6px 0 env(safe-area-inset-bottom,6px)', transition: 'background 400ms ease' }}>
        {([
          { id: 'home', l: 'Home', i: '🏠' },
          ...(isHome
            ? [{ id: 'newcol', l: 'Créer', i: '➕' }]
            : [{ id: 'watchlist' as Tab, l: 'À voir', i: '📋' }, { id: 'add', l: 'Ajouter', i: '➕' }, { id: 'watched' as Tab, l: 'Vus', i: '✅' }]),
          { id: 'profile', l: 'Profil', i: '👤' },
        ]).map((t) => (
          <button key={t.id} onClick={() => {
            if (t.id === 'home') clearActiveCollection();
            else if (t.id === 'newcol') setShowNewCol(true);
            else if (t.id === 'add') setAddOpen(true);
            else if (t.id === 'profile') setShowProfile(true);
            else setTab(t.id as Tab);
          }} className="cursor-pointer"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 10, fontWeight: 500, color: (!isHome && (t.id === 'watchlist' || t.id === 'watched') && tab === t.id) ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
            <span style={{ fontSize: 18 }}>{t.i}</span>{t.l}
          </button>))}
      </nav>

      {/* Bouton flottant desktop */}
      {!isHome && (
        <button onClick={() => setAddOpen(true)} className="hidden md:flex fixed bottom-8 right-8 z-40 cursor-pointer items-center justify-center brush-shape-1"
          style={{ width: 56, height: 56, border: 'none', background: 'var(--accent-red)', color: '#fff', fontSize: 24, fontWeight: 300, boxShadow: '0 4px 20px rgba(196,30,58,0.3)', transition: 'all 250ms' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}>+</button>
      )}

      <AddModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
      <DVDDetailModal itemId={detailId} onClose={() => setDetailId(null)} />
      {showProfile && profile && user && <ProfilePage profile={profile} collections={collections} userId={user.id} onUpdateProfile={updateProfile} onUploadAvatar={uploadAvatar} onClose={() => setShowProfile(false)} onSignOut={signOut} />}
      <ShareModal collectionId={shareId} collectionName={collections.find((c) => c.id === shareId)?.name ?? ''} onClose={() => setShareId(null)} />
      {showUserSearch && <UserSearch onClose={() => setShowUserSearch(false)} onSelectUser={(uid) => { setShowUserSearch(false); setPublicUserId(uid); }} />}
      {publicUserId && <PublicProfilePage userId={publicUserId} onClose={() => setPublicUserId(null)} />}
    </div>
  );
}

export default App;
