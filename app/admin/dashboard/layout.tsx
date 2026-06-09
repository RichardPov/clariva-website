import Link from 'next/link'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminTopbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          ← Back to clariva.sk
        </Link>
      </footer>
    </div>
  )
}
