import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import PositionForm from '@/components/admin/PositionForm'
import { getPositionById } from '@/lib/db/positions'

export const dynamic = 'force-dynamic'

export default async function EditPositionPage({
  params,
}: {
  params: { id: string }
}) {
  const position = await getPositionById(params.id)
  if (!position) notFound()

  return (
    <div className="space-y-6">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to positions
      </Link>
      <h1 className="text-2xl font-semibold">Edit position</h1>
      <PositionForm position={position} />
    </div>
  )
}
