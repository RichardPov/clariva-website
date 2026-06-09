import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import ThemeProvider from '@/components/admin/ThemeProvider'

export const metadata: Metadata = {
  title: 'Clariva Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground font-dm antialiased">
        {children}
      </div>
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  )
}
