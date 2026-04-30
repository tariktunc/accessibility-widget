/**
 * SVG icon set used by the widget. All icons are 24x24, `currentColor`,
 * and `aria-hidden` (decorative — labels live on the parent button).
 */
import type { JSX } from 'preact';

type IconProps = JSX.SVGAttributes<SVGSVGElement>;

export function WalkingIcon(props: IconProps): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v8" />
      <path d="M5 9h14" />
      <path d="M9 14l-2 7" />
      <path d="M15 14l2 7" />
    </svg>
  );
}

export function AccessIcon(props: IconProps): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="3" r="2" />
      <path d="M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z" />
    </svg>
  );
}

export function EyeIcon(props: IconProps): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function CloseIcon(props: IconProps): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function CheckIcon(props: IconProps): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 7l3.5 3.5L12 4" />
    </svg>
  );
}

export function BadgeIcon(props: IconProps): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export type IconName = 'walking' | 'access' | 'eye';

export function FabIcon({ name }: { name: IconName }): JSX.Element {
  if (name === 'walking') return <WalkingIcon />;
  if (name === 'eye') return <EyeIcon />;
  return <AccessIcon />;
}
