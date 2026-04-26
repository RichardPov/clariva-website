export type USP = {
  title: string
  description: string
}

export type ContactPerson = {
  name: string
  role: string
  email: string
}

export type Service = {
  slug: string
  title: string
  tagline: string
  description: string
  usps: [USP, USP, USP]
  contact: ContactPerson
}

export const services: Service[] = [
  {
    slug: 'application-development',
    title: 'Application Development',
    tagline: 'Complex software, delivered without the overhead.',
    description:
      'We specialise in complex software, delivered without the overhead. Clariva accelerates end-to-end development as a self-managed, senior software team. From initial analysis and design to development, testing, deployment, and support — we partner with clients across industries to solve real business challenges. Our engineers own the problem, not just the ticket.',
    usps: [
      {
        title: 'Senior-only engineers',
        description:
          'Every project is staffed with experienced engineers who have delivered in production environments. No juniors learning on your time.',
      },
      {
        title: 'End-to-end ownership',
        description:
          'We take full accountability from requirements through release. You get working software, not a handoff checklist.',
      },
      {
        title: 'Transparent delivery',
        description:
          'Weekly demos, clear milestones, and direct communication. You always know what is being built and why.',
      },
    ],
    contact: {
      name: 'Martin Kováč',
      role: 'Head of Software Delivery',
      email: 'martin.kovac@clariva.com',
    },
  },
  {
    slug: 'data-and-ai',
    title: 'Data & AI (Databricks)',
    tagline: 'Unlock the full value of your data.',
    description:
      'We help organisations build the data infrastructure that turns raw information into business advantage. From designing modern data platforms on Databricks to deploying production-ready AI models, our data engineers and scientists bridge the gap between what your data contains and what your business needs to know.',
    usps: [
      {
        title: 'Databricks-certified expertise',
        description:
          'Our team holds Databricks certifications and has delivered large-scale lakehouse architectures across regulated industries.',
      },
      {
        title: 'From pipeline to insight',
        description:
          'We build the full stack — ingestion, transformation, analytics, and BI — so your organisation can act on data, not just store it.',
      },
      {
        title: 'AI that ships',
        description:
          'We focus on AI solutions that reach production, not proof-of-concepts that live in Jupyter notebooks. Models are tested, monitored, and maintained.',
      },
    ],
    contact: {
      name: 'Lucia Horváth',
      role: 'Data & AI Practice Lead',
      email: 'lucia.horvath@clariva.com',
    },
  },
  {
    slug: 'servicenow',
    title: 'ServiceNow Solutions',
    tagline: 'Turn ServiceNow into a powerful business tool.',
    description:
      'ServiceNow is one of the most powerful platforms in the enterprise — but only when configured with precision. Clariva brings certified ServiceNow specialists who understand both the platform and the business processes it needs to support. We implement, customise, and integrate ServiceNow so it works for your workflows, not against them.',
    usps: [
      {
        title: 'Certified specialists',
        description:
          'Our consultants hold active ServiceNow certifications (CSA, CAD, ITSM) and have delivered across ITSM, HRSD, CSM, and custom applications.',
      },
      {
        title: 'Process-first thinking',
        description:
          'We map your workflows before touching the platform. The result is configuration that reflects how your business actually operates.',
      },
      {
        title: 'Smooth enterprise integrations',
        description:
          'ServiceNow rarely lives alone. We integrate it with your ERP, identity providers, monitoring tools, and custom systems without duct tape.',
      },
    ],
    contact: {
      name: 'Tomáš Novák',
      role: 'ServiceNow Practice Lead',
      email: 'tomas.novak@clariva.com',
    },
  },
  {
    slug: 'team-extension',
    title: 'Team Extension',
    tagline: 'Scale fast with professionals who hit the ground running.',
    description:
      'When you need capacity without the overhead of hiring, Clariva deploys experienced IT professionals who integrate directly into your existing team. They operate on your tools, your processes, and your cadence — backed by Clariva quality guarantees, availability commitments, and ongoing oversight so you never manage a contractor relationship alone.',
    usps: [
      {
        title: 'Pre-vetted, senior talent',
        description:
          'Every professional is assessed before placement. We match on both technical depth and team compatibility so integration is fast and frictionless.',
      },
      {
        title: 'Full availability guarantees',
        description:
          'We guarantee the hours and commitments agreed at the start. If something changes, we resolve it — you do not manage it.',
      },
      {
        title: 'Ongoing Clariva oversight',
        description:
          'Our Care Program means every placed expert stays connected to us. Retention, motivation, and performance are our responsibility.',
      },
    ],
    contact: {
      name: 'Jana Blaho',
      role: 'Talent & Partnerships',
      email: 'jana.blaho@clariva.com',
    },
  },
  {
    slug: 'full-delivery-teams',
    title: 'Full Delivery Teams',
    tagline: 'A complete team, ready to deliver from day one.',
    description:
      'Some challenges need more than a few extra hands — they need a fully assembled, self-managed delivery unit. Clariva builds and deploys complete teams: developers, testers, and product-adjacent roles working together under a unified delivery model. You set the direction; we own the execution.',
    usps: [
      {
        title: 'Assembled in days, not months',
        description:
          'We maintain a network of experienced professionals who can be mobilised quickly. Typical team assembly takes one to two weeks, not quarters.',
      },
      {
        title: 'Self-managed delivery',
        description:
          'Our teams come with internal coordination built in. You get progress, not status meetings — results, not process overhead.',
      },
      {
        title: 'Quality and delivery guarantees',
        description:
          'Output quality, velocity, and availability are backed by Clariva commitments, not just goodwill from individual contractors.',
      },
    ],
    contact: {
      name: 'Martin Kováč',
      role: 'Head of Software Delivery',
      email: 'martin.kovac@clariva.com',
    },
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    tagline: 'Practical IT strategy — no unnecessary theory.',
    description:
      'We help organisations solve complex IT challenges with clear, implementable solutions. Clariva consultants combine strategic thinking with hands-on technical depth — so recommendations come with feasibility baked in. Whether you need to modernise an architecture, reduce operational costs, or navigate a critical technology decision, we give you a path forward, not a slide deck.',
    usps: [
      {
        title: 'Strategy that is executable',
        description:
          'Our recommendations are designed to be built, not filed away. Every output includes concrete next steps that your team can act on immediately.',
      },
      {
        title: 'Technology and process together',
        description:
          'We look at both the systems and the workflows around them. Real efficiency gains come from aligning the two, not optimising in isolation.',
      },
      {
        title: 'Honest about trade-offs',
        description:
          'We tell you what each path costs — in time, money, and risk. You make informed decisions, not ones shaped by what a vendor wants to sell.',
      },
    ],
    contact: {
      name: 'Richard Povysil',
      role: 'Managing Director',
      email: 'richard.povysil@clariva.com',
    },
  },
  {
    slug: 'tenders',
    title: 'Tenders',
    tagline: 'Specialist support for complex tenders and RFPs.',
    description:
      'Winning and delivering complex technology tenders requires the right certified profiles, fast sourcing capability, and full alignment with technical requirements. Clariva has supported clients through demanding RFP processes — providing the documentation, the expertise, and the delivery infrastructure to compete and deliver at the level tenders demand.',
    usps: [
      {
        title: 'Certified profiles on demand',
        description:
          'We source and provide certified professionals matched precisely to tender requirements — covering niche skills that are hard to find on short timelines.',
      },
      {
        title: 'RFP process support',
        description:
          'We work alongside your team during the bid phase — structuring responses, assembling CVs, and ensuring technical criteria are met compliantly.',
      },
      {
        title: 'Full compliance with technical criteria',
        description:
          'Every profile and proposed solution is reviewed against tender specifications before submission, reducing the risk of disqualification on technical grounds.',
      },
    ],
    contact: {
      name: 'Jana Blaho',
      role: 'Talent & Partnerships',
      email: 'jana.blaho@clariva.com',
    },
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
