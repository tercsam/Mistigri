import type { TMDBSearchResult } from '../../types';
import { getPosterUrl } from '../../services/tmdb';
import { TMDB } from '../../utils/constants';

export default function SearchResult({ result, onSelect, alreadyInCollection = false }: { result: TMDBSearchResult; onSelect: (r: TMDBSearchResult) => void; alreadyInCollection?: boolean }) {
  const year = result.releaseDate ? result.releaseDate.split('-')[0] : '';
  return (
    <button type="button" onClick={() => !alreadyInCollection && onSelect(result)} disabled={alreadyInCollection}
      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', borderRadius: 12, cursor: alreadyInCollection ? 'default' : 'pointer', textAlign: 'left', transition: 'all 200ms', opacity: alreadyInCollection ? 0.4 : 1 }}
      onMouseEnter={(e) => { if (!alreadyInCollection) e.currentTarget.style.background = 'var(--accent-red-light)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
      <div style={{ width: 44, height: 63, flexShrink: 0, borderRadius: 6, overflow: 'hidden', background: 'var(--bg-warm)' }}>
        {result.posterPath ? <img src={getPosterUrl(result.posterPath, TMDB.POSTER_SIZES.THUMB)} alt={result.title} loading="lazy" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--text-light)' }}>🎬</div>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {result.title}{year && <span style={{ fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 6, fontSize: 12 }}>({year})</span>}
        </div>
        {result.overview && <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-light)', marginTop: 2, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{result.overview}</div>}
      </div>
      <div style={{ flexShrink: 0, fontSize: alreadyInCollection ? 12 : 20, fontWeight: 300, color: alreadyInCollection ? 'var(--color-success)' : 'var(--accent-red)' }}>{alreadyInCollection ? '✓' : '+'}</div>
    </button>
  );
}
