/**
 * ARIA APG Switch primitive.
 * https://www.w3.org/WAI/ARIA/apg/patterns/switch/
 *
 * - role="switch" + aria-checked
 * - Space and Enter toggle
 * - Click toggles
 * - Visual thumb is animated via CSS based on aria-checked
 */
import type { JSX } from 'preact';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  ariaLabel: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  disabled?: boolean;
};

export function Switch({
  checked,
  onChange,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  disabled = false,
}: Props): JSX.Element {
  const handleClick = (): void => {
    if (disabled) return;
    onChange(!checked);
  };

  const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLButtonElement>): void => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      class="switch"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabelledBy ? undefined : ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span class="switch-thumb" aria-hidden="true" />
    </button>
  );
}
