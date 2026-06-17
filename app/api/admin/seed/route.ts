import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createPosition, deleteAllPositions } from '@/lib/db/positions'
import type { NewPosition } from '@/lib/db/schema'

// 3 realistic positions, marked as filled so they render disabled on the site.
// Toggle "Position filled" per position in the admin form.
const SAMPLES: NewPosition[] = [
  {
    slug: '',
    status: 'published',
    filled: true,
    title: 'Frontend Engineer (React)',
    summary:
      'We are looking for an experienced Frontend Engineer to build modern, high-performance web interfaces in React for our client’s digital products.',
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
        'Develop and maintain responsive user interfaces in React and TypeScript',
        'Translate designs and product requirements into clean, reusable components',
        'Integrate front-end applications with REST and GraphQL APIs',
        'Collaborate with designers, backend engineers and product owners',
        'Ensure performance, accessibility and cross-browser quality',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        '3+ years of experience with React and modern JavaScript / TypeScript',
        'Strong knowledge of HTML, CSS and responsive design',
        'Experience with state management and component architecture',
        'Familiarity with Git, CI/CD and testing practices',
      ],
    },
    languageRequirements: {
      mode: 'text',
      text: 'English at B2 level (written and spoken). Slovak is an advantage.',
    },
    benefits: {
      mode: 'bullets',
      items: [
        'Fully remote work within the EU',
        'Long-term, stable project',
        'Modern tech stack and tooling',
        'Budget for courses and conferences',
      ],
    },
  },
  {
    slug: '',
    status: 'published',
    filled: true,
    title: 'Backend Engineer (.NET)',
    summary:
      'We are seeking a Senior Backend Engineer to design and build scalable services on the .NET platform for an enterprise-grade application.',
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
    responsibilities: {
      mode: 'bullets',
      items: [
        'Design, develop and maintain backend services in C# / .NET',
        'Build and integrate REST APIs and messaging between systems',
        'Optimise application performance, scalability and reliability',
        'Write automated tests and take part in code reviews',
        'Collaborate with frontend, QA and DevOps teams',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        '5+ years of experience with C# and .NET (Core)',
        'Solid knowledge of relational databases and SQL',
        'Experience with a cloud platform (Azure or AWS)',
        'Understanding of CI/CD, containers and microservices',
      ],
    },
    languageRequirements: {
      mode: 'text',
      text: 'English at B2 level (written and spoken).',
    },
    benefits: {
      mode: 'bullets',
      items: [
        'Hybrid work from our Košice office',
        'Senior, experienced team',
        'Long-term enterprise project',
        'Quarterly bonuses and training budget',
      ],
    },
  },
  {
    slug: '',
    status: 'published',
    filled: true,
    title: 'DevOps Engineer',
    summary:
      'We are looking for a DevOps Engineer to automate, scale and secure the cloud infrastructure behind our client’s platforms.',
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
    responsibilities: {
      mode: 'bullets',
      items: [
        'Build and maintain CI/CD pipelines and infrastructure as code',
        'Manage cloud environments (Azure / AWS) and Kubernetes clusters',
        'Automate deployments, monitoring and alerting',
        'Improve system reliability, security and observability',
        'Support development teams with tooling and best practices',
      ],
    },
    requirements: {
      mode: 'bullets',
      items: [
        '4+ years of experience in DevOps / platform engineering',
        'Hands-on experience with Docker, Kubernetes and Terraform',
        'Strong knowledge of at least one cloud provider (Azure or AWS)',
        'Scripting skills (Bash, Python or PowerShell)',
        'Experience with monitoring tools (Prometheus, Grafana)',
      ],
    },
    languageRequirements: {
      mode: 'text',
      text: 'English at B2 level. German is an advantage.',
    },
    benefits: {
      mode: 'bullets',
      items: [
        'On-site in Bratislava with flexible hours',
        'High-impact infrastructure work',
        'Long-term engagement',
        'Certification and training support',
      ],
    },
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
