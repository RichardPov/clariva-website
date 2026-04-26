import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { services, getServiceBySlug } from '@/lib/services-data'
import ServicePage from '@/components/ServicePage'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  const t = await getTranslations({
    locale: params.locale,
    namespace: `ServicePages.${params.slug}`,
  })
  return {
    title: `${t('title')} — Clariva`,
    description: t('tagline'),
  }
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const service = getServiceBySlug(params.slug)
  if (!service) return notFound()
  return <ServicePage service={service} />
}
