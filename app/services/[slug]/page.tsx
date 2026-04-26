import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { services, getServiceBySlug } from '@/lib/services-data'
import ServicePage from '@/components/ServicePage'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: `${service.title} — Clariva`,
    description: service.tagline,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  if (!service) return notFound()
  return <ServicePage service={service} />
}
