/**
 * Top-level widget shell. Composes:
 *  - FabButton (toggle)
 *  - Dialog → Panel
 *  - Listens to EVENT_NAMES.OPEN/CLOSE so window.BlakfyA11y.open() works
 *  - Optional Alt+0 keyboard shortcut
 */
import { useEffect, useId, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import {
  EVENT_NAMES,
  emit,
  on,
  type IconStyle,
  type Theme,
  type Translation,
  type WidgetOptions,
} from '@blakfy/a11y-core';
import { FabButton } from './FabButton';
import { Dialog } from './Dialog';
import { Panel } from './Panel';

type Props = {
  config: WidgetOptions;
  translation: Translation;
  iconStyle?: IconStyle;
  keyboardShortcut?: boolean;
  onThemeChange?: (theme: Theme) => void;
};

export function Widget({
  config,
  translation,
  iconStyle = 'access',
  keyboardShortcut = true,
  onThemeChange,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-desc`;

  // Programmatic open via window.BlakfyA11y.open() → emits EVENT_NAMES.OPEN
  useEffect(() => {
    const offOpen = on(EVENT_NAMES.OPEN, () => setOpen(true));
    const offClose = on(EVENT_NAMES.CLOSE, () => setOpen(false));
    return () => {
      offOpen();
      offClose();
    };
  }, []);

  // Alt+0 keyboard shortcut — toggles panel open/closed
  useEffect(() => {
    if (!keyboardShortcut) return;
    if (typeof window === 'undefined') return;
    const handler = (e: KeyboardEvent): void => {
      if (e.altKey && e.key === '0') {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) {
            emit(EVENT_NAMES.CLOSE, {});
            return false;
          }
          emit(EVENT_NAMES.OPEN, {});
          return true;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [keyboardShortcut]);

  const handleFabClick = (): void => {
    setOpen(true);
    emit(EVENT_NAMES.OPEN, {});
  };

  const handleClose = (): void => {
    setOpen(false);
    emit(EVENT_NAMES.CLOSE, {});
  };

  return (
    <>
      <FabButton
        iconStyle={iconStyle}
        ariaLabel={translation.fab.label}
        isOpen={open}
        onClick={handleFabClick}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        titleId={titleId}
        descriptionId={descriptionId}
      >
        <Panel
          translation={translation}
          locale={config.locale}
          currentTheme={config.theme}
          onClose={handleClose}
          onThemeChange={onThemeChange ?? (() => undefined)}
          titleId={titleId}
          descriptionId={descriptionId}
        />
      </Dialog>
    </>
  );
}
