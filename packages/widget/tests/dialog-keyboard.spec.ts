import { afterEach, describe, expect, it, vi } from 'vitest';
import { h, render } from 'preact';
import { Dialog } from '../src/components/Dialog';

const host = document.createElement('div');
document.body.append(host);
const shadow = host.attachShadow({ mode: 'open' });
const trigger = document.createElement('button');
const container = document.createElement('div');
shadow.append(trigger, container);

afterEach(() => {
  render(null, container);
});

describe('dialog keyboard readiness', () => {
  it('handles Escape immediately after rendering and removes the handler on close', () => {
    const onClose = vi.fn();
    const props = { open: true, onClose, titleId: 'title', descriptionId: 'description' };
    render(h(Dialog, props), container);
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalledTimes(1);

    render(h(Dialog, { ...props, open: false }), container);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('restores the shadow-tree trigger when the dialog unmounts', () => {
    trigger.focus();
    render(
      h(Dialog, { open: true, onClose: vi.fn(), titleId: 'title', descriptionId: 'description' }),
      container,
    );
    const dialog = container.querySelector<HTMLElement>('[role="dialog"]')!;
    dialog.focus();
    expect(shadow.activeElement).toBe(dialog);
    render(null, container);
    expect(shadow.activeElement).toBe(trigger);
  });
});
