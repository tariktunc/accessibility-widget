// Phase 10 — opsiyonel dev terminal pipe handler.
//
// `<A11yScript devPipe="/api/__blakfy_a11y_log" />` etkinleştirilirse client
// log'lar bu endpoint'e POST edilir; sadece development modunda terminal'e
// yazılır. Production'da silent OK döner (telemetri yok — ADR-005).
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({}, { status: 200 });
  }
  try {
    const body = await req.json();
    // eslint-disable-next-line no-console
    console.log('[blakfy-a11y]', body.level, body.code, body.msg);
  } catch {
    // sessizce başarısız ol — dev pipe non-critical
  }
  return NextResponse.json({ ok: true });
}
