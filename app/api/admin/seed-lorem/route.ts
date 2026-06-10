import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createPosition } from '@/lib/db/positions'
import type { NewPosition } from '@/lib/db/schema'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

const SAMPLES: NewPosition[] = [
  {
    slug: '',
    status: 'published',
    filled: false,
    title: 'Frontend Developer (React)',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.',
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
    responsibilities: {
      mode: 'bullets',
      items: [
        'Lorem ipsum dolor sit amet consectetur',
        'Adipiscing elit sed do eiusmod tempor',
        'Incididunt ut labore et dolore magna',
        'Ut enim ad minim veniam quis nostrud',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        'Lorem ipsum dolor sit amet',
        'Consectetur adipiscing elit',
        'Sed do eiusmod tempor incididunt',
      ],
    },
    languageRequirements: { mode: 'bullets', items: ['English at B2 level'] },
    benefits: {
      mode: 'bullets',
      items: [
        'Lorem ipsum dolor sit amet',
        'Consectetur adipiscing elit',
        'Sed do eiusmod tempor',
      ],
    },
  },
  {
    slug: '',
    status: 'published',
    filled: false,
    title: 'DevOps Engineer',
    summary: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    typeOfJobOffer: 'Software Development',
    country: 'Remote / EU',
    placeOfWork: 'Hybrid',
    typeOfCooperation: 'Employment',
    languageSkills: ['English'],
    city: 'Košice',
    reward: 'From 4000€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Senior',
    startDate: 'By agreement',
    responsibilities: {
      mode: 'text',
      text: LOREM,
    },
    requirements: {
      mode: 'bullets',
      items: [
        'Lorem ipsum dolor sit amet consectetur',
        'Adipiscing elit sed do eiusmod',
        'Tempor incididunt ut labore',
        'Et dolore magna aliqua',
      ],
    },
    languageRequirements: {
      mode: 'text',
      text: 'English at B2 level. German is an advantage.',
    },
    benefits: {
      mode: 'bullets',
      items: [
        'Lorem ipsum dolor sit amet',
        'Consectetur adipiscing elit',
        'Sed do eiusmod tempor incididunt',
        'Ut labore et dolore magna',
      ],
    },
  },
]

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  for (const sample of SAMPLES) {
    await createPosition(sample)
  }
  return NextResponse.json({ ok: true, created: SAMPLES.length })
}
