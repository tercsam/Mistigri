export type MediaType = 'movie' | 'tv';
export type FilterType = 'all' | 'movie' | 'tv' | 'watched' | 'unwatched';
export type SortType = 'addedAt' | 'rating' | 'title';

export interface DVDItem {
  id: string;
  title: string;
  mediaType: MediaType;
  posterUrl: string;
  tmdbId: number;
  spineColor: string;
  addedAt: string;
  year?: string;
  watched?: boolean;
  rating?: number;
  comment?: string;
  watchedAt?: string;
}

export interface TMDBSearchResult {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  overview: string;
  mediaType: MediaType;
}
