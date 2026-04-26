import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clariva — Technology that works. Teams that deliver.',
  description:
    'Clariva is a technology and consulting company delivering IT solutions, data platforms, ServiceNow, and senior expertise for companies that need to move fast.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
