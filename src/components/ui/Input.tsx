import { forwardRef, type InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; }
const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, ...rest }, ref) {
  return (<div style={{ width: '100%' }}>
    {label && <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</label>}
    <input ref={ref} {...rest} style={{ width: '100%', fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-primary)', backgroundColor: 'var(--bg-warm)', border: '2px solid var(--border-light)', borderRadius: '30% 70% 70% 30%/60% 40% 60% 40%', padding: '12px 18px', outline: 'none', caretColor: 'var(--accent-red)', transition: 'border-color 200ms,box-shadow 200ms', ...rest.style }}
      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-red)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-red-light)'; rest.onFocus?.(e); }}
      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.boxShadow = 'none'; rest.onBlur?.(e); }} />
  </div>);
});
export default Input;
