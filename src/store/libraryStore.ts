import { create } from 'zustand';
import { supabase } from '../services/supabase';
import type { DVDItem, MediaType } from '../types';
import { getRandomSpineColor } from '../utils/colors';

export interface Collection { id: string; owner_id: string; name: string; is_public: boolean; created_at: string; }
export interface Collaborator { collection_id: string; user_id: string; role: 'viewer' | 'editor'; username?: string; display_name?: string; avatar_url?: string; }

interface LibraryStore {
  collections: Collection[];
  collectionPreviews: Record<string, DVDItem[]>;
  collectionCounts: Record<string, number>;
  dvdsCache: Record<string, DVDItem[]>;
  activeCollectionId: string | null;
  items: DVDItem[];
  collectionsLoading: boolean;
  dvdsLoading: boolean;

  fetchCollections: (userId: string) => Promise<void>;
  fetchPreviews: () => Promise<void>;
  fetchAllDVDsForUser: (userId: string) => Promise<DVDItem[]>;
  createCollection: (userId: string, name: string) => Promise<string | null>;
  renameCollection: (collectionId: string, name: string) => Promise<void>;
  deleteCollection: (collectionId: string) => Promise<void>;
  setActiveCollection: (collectionId: string) => void;
  clearActiveCollection: () => void;

  fetchDVDs: (collectionId: string) => Promise<void>;
  addItem: (item: Omit<DVDItem, 'id' | 'addedAt'> & { spineColor?: string }) => Promise<boolean>;
  removeItem: (id: string) => Promise<void>;
  hasItem: (tmdbId: number, mediaType: MediaType) => boolean;
  markAsWatched: (id: string, rating?: number, comment?: string) => Promise<void>;
  unmarkAsWatched: (id: string) => Promise<void>;
  updateItem: (id: string, updates: Partial<Omit<DVDItem, 'id'>>) => Promise<void>;
  reorderItems: (activeId: string, overId: string) => Promise<void>;

