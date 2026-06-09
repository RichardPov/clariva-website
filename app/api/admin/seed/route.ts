import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createPosition, listAllPositions } from '@/lib/db/positions'
import type { NewPosition } from '@/lib/db/schema'

const SAMPLES: NewPosition[] = [
  {
    slug: '',
    status: 'published',
    filled: false,
    title: 'Senior Java Developer',
    summary:
      'For our client in the banking sector we are looking for an experienced Java Developer to join a team working on a stable, high-traffic platform.',
    typeOfJobOffer: 'Software Development',
    country: 'Slovakia',
    placeOfWork: 'Remote',
    typeOfCooperation: 'B2B',
    languageSkills: ['English', 'Slovak'],
    city: 'Bratislava',
    reward: 'From 4000€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Senior',
    startDate: 'ASAP',
    responsibilities: {
      mode: 'bullets',
      items: [
        'Design and development of backend services in Java / Spring Boot',
        'Integration with internal and third-party systems',
        'Code reviews and mentoring of mid-level engineers',
        'Collaboration with product and QA on delivery',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        '5+ years of experience with Java',
        'Strong knowledge of Spring / Spring Boot',
        'Experience with REST APIs and relational databases',
        'Familiarity with CI/CD and cloud (AWS or Azure)',
      ],
    },
    languageRequirements: {
      mode: 'bullets',
      items: ['English at B2 level (written and spoken)'],
    },
    benefits: {
      mode: 'bullets',
      items: [
        'Fully remote within the EU',
        'Long-term, stable project',
        'Quarterly bonuses',
        'Budget for courses and certifications',
      ],
    },
  },
  {
    slug: '',
    status: 'published',
    filled: false,
    title: 'Data Engineer (Databricks)',
    summary:
      'Join an international data team building modern lakehouse platforms on Databricks for enterprise clients.',
    typeOfJobOffer: 'Data & AI',
    country: 'Remote / EU',
    placeOfWork: 'Hybrid',
    typeOfCooperation: 'Employment',
    languageSkills: ['English'],
    city: 'Košice',
    reward: 'From 3500€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Medior',
    startDate: 'By agreement',
    responsibilities: {
      mode: 'bullets',
      items: [
        'Build and maintain ETL / ELT pipelines on Databricks',
        'Model data for analytics and BI consumption',
        'Optimise Spark jobs for cost and performance',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        '3+ years in data engineering',
        'Hands-on experience with Spark / Databricks',
        'Strong SQL and Python',
        'Understanding of data warehousing concepts',
      ],
    },
    languageRequirements: { mode: 'bullets', items: ['English at B2 level'] },
    benefits: {
      mode: 'bullets',
      items: [
        'Hybrid working model',
        'Work with a Databricks-certified team',
        'Modern data stack',
        'Career growth and training',
      ],
    },
  },
  {
    slug: '',
    status: 'published',
    filled: false,
    title: 'ServiceNow Developer',
    summary:
      'We are looking for a ServiceNow Developer to implement and customise ITSM workflows for an international client.',
    typeOfJobOffer: 'Software Development',
    country: 'Germany',
    placeOfWork: 'On-Site',
    typeOfCooperation: 'Freelance',
    languageSkills: ['English', 'German'],
    city: 'Munich',
    reward: 'From 4500€ / month',
    allocationDuration: 'Long-term',
    seniority: 'Senior',
    startDate: 'ASAP',
    responsibilities: {
      mode: 'bullets',
      items: [
        'Implement and customise ServiceNow ITSM modules',
        'Build workflows, business rules and integrations',
        'Support end-to-end platform delivery',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        'Active ServiceNow certification (CSA / CAD)',
        'Experience with ITSM, scripting and integrations',
        'Strong communication skills',
      ],
    },
    languageRequirements: {
      mode: 'text',
      text: 'English at B2 level. German at B1 level is an advantage.',
    },
    benefits: {
      mode: 'bullets',
      items: [
        'On-site in Munich with relocation support',
        'Long-term engagement',
        'Competitive freelance rate',
      ],
    },
  },
]

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existing = await listAllPositions()
  if (existing.length > 0) {
    return NextResponse.json(
      { error: 'Positions already exist — seeding skipped.' },
      { status: 409 }
    )
  }

  for (const sample of SAMPLES) {
    await createPosition(sample)
  }

  return NextResponse.json({ ok: true, created: SAMPLES.length })
}
