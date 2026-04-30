/**
 * One row of preference: title + info-tooltip button + Switch.
 * Description is hidden behind the "i" button — shown on hover/focus.
 */
import { useId } from 'preact/hooks';
import type { JSX } from 'preact';
import { Switch } from './Switch';

type Props = {
  title: string;
  description: string;
  note?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

export function Toggle({ title, description, note, checked, onChange }: Props): JSX.Element {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

  return (
    <div class="toggle-row">
      <div class="toggle-text">
        <div class="toggle-title-row">
          <p class="toggle-title" id={titleId}>{title}</p>
          <span class="info-wrap">
            <button
              type="button"
              class="info-btn"
              tabIndex={0}
              aria-label={title + ' hakkında bilgi'}
            >
              i
            </button>
            <span class="info-tooltip" id={descId} role="tooltip">
              {description}
              {note ? <em class="info-tooltip-note">{note}</em> : null}
            </span>
          </span>
        </div>
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        ariaLabel={title}
        ariaLabelledBy={titleId}
        ariaDescribedBy={descId}
      />
    </div>
  );
}
