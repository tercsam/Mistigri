export const TMDB = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZES: { THUMB: 'w185', COVER: 'w342', HD: 'w500' },
  LANGUAGE: 'fr-FR',
  DEBOUNCE_MS: 500,
} as const;

export const SPINE_COLORS = [
  '#c41e3a', '#b8860b', '#2563eb', '#16a34a', '#d97706',
  '#7c3aed', '#dc2626', '#0891b2', '#65a30d', '#be185d',
  '#4f46e5', '#ca8a04',
] as const;

export const DVD_DIMENSIONS = {
  SPINE_WIDTH: 30,
  HEIGHT: 200,
  COVER_WIDTH: 140,
} as const;
