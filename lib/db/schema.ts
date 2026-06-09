import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core'

/** A body block that the admin can author either as free text or as bullet points. */
export type Section = {
  mode: 'text' | 'bullets'
  text?: string
  items?: string[]
}

export const EMPTY_SECTION: Section = { mode: 'bullets', items: [] }

export const positions = pgTable('positions', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  status: text('status', { enum: ['published', 'draft'] })
    .notNull()
    .default('draft'),
  // Position is still shown but marked as filled / no longer accepting applicants.
  filled: boolean('filled').notNull().default(false),

  title: text('title').notNull(),
  summary: text('summary').notNull().default(''),

  // Filter facets
  typeOfJobOffer: text('type_of_job_offer').notNull().default(''),
  country: text('country').notNull().default(''),
  placeOfWork: text('place_of_work').notNull().default(''), // Remote | On-Site | Hybrid
  typeOfCooperation: text('type_of_cooperation').notNull().default(''),
  languageSkills: text('language_skills').array().notNull().default([]),

  // Sidebar meta
  city: text('city').notNull().default(''),
  reward: text('reward').notNull().default(''),
  allocationDuration: text('allocation_duration').notNull().default(''),
  seniority: text('seniority').notNull().default(''),
  startDate: text('start_date').notNull().default(''),

  // Body sections (text or bullets)
  responsibilities: jsonb('responsibilities')
    .$type<Section>()
    .notNull()
    .default(EMPTY_SECTION),
  requirements: jsonb('requirements')
    .$type<Section>()
    .notNull()
    .default(EMPTY_SECTION),
  languageRequirements: jsonb('language_requirements')
    .$type<Section>()
    .notNull()
    .default(EMPTY_SECTION),
  benefits: jsonb('benefits').$type<Section>().notNull().default(EMPTY_SECTION),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const submissions = pgTable('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  positionId: uuid('position_id').references(() => positions.id, {
    onDelete: 'set null',
  }),
  positionTitle: text('position_title').notNull().default(''),

  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  message: text('message').notNull().default(''),
  cvUrl: text('cv_url').notNull(),
  cvFilename: text('cv_filename').notNull().default(''),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type Position = typeof positions.$inferSelect
export type NewPosition = typeof positions.$inferInsert
export type Submission = typeof submissions.$inferSelect
export type NewSubmission = typeof submissions.$inferInsert
