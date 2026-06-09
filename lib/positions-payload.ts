import type { NewPosition, Section } from '@/lib/db/schema'

function normalizeSection(input: unknown): Section {
  if (input && typeof input === 'object') {
    const s = input as Partial<Section>
    if (s.mode === 'text') {
      return { mode: 'text', text: typeof s.text === 'string' ? s.text : '' }
    }
    if (s.mode === 'bullets') {
      const items = Array.isArray(s.items)
        ? s.items.map(String).map((x) => x.trim()).filter(Boolean)
        : []
      return { mode: 'bullets', items }
    }
  }
  return { mode: 'bullets', items: [] }
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

/** Coerce an untrusted JSON body into a position insert payload. */
export function normalizePositionPayload(body: Record<string, unknown>): NewPosition {
  const status = body.status === 'published' ? 'published' : 'draft'
  const languageSkills = Array.isArray(body.languageSkills)
    ? (body.languageSkills as unknown[]).map(String).map((x) => x.trim()).filter(Boolean)
    : []

  return {
    // slug is assigned in the data layer
    slug: '',
    status,
    title: str(body.title) || 'Untitled position',
    summary: str(body.summary),
    typeOfJobOffer: str(body.typeOfJobOffer),
    country: str(body.country),
    placeOfWork: str(body.placeOfWork),
    typeOfCooperation: str(body.typeOfCooperation),
    languageSkills,
    city: str(body.city),
    reward: str(body.reward),
    allocationDuration: str(body.allocationDuration),
    seniority: str(body.seniority),
    startDate: str(body.startDate),
    responsibilities: normalizeSection(body.responsibilities),
    requirements: normalizeSection(body.requirements),
    languageRequirements: normalizeSection(body.languageRequirements),
    benefits: normalizeSection(body.benefits),
  }
}
