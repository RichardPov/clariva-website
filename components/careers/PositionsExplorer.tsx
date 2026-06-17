'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import PositionCard from '@/components/careers/PositionCard'
import type { Position } from '@/lib/db/schema'

type FacetKey =
  | 'typeOfJobOffer'
  | 'country'
  | 'languageSkills'
  | 'typeOfCooperation'
  | 'placeOfWork'

const FACET_ORDER: FacetKey[] = [
  'typeOfJobOffer',
  'country',
  'languageSkills',
  'typeOfCooperation',
  'placeOfWork',
]

function valuesFor(positions: Position[], key: FacetKey): string[] {
  const set = new Set<string>()
  for (const p of positions) {
    if (key === 'languageSkills') {
      for (const v of p.languageSkills ?? []) if (v) set.add(v)
    } else {
      const v = p[key]
      if (typeof v === 'string' && v) set.add(v)
    }
  }
  return Array.from(set).sort()
}

export default function PositionsExplorer({
  initialPositions,
}: {
  initialPositions?: Position[]
}) {
  const t = useTranslations('Careers')
  // Always fetch fresh from the API so newly published roles appear without a
  // redeploy. initialPositions (if provided) seeds the first paint.
  const [positions, setPositions] = useState<Position[] | null>(
    initialPositions ?? null
  )
  const [selected, setSelected] = useState<Record<FacetKey, string[]>>({
    typeOfJobOffer: [],
    country: [],
    languageSkills: [],
    typeOfCooperation: [],
    placeOfWork: [],
  })

  useEffect(() => {
    fetch('/api/positions', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setPositions)
      .catch(() => setPositions([]))
  }, [])

  const rows = positions ?? []

  const facets = useMemo(
    () =>
      FACET_ORDER.map((key) => ({ key, values: valuesFor(rows, key) })).filter(
        (f) => f.values.length > 0
      ),
    [rows]
  )

  const filtered = useMemo(() => {
    return rows.filter((p) => {
      return FACET_ORDER.every((key) => {
        const picks = selected[key]
        if (picks.length === 0) return true
        if (key === 'languageSkills') {
          return picks.some((v) => (p.languageSkills ?? []).includes(v))
        }
        return picks.includes(p[key] as string)
      })
    })
  }, [rows, selected])

  function toggle(key: FacetKey, value: string) {
    setSelected((s) => {
      const has = s[key].includes(value)
      return {
        ...s,
        [key]: has ? s[key].filter((v) => v !== value) : [...s[key], value],
      }
    })
  }

  function reset() {
    setSelected({
      typeOfJobOffer: [],
      country: [],
      languageSkills: [],
      typeOfCooperation: [],
      placeOfWork: [],
    })
  }

  const anySelected = FACET_ORDER.some((k) => selected[k].length > 0)
  const facetLabel: Record<FacetKey, string> = {
    typeOfJobOffer: t('filters.typeOfJobOffer'),
    country: t('filters.country'),
    languageSkills: t('filters.languageSkills'),
    typeOfCooperation: t('filters.typeOfCooperation'),
    placeOfWork: t('filters.placeOfWork'),
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      {/* Filter sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <div
          className="rounded-2xl p-5 lg:sticky lg:top-24"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <span className="font-syne font-semibold text-white text-[15px]">
              {t('filters.title')}
            </span>
            {anySelected && (
              <button
                onClick={reset}
                className="text-[12px] font-dm text-gold/70 hover:text-gold transition-colors"
              >
                {t('filters.reset')}
              </button>
            )}
          </div>

          {facets.length === 0 && (
            <p className="font-dm text-white/35 text-[13px]">
              {t('filters.none')}
            </p>
          )}

          <div className="space-y-6">
            {facets.map(({ key, values }) => (
              <div key={key}>
                <p className="font-dm text-[11px] font-semibold tracking-[0.14em] uppercase text-white/35 mb-3">
                  {facetLabel[key]}
                </p>
                <div className="space-y-2.5">
                  {values.map((value) => {
                    const id = `${key}-${value}`
                    const count = rows.filter((p) =>
                      key === 'languageSkills'
                        ? (p.languageSkills ?? []).includes(value)
                        : p[key] === value
                    ).length
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <Checkbox
                          id={id}
                          checked={selected[key].includes(value)}
                          onCheckedChange={() => toggle(key, value)}
                          className="border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-ink"
                        />
                        <span className="font-dm text-[13px] text-white/55 group-hover:text-white/80 transition-colors">
                          {value}{' '}
                          <span className="text-white/25">({count})</span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        {positions === null ? (
          <div className="py-20 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-white/30" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] py-20 text-center">
            <p className="font-dm text-white/40 text-[15px]">
              {rows.length === 0 ? t('empty') : t('noMatches')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <PositionCard key={p.id} position={p} delay={i * 0.05} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
