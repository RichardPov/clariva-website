'use client'

import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { Section } from '@/lib/db/schema'

export default function SectionEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: Section
  onChange: (next: Section) => void
}) {
  const mode = value.mode
  const items = value.items ?? []

  function setMode(next: 'text' | 'bullets') {
    if (next === mode) return
    onChange(
      next === 'text'
        ? { mode: 'text', text: value.text ?? '' }
        : { mode: 'bullets', items: value.items ?? [] }
    )
  }

  function updateItem(i: number, text: string) {
    const copy = [...items]
    copy[i] = text
    onChange({ mode: 'bullets', items: copy })
  }
  function addItem() {
    onChange({ mode: 'bullets', items: [...items, ''] })
  }
  function removeItem(i: number) {
    onChange({ mode: 'bullets', items: items.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="inline-flex rounded-md border border-border p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setMode('bullets')}
            className={cn(
              'px-3 py-1 rounded',
              mode === 'bullets'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Bullets
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={cn(
              'px-3 py-1 rounded',
              mode === 'text'
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Text
          </button>
        </div>
      </div>

      {mode === 'text' ? (
        <Textarea
          rows={4}
          value={value.text ?? ''}
          placeholder={`Write the ${label.toLowerCase()} as a paragraph…`}
          onChange={(e) => onChange({ mode: 'text', text: e.target.value })}
        />
      ) : (
        <div className="space-y-2">
          {items.length === 0 && (
            <p className="text-xs text-muted-foreground">No bullet points yet.</p>
          )}
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={item}
                placeholder={`Point ${i + 1}`}
                onChange={(e) => updateItem(i, e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(i)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add point
          </Button>
        </div>
      )}
    </div>
  )
}
