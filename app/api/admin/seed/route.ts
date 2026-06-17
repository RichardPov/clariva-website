import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createPosition, deleteAllPositions } from '@/lib/db/positions'
import type { NewPosition } from '@/lib/db/schema'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'

const bullets = (n: number) =>
  Array.from({ length: n }, (_, i) =>
    [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      'Sed do eiusmod tempor incididunt ut labore et dolore',
      'Ut enim ad minim veniam, quis nostrud exercitation',
      'Duis aute irure dolor in reprehenderit in voluptate',
      'Excepteur sint occaecat cupidatat non proident',
    ][i % 5]
  )

// 3 realistic positions with placeholder (lorem) body text, marked as filled so
// they render subtly disabled on the site. Toggle "Position filled" in the form.
const SAMPLES: NewPosition[] = [
  {
    slug: '',
    status: 'published',
    filled: true,
    title: 'Frontend Engineer (React)',
    summary: LOREM.slice(0, 120),
    typeOfJobOffer: 'Web Development',
    country: 'Slovakia',
    placeOfWork: 'Remote',
    typeOfCooperation: 'B2B',
    languageSkills: ['English', 'Slovak'],
    city: 'Bratislava',
    reward: 'From 3500€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Medior',
    startDate: 'ASAP',
    responsibilities: { mode: 'bullets', items: bullets(4) },
    requirements: { mode: 'bullets', items: bullets(4) },
    languageRequirements: { mode: 'text', text: 'Lorem ipsum — English at B2 level.' },
    benefits: { mode: 'bullets', items: bullets(3) },
  },
  {
    slug: '',
    status: 'published',
    filled: true,
    title: 'Backend Engineer (.NET)',
    summary: LOREM.slice(0, 120),
    typeOfJobOffer: 'Software Development',
    country: 'Slovakia',
    placeOfWork: 'Hybrid',
    typeOfCooperation: 'Employment',
    languageSkills: ['English'],
    city: 'Košice',
    reward: 'From 4000€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Senior',
    startDate: 'By agreement',
    responsibilities: { mode: 'bullets', items: bullets(4) },
    requirements: { mode: 'bullets', items: bullets(4) },
    languageRequirements: { mode: 'text', text: 'Lorem ipsum — English at B2 level.' },
    benefits: { mode: 'bullets', items: bullets(3) },
  },
  {
    slug: '',
    status: 'published',
    filled: true,
    title: 'DevOps Engineer',
    summary: LOREM.slice(0, 120),
    typeOfJobOffer: 'Software Development',
    country: 'Remote / EU',
    placeOfWork: 'On-Site',
    typeOfCooperation: 'B2B',
    languageSkills: ['English', 'German'],
    city: 'Bratislava',
    reward: 'From 4500€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Senior',
    startDate: 'ASAP',
    responsibilities: { mode: 'bullets', items: bullets(4) },
    requirements: { mode: 'bullets', items: bullets(4) },
    languageRequirements: { mode: 'text', text: LOREM.slice(0, 90) },
    benefits: { mode: 'bullets', items: bullets(3) },
  },
]

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Reset: replace whatever is there with the sample set.
  await deleteAllPositions()
  for (const sample of SAMPLES) {
    await createPosition(sample)
  }

  return NextResponse.json({ ok: true, created: SAMPLES.length })
}
