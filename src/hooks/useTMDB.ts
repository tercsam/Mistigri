import { useState, useEffect, useRef, useCallback } from 'react';
import type { MediaType, TMDBSearchResult } from '../types';
import { searchTMDB } from '../services/tmdb';
import { TMDB } from '../utils/constants';

export function useTMDB(query: string, mediaType: MediaType) {
  const [results, setResults] = useState<TMDBSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string, type: MediaType) => {
    if (q.trim().length < 2) { setResults([]); return; }
    setIsLoading(true); setError(null);
    try { setResults(await searchTMDB(q, type)); }
    catch (err) { setError(err instanceof Error ? err.message : 'Erreur'); setResults([]); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    let current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (query.trim().length < 2) { setResults([]); setError(null); setIsLoading(false); return; }
    setIsLoading(true);
    timerRef.current = setTimeout(async () => {
      try { const data = await searchTMDB(query, mediaType); if (current) { setResults(data); setError(null); } }
      catch (err) { if (current) { setError(err instanceof Error ? err.message : 'Erreur'); setResults([]); } }
      finally { if (current) setIsLoading(false); }
    }, TMDB.DEBOUNCE_MS);
    return () => { current = false; if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, mediaType]);

  return { results, isLoading, error, search };
}
