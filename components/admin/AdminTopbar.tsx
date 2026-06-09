'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Briefcase, Inbox, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin/dashboard', label: 'Positions', icon: Briefcase, exact: true },
  { href: '/admin/dashboard/submissions', label: 'Applications', icon: Inbox, exact: false },
]

export default function AdminTopbar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin')
  }

  return (
    <header className="border-b border-border">
      <div className="w-full max-w-6xl mx-auto px-5 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-sm">
            Clariva <span className="text-primary">Admin</span>
          </span>
          <nav className="flex items-center gap-1">
            {NAV.map(({ href, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === href
                : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                    active
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </header>
  )
}
