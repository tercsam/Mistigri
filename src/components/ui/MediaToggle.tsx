import type { MediaType } from '../../types';
export default function MediaToggle({ value, onChange }: { value: MediaType; onChange: (t: MediaType) => void }) {
  return (<div style={{ width: '100%' }}>
    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Type</label>
    <div style={{ display: 'flex', gap: '8px' }}>
      {([{ type: 'movie' as MediaType, label: 'Film' }, { type: 'tv' as MediaType, label: 'Série' }]).map((o) => (
        <button key={o.type} type="button" onClick={() => onChange(o.type)} className="brush-shape-2"
          style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: value === o.type ? 700 : 500, padding: '10px 0', cursor: 'pointer', border: value === o.type ? '2px solid var(--accent-red)' : '2px solid var(--border-light)', background: value === o.type ? 'var(--accent-red)' : 'var(--bg-white)', color: value === o.type ? '#fff' : 'var(--text-secondary)', transition: 'all 200ms' }}>{o.label}</button>
      ))}
    </div>
  </div>);
}
