/**
 * One row of preference: title + description (+ optional note) + Switch.
 * Generates a stable id pair so the Switch can reference both
 * via aria-labelledby / aria-describedby.
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
        <p class="toggle-title" id={titleId}>
          {title}
        </p>
        <p class="toggle-desc" id={descId}>
          {description}
        </p>
        {note ? <p class="toggle-note">{note}</p> : null}
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
