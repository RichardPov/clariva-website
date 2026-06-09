import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import PositionForm from '@/components/admin/PositionForm'

export default function NewPositionPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to positions
      </Link>
      <h1 className="text-2xl font-semibold">New position</h1>
      <PositionForm />
    </div>
  )
}