  fetchCollaborators: (collectionId: string) => Promise<Collaborator[]>;
  addCollaborator: (collectionId: string, username: string, role: 'viewer' | 'editor') => Promise<{ error: string | null }>;
  removeCollaborator: (collectionId: string, userId: string) => Promise<void>;
  updateCollaboratorRole: (collectionId: string, userId: string, role: 'viewer' | 'editor') => Promise<void>;
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

export const useLibraryStore = create<LibraryStore>()((set, get) => {
  // Synchro le cache après chaque mutation d'items
  const syncCache = () => {
    const cid = get().activeCollectionId;
    if (cid) set((s) => ({ dvdsCache: { ...s.dvdsCache, [cid]: s.items } }));
  };

  return {
  collections: [], collectionPreviews: {}, collectionCounts: {}, dvdsCache: {}, activeCollectionId: null, items: [], collectionsLoading: false, dvdsLoading: false,

  fetchCollections: async (userId) => {
    console.log('[STORE] fetchCollections called, userId:', userId);
    set({ collectionsLoading: true });

    const { data: owned, error: e1 } = await supabase.from('collections').select('*').eq('owner_id', userId).order('created_at');
    console.log('[STORE] owned collections:', owned, 'error:', e1);

    const { data: shared, error: e2 } = await supabase.from('collaborators').select('collection_id').eq('user_id', userId);
    console.log('[STORE] shared collabs:', shared, 'error:', e2);

    let sharedCols: Collection[] = [];
    if (shared && shared.length > 0) {
      const ids = shared.map((s) => s.collection_id);
      const { data, error: e3 } = await supabase.from('collections').select('*').in('id', ids);
      console.log('[STORE] shared collections:', data, 'error:', e3);
      sharedCols = (data ?? []) as Collection[];
    }

    const all = [...(owned ?? []), ...sharedCols] as Collection[];
    console.log('[STORE] total collections:', all.length);
    set({ collections: all, collectionsLoading: false });
    await get().fetchPreviews();
  },

  fetchPreviews: async () => {
    const collections = get().collections;
    console.log('[STORE] fetchPreviews for', collections.length, 'collections');
    const previews: Record<string, DVDItem[]> = {};
    const counts: Record<string, number> = {};
    await Promise.all(collections.map(async (col) => {
      // Previews (4 premiers pour les posters)
      const { data, error } = await supabase.from('dvds').select('*').eq('collection_id', col.id).order('position').limit(4);
      console.log('[STORE] previews for', col.name, ':', data?.length ?? 0, 'error:', error);
      previews[col.id] = (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
      // Count total (requête séparée, rapide)
      const { count, error: e2 } = await supabase.from('dvds').select('*', { count: 'exact', head: true }).eq('collection_id', col.id);
      counts[col.id] = count ?? 0;
      if (e2) console.error('[STORE] count error for', col.name, e2);
    }));
    set({ collectionPreviews: previews, collectionCounts: counts });
  },

  fetchAllDVDsForUser: async (userId) => {
    console.log('[STORE] fetchAllDVDsForUser', userId);
    const { data: cols, error: e1 } = await supabase.from('collections').select('id').eq('owner_id', userId);
    console.log('[STORE] user collections for stats:', cols, 'error:', e1);
    if (!cols || cols.length === 0) return [];
    const ids = cols.map((c) => c.id);
    const { data, error: e2 } = await supabase.from('dvds').select('*').in('collection_id', ids);
    console.log('[STORE] all DVDs for stats:', data?.length ?? 0, 'error:', e2);
    return (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
  },

  clearActiveCollection: () => set({ activeCollectionId: null, items: [] }),

  createCollection: async (userId, name) => {
    console.log('[STORE] createCollection called', { userId, name });
    const { data, error } = await supabase.from('collections').insert({ owner_id: userId, name }).select().single();
    console.log('[STORE] createCollection result:', data, 'error:', error);
    if (error || !data) {
      console.error('[STORE] createCollection FAILED:', error);
      return null;
    }
    const col = data as Collection;
    set((s) => ({ collections: [...s.collections, col] }));
    return col.id;
  },

  renameCollection: async (id, name) => {
    console.log('[STORE] renameCollection called', { id, name });
    // Mise à jour optimiste locale d'abord
    set((s) => ({ collections: s.collections.map((c) => c.id === id ? { ...c, name } : c) }));
    // Puis sauvegarde Supabase
    const { error } = await supabase.from('collections').update({ name }).eq('id', id);
    console.log('[STORE] renameCollection result:', error ? `ERROR: ${error.message}` : 'OK');
    if (error) console.error('[STORE] renameCollection failed:', error);
  },

  deleteCollection: async (id) => {
    console.log('[STORE] deleteCollection', id);
    const { error } = await supabase.from('collections').delete().eq('id', id);
    console.log('[STORE] deleteCollection result:', error);
    const remaining = get().collections.filter((c) => c.id !== id);
    set({ collections: remaining, activeCollectionId: get().activeCollectionId === id ? null : get().activeCollectionId, items: get().activeCollectionId === id ? [] : get().items });
    await get().fetchPreviews();
  },

  setActiveCollection: (id) => {
    console.log('[STORE] setActiveCollection', id);
    const cached = get().dvdsCache[id];
    if (cached) {
      // Déjà en cache — pas de chargement, affichage immédiat
      console.log('[STORE] using cached DVDs for', id, cached.length, 'items');
      set({ activeCollectionId: id, items: cached });
    } else {
      // Pas en cache — fetch
      set({ activeCollectionId: id, items: [] });
      get().fetchDVDs(id);
    }
  },

  fetchDVDs: async (collectionId) => {
    console.log('[STORE] fetchDVDs', collectionId);
    set({ dvdsLoading: true });
    const { data, error } = await supabase.from('dvds').select('*').eq('collection_id', collectionId).order('position');
    console.log('[STORE] fetchDVDs result:', data?.length ?? 0, 'items, error:', error);
    const items = (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
    set((s) => ({
      items,
      dvdsLoading: false,
      dvdsCache: { ...s.dvdsCache, [collectionId]: items },
    }));
  },

  addItem: async (item) => {
    const cid = get().activeCollectionId;
    console.log('[STORE] addItem', { cid, title: item.title });
    if (!cid) { console.error('[STORE] addItem: no activeCollectionId!'); return false; }
    if (get().items.some((i) => i.tmdbId === item.tmdbId && i.mediaType === item.mediaType)) return false;
    const pos = get().items.length;
    const sc = item.spineColor || getRandomSpineColor();
    const { data, error } = await supabase.from('dvds').insert({ collection_id: cid, tmdb_id: item.tmdbId, media_type: item.mediaType, title: item.title, poster_url: item.posterUrl, spine_color: sc, year: item.year ?? null, watched: false, position: pos }).select().single();
    console.log('[STORE] addItem result:', data, 'error:', error);
    if (error) return false;
    if (data) { set((s) => ({ items: [...s.items, mapRow(data as Record<string, unknown>)] })); syncCache(); }
    return true;
  },

  removeItem: async (id) => {
    const prev = get().items;
    set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
    syncCache();
    const { error } = await supabase.from('dvds').delete().eq('id', id);
    if (error) { set({ items: prev }); syncCache(); }
  },

  hasItem: (tmdbId, mediaType) => get().items.some((i) => i.tmdbId === tmdbId && i.mediaType === mediaType),

  markAsWatched: async (id, rating, comment) => {
    const now = new Date().toISOString();
    set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, watched: true, rating: rating ?? i.rating, comment: comment ?? i.comment, watchedAt: now } : i) }));
    syncCache();
    await supabase.from('dvds').update({ watched: true, rating: rating ?? null, comment: comment ?? null, watched_at: now }).eq('id', id);
  },

  unmarkAsWatched: async (id) => {
    set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, watched: false, rating: undefined, comment: undefined, watchedAt: undefined } : i) }));
    syncCache();
    await supabase.from('dvds').update({ watched: false, rating: null, comment: null, watched_at: null }).eq('id', id);
  },

  updateItem: async (id, updates) => {
    set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, ...updates } : i) }));
    syncCache();
    const db: Record<string, unknown> = {};
    if (updates.watched !== undefined) db.watched = updates.watched;
    if (updates.rating !== undefined) db.rating = updates.rating ?? null;
    if (updates.comment !== undefined) db.comment = updates.comment ?? null;
    if (updates.watchedAt !== undefined) db.watched_at = updates.watchedAt ?? null;
    if (Object.keys(db).length > 0) await supabase.from('dvds').update(db).eq('id', id);
  },

  reorderItems: async (activeId, overId) => {
    const items = [...get().items];
    const oi = items.findIndex((i) => i.id === activeId), ni = items.findIndex((i) => i.id === overId);
    if (oi === -1 || ni === -1) return;
    const [m] = items.splice(oi, 1); items.splice(ni, 0, m);
    set({ items });
    await Promise.all(items.map((item, idx) => supabase.from('dvds').update({ position: idx }).eq('id', item.id)));
  },

  fetchCollaborators: async (cid) => {
    const { data, error } = await supabase.from('collaborators').select('collection_id, user_id, role, profiles:user_id (username, display_name, avatar_url)').eq('collection_id', cid);
    console.log('[STORE] fetchCollaborators:', data, 'error:', error);
    if (!data) return [];
    return data.map((row: Record<string, unknown>) => {
      const p = row.profiles as Record<string, unknown> | null;
      return { collection_id: row.collection_id as string, user_id: row.user_id as string, role: row.role as 'viewer' | 'editor', username: p?.username as string | undefined, display_name: p?.display_name as string | undefined, avatar_url: p?.avatar_url as string | undefined };
    });
  },

  addCollaborator: async (cid, username, role) => {
    console.log('[STORE] addCollaborator', { cid, username, role });
    const { data: profile, error: e1 } = await supabase.from('profiles').select('id').eq('username', username).single();
    console.log('[STORE] found profile:', profile, 'error:', e1);
    if (!profile) return { error: 'Utilisateur introuvable' };
    const { error } = await supabase.from('collaborators').insert({ collection_id: cid, user_id: (profile as { id: string }).id, role });
    console.log('[STORE] addCollaborator insert error:', error);
    if (error) return { error: error.code === '23505' ? 'Déjà ajouté' : error.message };
    return { error: null };
  },

  removeCollaborator: async (cid, uid) => { await supabase.from('collaborators').delete().eq('collection_id', cid).eq('user_id', uid); },
  updateCollaboratorRole: async (cid, uid, role) => { await supabase.from('collaborators').update({ role }).eq('collection_id', cid).eq('user_id', uid); },
}; });
