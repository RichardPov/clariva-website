'use client'

import { useEffect, useState } from 'react'
import { Download, Loader2, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Submission } from '@/lib/db/schema'

export default function SubmissionsPage() {
  const [rows, setRows] = useState<Submission[] | null>(null)

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then((r) => (r.ok ? r.json() : []))
      .then(setRows)
      .catch(() => setRows([]))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Applications</h1>
        <p className="text-sm text-muted-foreground">
          CVs submitted through the careers pages.
        </p>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Received</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">CV</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows === null && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            )}
            {rows?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No applications yet.
                </TableCell>
              </TableRow>
            )}
            {rows?.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {new Date(s.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{s.positionTitle || '—'}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <a
                      href={`mailto:${s.email}`}
                      className="flex items-center gap-1.5 hover:text-primary"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {s.email}
                    </a>
                    {s.phone && (
                      <a
                        href={`tel:${s.phone}`}
                        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {s.phone}
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs text-muted-foreground">
                  <span className="line-clamp-2">{s.message || '—'}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <a href={s.cvUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
