import type { MediaType, TMDBSearchResult } from '../types';
import { TMDB } from '../utils/constants';

interface TMDBMovieRaw { id: number; title: string; poster_path: string | null; release_date: string; overview: string; }
interface TMDBTvRaw { id: number; name: string; poster_path: string | null; first_air_date: string; overview: string; }
interface TMDBSearchResponse<T> { page: number; results: T[]; total_pages: number; total_results: number; }

function getApiKey(): string {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) throw new Error('[TMDB] Clé API manquante dans .env: VITE_TMDB_API_KEY=xxx');
  return key;
}

export function getPosterUrl(posterPath: string | null, size: string = TMDB.POSTER_SIZES.COVER): string {
  if (!posterPath) return '';
  return `${TMDB.IMAGE_BASE_URL}/${size}${posterPath}`;
}

export async function searchTMDB(query: string, mediaType: MediaType): Promise<TMDBSearchResult[]> {
  if (query.trim().length < 2) return [];
  const apiKey = getApiKey();
  const endpoint = mediaType === 'movie' ? 'search/movie' : 'search/tv';
  const params = new URLSearchParams({ api_key: apiKey, query: query.trim(), language: TMDB.LANGUAGE, page: '1' });
  try {
    const response = await fetch(`${TMDB.BASE_URL}/${endpoint}?${params}`);
    if (!response.ok) return [];
    if (mediaType === 'movie') {
      const data: TMDBSearchResponse<TMDBMovieRaw> = await response.json();
      return data.results.map((m) => ({ id: m.id, title: m.title, posterPath: m.poster_path, releaseDate: m.release_date ?? '', overview: m.overview, mediaType: 'movie' as const }));
    } else {
      const data: TMDBSearchResponse<TMDBTvRaw> = await response.json();
      return data.results.map((s) => ({ id: s.id, title: s.name, posterPath: s.poster_path, releaseDate: s.first_air_date ?? '', overview: s.overview, mediaType: 'tv' as const }));
    }
  } catch { return []; }
}

export interface WatchProvider {
  provider_name: string;
  provider_id: number;
  logo_path: string;
}

export interface TMDBDetails {
  id: number; title: string; overview: string; genres: string[];
  runtime: number | null; voteAverage: number;
  cast: { name: string; character: string }[];
  director: string | null;
  watchProviders: WatchProvider[];
  watchLink: string | null;
}

export async function getDetails(tmdbId: number, mediaType: MediaType): Promise<TMDBDetails | null> {
  const apiKey = getApiKey();
  const endpoint = mediaType === 'movie' ? `movie/${tmdbId}` : `tv/${tmdbId}`;
  const params = new URLSearchParams({ api_key: apiKey, language: TMDB.LANGUAGE, append_to_response: 'credits,watch/providers' });
  try {
    const response = await fetch(`${TMDB.BASE_URL}/${endpoint}?${params}`);
    if (!response.ok) return null;
    const data = await response.json();

    // Extraire les providers pour la France (FR)
    const wpFR = data['watch/providers']?.results?.FR;
    const flatrate: WatchProvider[] = (wpFR?.flatrate ?? []).map((p: Record<string, unknown>) => ({
      provider_name: p.provider_name as string,
      provider_id: p.provider_id as number,
      logo_path: p.logo_path as string,
    }));
    const watchLink: string | null = wpFR?.link ?? null;

    if (mediaType === 'movie') {
      return {
        id: data.id, title: data.title, overview: data.overview,
        genres: (data.genres ?? []).map((g: { name: string }) => g.name),
        runtime: data.runtime, voteAverage: data.vote_average,
        cast: (data.credits?.cast ?? []).slice(0, 5).map((c: { name: string; character: string }) => ({ name: c.name, character: c.character })),
        director: data.credits?.crew?.find((c: { job: string }) => c.job === 'Director')?.name ?? null,
        watchProviders: flatrate, watchLink,
      };
    } else {
      return {
        id: data.id, title: data.name, overview: data.overview,
        genres: (data.genres ?? []).map((g: { name: string }) => g.name),
        runtime: data.episode_run_time?.[0] ?? null, voteAverage: data.vote_average,
        cast: (data.credits?.cast ?? []).slice(0, 5).map((c: { name: string; character: string }) => ({ name: c.name, character: c.character })),
        director: data.created_by?.[0]?.name ?? null,
        watchProviders: flatrate, watchLink,
      };
    }
  } catch { return null; }
}

