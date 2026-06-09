'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Treat as dark until mounted to keep SSR/first paint stable.
  const isDark = !mounted ? true : resolvedTheme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex h-7 w-[52px] items-center rounded-full px-1 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isDark ? 'bg-secondary' : 'bg-gold/30'
      )}
    >
      {/* Track icons */}
      <Sun
        className={cn(
          'absolute left-1.5 h-3.5 w-3.5 transition-opacity',
          isDark ? 'opacity-30 text-muted-foreground' : 'opacity-0'
        )}
      />
      <Moon
        className={cn(
          'absolute right-1.5 h-3.5 w-3.5 transition-opacity',
          isDark ? 'opacity-0' : 'opacity-40 text-muted-foreground'
        )}
      />

      {/* Sliding knob */}
      <span
        className={cn(
          'pointer-events-none z-10 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md ring-0 transition-transform duration-300',
          isDark ? 'translate-x-[24px]' : 'translate-x-0'
        )}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-zinc-800" />
        ) : (
          <Sun className="h-3 w-3 text-gold-dark" />
        )}
      </span>
    </button>
  )
}
