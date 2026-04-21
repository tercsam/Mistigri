import type { ButtonHTMLAttributes, ReactNode } from 'react';
export default function Button({ children, variant = 'primary', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const v: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--accent-red)', color: '#fff', boxShadow: '0 3px 12px rgba(196,30,58,0.25)' },
    secondary: { background: 'var(--bg-warm)', color: 'var(--text-primary)', border: '2px solid var(--border-light)' },
    ghost: { background: 'transparent', color: 'var(--accent-red)' },
  };
  return <button {...rest} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, padding: '10px 22px', cursor: 'pointer', transition: 'all 200ms', border: 'none', borderRadius: '60% 40% 50% 50%/50% 50% 50% 50%', ...v[variant], ...rest.style }}>{children}</button>;
}
