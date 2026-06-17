import { NextResponse } from 'next/server'
import { sendNotification, rows } from '@/lib/email'

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = str(body.name)
  const email = str(body.email)
  const company = str(body.company)
  const service = str(body.service)
  const message = str(body.message)

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    )
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif">
      <h2 style="font-size:18px;color:#111;margin:0 0 12px">New contact enquiry</h2>
      <table style="border-collapse:collapse">
        ${rows([
          ['Name', name],
          ['Company', company],
          ['Email', email],
          ['Service', service],
          ['Message', message],
        ])}
      </table>
    </div>`

  const result = await sendNotification({
    subject: `New contact enquiry — ${name}`,
    html,
    replyTo: email,
  })

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'Failed to send' },
      { status: 500 }
    )
  }
  return NextResponse.json({ ok: true })
}
