import { Resend } from 'resend'

// FROM must be on a domain verified in Resend (clariva.sk). For quick testing
// without a verified domain, set EMAIL_FROM=onboarding@resend.dev in env.
const FROM = process.env.EMAIL_FROM || 'Clariva <info@clariva.sk>'
const TO = process.env.EMAIL_TO || 'info@clariva.sk'

type SendArgs = {
  subject: string
  html: string
  replyTo?: string
}

export async function sendNotification({
  subject,
  html,
  replyTo,
}: SendArgs): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set — skipping email send.')
    return { ok: false, error: 'Email not configured' }
  }
  try {
    const resend = new Resend(key)
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: (err as Error).message }
  }
}

/** Minimal HTML escaping for user-provided values. */
export function esc(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Simple label/value rows for notification emails. */
export function rows(pairs: Array<[string, string]>): string {
  return pairs
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#888;font-size:13px;vertical-align:top">${esc(
          label
        )}</td><td style="padding:6px 0;color:#111;font-size:14px">${esc(
          value
        )}</td></tr>`
    )
    .join('')
}
