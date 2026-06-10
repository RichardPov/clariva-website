'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Position } from '@/lib/db/schema'

export default function PositionsDashboard() {
  const [rows, setRows] = useState<Position[] | null>(null)
  const [toDelete, setToDelete] = useState<Position | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [seeding, setSeeding] = useState(false)

  async function load() {
    const res = await fetch('/api/admin/positions')
    if (res.ok) setRows(await res.json())
    else setRows([])
  }

  useEffect(() => {
    load()
  }, [])

  async function seedSamples() {
    setSeeding(true)
    const res = await fetch('/api/admin/seed', { method: 'POST' })
    setSeeding(false)
    if (res.ok) {
      toast.success('Sample positions added')
      load()
    } else {
      const data = await res.json().catch(() => ({}))
      toast.error(data.error ?? 'Failed to seed')
    }
  }

  async function seedLorem() {
    setSeeding(true)
    const res = await fetch('/api/admin/seed-lorem', { method: 'POST' })
    setSeeding(false)
    if (res.ok) {
      toast.success('2 sample positions added')
      load()
    } else {
      toast.error('Failed to add samples')
    }
  }

  async function confirmDelete() {
    if (!toDelete) return
    setDeleting(true)
    const res = await fetch(`/api/admin/positions/${toDelete.id}`, {
      method: 'DELETE',
    })
    setDeleting(false)
    if (res.ok) {
      toast.success('Position deleted')
      setToDelete(null)
      load()
    } else {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Open positions</h1>
          <p className="text-sm text-muted-foreground">
            Create, edit and publish job postings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={seedLorem} disabled={seeding}>
            {seeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add 2 samples
          </Button>
          <Button asChild>
            <Link href="/admin/dashboard/positions/new">
              <Plus className="mr-2 h-4 w-4" />
              New position
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Place</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows === null && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            )}
            {rows?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <p className="text-muted-foreground mb-4">
                    No positions yet.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={seedSamples}
                    disabled={seeding}
                  >
                    {seeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Load 3 sample positions
                  </Button>
                </TableCell>
              </TableRow>
            )}
            {rows?.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {p.title}
                    {p.status === 'published' && (
                      <Link
                        href={`/open-positions/${p.slug}`}
                        target="_blank"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p.typeOfJobOffer || '—'}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p.placeOfWork || '—'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant={p.status === 'published' ? 'default' : 'secondary'}
                    >
                      {p.status}
                    </Badge>
                    {p.filled && <Badge variant="outline">filled</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(p.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/dashboard/positions/${p.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setToDelete(p)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete position</DialogTitle>
            <DialogDescription>
              Delete &ldquo;{toDelete?.title}&rdquo;? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
