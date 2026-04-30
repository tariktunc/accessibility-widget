/**
 * Locked brand badge. STABLE-API.md §9: URL, text, position are all
 * non-customizable. Position flips via logical CSS properties (RTL aware).
 */
import type { JSX } from 'preact';
import { BadgeIcon } from './Icons';

const BADGE_URL = 'https://blakfy.com';

export function FloatingBadge(): JSX.Element {
  return (
    <a
      class="badge"
      href={BADGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by Blakfy Studio — opens blakfy.com in a new tab"
    >
      <BadgeIcon />
      <span>
        Powered by <strong>Blakfy Studio</strong>
      </span>
    </a>
  );
}
