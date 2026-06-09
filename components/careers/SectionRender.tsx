import type { Section } from '@/lib/db/schema'

/** True if a section actually has content worth rendering. */
export function sectionHasContent(s?: Section): boolean {
  if (!s) return false
  if (s.mode === 'text') return !!s.text?.trim()
  return (s.items?.filter((i) => i.trim()).length ?? 0) > 0
}

export default function SectionRender({ section }: { section: Section }) {
  if (section.mode === 'text') {
    return (
      <p className="font-dm text-white/55 text-[15px] leading-relaxed whitespace-pre-line">
        {section.text}
      </p>
    )
  }
  const items = (section.items ?? []).filter((i) => i.trim())
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
          <span className="font-dm text-white/55 text-[15px] leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