export async function getSimilar(tmdbId: number, mediaType: MediaType): Promise<TMDBSearchResult[]> {
  const apiKey = getApiKey();
  const endpoint = mediaType === 'movie' ? `movie/${tmdbId}/recommendations` : `tv/${tmdbId}/recommendations`;
  const params = new URLSearchParams({ api_key: apiKey, language: TMDB.LANGUAGE, page: '1' });
  try {
    const response = await fetch(`${TMDB.BASE_URL}/${endpoint}?${params}`);
    if (!response.ok) return [];
    if (mediaType === 'movie') {
      const data: TMDBSearchResponse<TMDBMovieRaw> = await response.json();
      return data.results.slice(0, 6).map((m) => ({ id: m.id, title: m.title, posterPath: m.poster_path, releaseDate: m.release_date ?? '', overview: m.overview, mediaType: 'movie' as const }));
    } else {
      const data: TMDBSearchResponse<TMDBTvRaw> = await response.json();
      return data.results.slice(0, 6).map((s) => ({ id: s.id, title: s.name, posterPath: s.poster_path, releaseDate: s.first_air_date ?? '', overview: s.overview, mediaType: 'tv' as const }));
    }
  } catch { return []; }
}

/** Trending — films et séries du moment (cette semaine) */
export async function getTrending(): Promise<TMDBSearchResult[]> {
  const apiKey = getApiKey();
  const params = new URLSearchParams({ api_key: apiKey, language: TMDB.LANGUAGE });
  try {
    const response = await fetch(`${TMDB.BASE_URL}/trending/all/week?${params}`);
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results ?? []).slice(0, 20).map((r: Record<string, unknown>) => ({
      id: r.id as number,
      title: (r.title ?? r.name ?? '') as string,
      posterPath: r.poster_path as string | null,
      releaseDate: (r.release_date ?? r.first_air_date ?? '') as string,
      overview: (r.overview ?? '') as string,
      mediaType: (r.media_type === 'tv' ? 'tv' : 'movie') as MediaType,
    }));
  } catch { return []; }
}

/** Prochaines sorties cinéma */
export async function getUpcoming(): Promise<TMDBSearchResult[]> {
  const apiKey = getApiKey();
  const params = new URLSearchParams({ api_key: apiKey, language: TMDB.LANGUAGE, region: 'FR', page: '1' });
  try {
    const response = await fetch(`${TMDB.BASE_URL}/movie/upcoming?${params}`);
    if (!response.ok) return [];
    const data: TMDBSearchResponse<TMDBMovieRaw> = await response.json();
    return data.results.slice(0, 20).map((m) => ({
      id: m.id, title: m.title, posterPath: m.poster_path,
      releaseDate: m.release_date ?? '', overview: m.overview,
      mediaType: 'movie' as const,
    }));
  } catch { return []; }
}

/** Films actuellement au cinéma */
export async function getNowPlaying(): Promise<TMDBSearchResult[]> {
  const apiKey = getApiKey();
  const params = new URLSearchParams({ api_key: apiKey, language: TMDB.LANGUAGE, region: 'FR', page: '1' });
  try {
    const response = await fetch(`${TMDB.BASE_URL}/movie/now_playing?${params}`);
    if (!response.ok) return [];
    const data: TMDBSearchResponse<TMDBMovieRaw> = await response.json();
    return data.results.slice(0, 20).map((m) => ({
      id: m.id, title: m.title, posterPath: m.poster_path,
      releaseDate: m.release_date ?? '', overview: m.overview,
      mediaType: 'movie' as const,
    }));
  } catch { return []; }
}

/**
 * Retourne l'URL de recherche directe vers la plateforme de streaming.
 * Chaque plateforme a son propre format d'URL de recherche.
 */
export function getProviderUrl(providerName: string, providerId: number, title: string, fallbackLink: string | null): string {
  const q = encodeURIComponent(title);
  const map: Record<number, string> = {
    8:    `https://www.netflix.com/search?q=${q}`,
    1796: `https://www.netflix.com/search?q=${q}`,
    337:  `https://www.disneyplus.com/fr-fr/search?q=${q}`,
    119:  `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${q}`,
    10:   `https://www.amazon.fr/s?k=${q}&i=instant-video`,
    350:  `https://tv.apple.com/fr/search?term=${q}`,
    2:    `https://tv.apple.com/fr/search?term=${q}`,
    381:  `https://www.canalplus.com/recherche/${q}`,
    236:  `https://www.paramountplus.com/fr/search/?q=${q}`,
    531:  `https://www.paramountplus.com/fr/search/?q=${q}`,
    1899: `https://www.max.com/fr/fr/search?q=${q}`,
    56:   `https://www.ocs.fr/recherche?q=${q}`,
    283:  `https://www.crunchyroll.com/fr/search?q=${q}`,
    386:  `https://tv.peacocktv.com/search?q=${q}`,
    3:    `https://play.google.com/store/search?q=${q}&c=movies`,
    192:  `https://www.youtube.com/results?search_query=${q}+film`,
  };
  if (map[providerId]) return map[providerId];
  if (fallbackLink) return fallbackLink;
  return `https://www.google.com/search?q=${q}+streaming`;
}
