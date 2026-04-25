'use client';

type Props = {
  url?: string;
  className?: string;
};

const DEFAULT_URL = 'https://blakfy.com';

export function BlakfyBadge({ url = DEFAULT_URL, className = '' }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by Blakfy"
      className={`inline-flex items-center gap-1 text-[clamp(9px,1.5vw,11px)] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100 transition-colors ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span>Powered by <strong className="font-bold">Blakfy</strong></span>
    </a>
  );
}
