'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, X, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SectionEditor from '@/components/admin/SectionEditor'
import type { Position, Section } from '@/lib/db/schema'
import { EMPTY_SECTION } from '@/lib/db/schema'
import {
  JOB_TYPES,
  PLACES_OF_WORK,
  COOPERATION_TYPES,
  SENIORITIES,
  COUNTRIES,
  COMMON_LANGUAGES,
} from '@/lib/positions-options'

type FormState = {
  title: string
  summary: string
  status: 'draft' | 'published'
  typeOfJobOffer: string
  country: string
  placeOfWork: string
  typeOfCooperation: string
  seniority: string
  city: string
  reward: string
  allocationDuration: string
  startDate: string
  languageSkills: string[]
  responsibilities: Section
  requirements: Section
  languageRequirements: Section
  benefits: Section
}

function initialState(p?: Position): FormState {
  return {
    title: p?.title ?? '',
    summary: p?.summary ?? '',
    status: (p?.status as 'draft' | 'published') ?? 'draft',
    typeOfJobOffer: p?.typeOfJobOffer ?? '',
    country: p?.country ?? '',
    placeOfWork: p?.placeOfWork ?? '',
    typeOfCooperation: p?.typeOfCooperation ?? '',
    seniority: p?.seniority ?? '',
    city: p?.city ?? '',
    reward: p?.reward ?? '',
    allocationDuration: p?.allocationDuration ?? '',
    startDate: p?.startDate ?? '',
    languageSkills: p?.languageSkills ?? [],
    responsibilities: p?.responsibilities ?? EMPTY_SECTION,
    requirements: p?.requirements ?? EMPTY_SECTION,
    languageRequirements: p?.languageRequirements ?? EMPTY_SECTION,
    benefits: p?.benefits ?? EMPTY_SECTION,
  }
}

export default function PositionForm({ position }: { position?: Position }) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(() => initialState(position))
  const [langDraft, setLangDraft] = useState('')
  const [saving, setSaving] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addLanguage(value: string) {
    const v = value.trim()
    if (!v || form.languageSkills.includes(v)) return
    set('languageSkills', [...form.languageSkills, v])
    setLangDraft('')
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    setSaving(true)
    const url = position
      ? `/api/admin/positions/${position.id}`
      : '/api/admin/positions'
    const method = position ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      toast.success(position ? 'Position updated' : 'Position created')
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      toast.error('Failed to save')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
      {/* Basics */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. PLC Software Engineer"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Short summary</Label>
          <Input
            id="summary"
            value={form.summary}
            onChange={(e) => set('summary', e.target.value)}
            placeholder="One sentence shown on the card and the detail hero."
          />
        </div>
      </section>

      {/* Facets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldSelect
          label="Type of job offer"
          value={form.typeOfJobOffer}
          options={JOB_TYPES as readonly string[]}
          onChange={(v) => set('typeOfJobOffer', v)}
        />
        <FieldSelect
          label="Place of work"
          value={form.placeOfWork}
          options={PLACES_OF_WORK as readonly string[]}
          onChange={(v) => set('placeOfWork', v)}
        />
        <FieldSelect
          label="Country"
          value={form.country}
          options={COUNTRIES as readonly string[]}
          onChange={(v) => set('country', v)}
        />
        <FieldSelect
          label="Type of cooperation"
          value={form.typeOfCooperation}
          options={COOPERATION_TYPES as readonly string[]}
          onChange={(v) => set('typeOfCooperation', v)}
        />
        <FieldSelect
          label="Seniority"
          value={form.seniority}
          options={SENIORITIES as readonly string[]}
          onChange={(v) => set('seniority', v)}
        />
        <FieldSelect
          label="Status"
          value={form.status}
          options={['draft', 'published']}
          onChange={(v) => set('status', v as 'draft' | 'published')}
        />
      </section>

      {/* Sidebar meta */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="City" value={form.city} onChange={(v) => set('city', v)} placeholder="e.g. Horná Streda" />
        <Field label="Reward" value={form.reward} onChange={(v) => set('reward', v)} placeholder="e.g. From 2500€ / month" />
        <Field label="Allocation duration" value={form.allocationDuration} onChange={(v) => set('allocationDuration', v)} placeholder="e.g. Long-term" />
        <Field label="Start date" value={form.startDate} onChange={(v) => set('startDate', v)} placeholder="e.g. ASAP" />
      </section>

      {/* Language skills */}
      <section className="space-y-2">
        <Label>Language skills</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.languageSkills.map((l) => (
            <Badge key={l} variant="secondary" className="gap-1">
              {l}
              <button
                type="button"
                onClick={() =>
                  set('languageSkills', form.languageSkills.filter((x) => x !== l))
                }
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={langDraft}
            onChange={(e) => setLangDraft(e.target.value)}
            placeholder="e.g. German B1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addLanguage(langDraft)
              }
            }}
          />
          <Button type="button" variant="outline" onClick={() => addLanguage(langDraft)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {COMMON_LANGUAGES.filter((l) => !form.languageSkills.includes(l)).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => addLanguage(l)}
              className="text-xs text-muted-foreground hover:text-foreground border border-border rounded-full px-2.5 py-0.5"
            >
              + {l}
            </button>
          ))}
        </div>
      </section>

      {/* Body sections */}
      <section className="space-y-4">
        <SectionEditor label="Responsibilities" value={form.responsibilities} onChange={(v) => set('responsibilities', v)} />
        <SectionEditor label="Requirements" value={form.requirements} onChange={(v) => set('requirements', v)} />
        <SectionEditor label="Language Requirements" value={form.languageRequirements} onChange={(v) => set('languageRequirements', v)} />
        <SectionEditor label="Benefits" value={form.benefits} onChange={(v) => set('benefits', v)} />
      </section>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {position ? 'Save changes' : 'Create position'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/dashboard')}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function FieldSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
