import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { listSubmissions } from '@/lib/db/positions'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await listSubmissions()
  return NextResponse.json(rows)
}
