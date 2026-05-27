import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', size = 'md', href, onClick, type = 'button', className = '' }) {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
