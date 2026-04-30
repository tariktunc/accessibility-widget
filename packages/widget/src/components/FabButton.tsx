/**
 * Floating Action Button. Native <button> for keyboard accessibility.
 * Position is controlled by `:host([data-position="..."]) .fab` in CSS.
 */
import type { JSX } from 'preact';
import { FabIcon, type IconName } from './Icons';

type Props = {
  iconStyle: IconName;
  ariaLabel: string;
  isOpen: boolean;
  onClick: () => void;
};

export function FabButton({ iconStyle, ariaLabel, isOpen, onClick }: Props): JSX.Element {
  return (
    <button
      type="button"
      class="fab"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={onClick}
    >
      <FabIcon name={iconStyle} />
    </button>
  );
}
