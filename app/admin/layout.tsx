import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Clariva Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground font-dm antialiased">
        {children}
      </div>
      <Toaster theme="dark" richColors position="top-right" />
    </div>
  )
}
