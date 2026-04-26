'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'

const MARK_PATH =
  'M42.6428 25.0042H38.199V33.8356H25.9748C25.9108 33.8356 19.5802 33.7484 19.5802 26.2039H21.4519C21.4519 31.8997 25.7902 31.9651 25.9748 31.9651H36.3274V23.1337H40.4174C40.0358 20.9499 39.1797 16.0828 38.7641 13.9488C37.379 6.83764 31.714 1.87106 24.9879 1.87106C21.7301 1.87106 18.5634 3.02102 16.0708 5.10922L14.8684 3.67579C17.6971 1.30528 21.291 0 24.9876 0C32.622 0 39.042 5.58874 40.601 13.5911C41.1463 16.3911 42.4393 23.834 42.4527 23.9088L42.6428 25.0042ZM17.3299 27.3505L16.9371 27.0707C15.6487 26.1535 14.5338 25.0331 13.6228 23.7402L12.0928 24.8175C13.0318 26.1502 14.1627 27.3218 15.4583 28.3053L15.4574 39H30.1245V37.1291H17.329L17.3296 27.3502L17.3299 27.3505ZM3.51969 7.29361C3.51969 5.55013 4.93875 4.13176 6.68304 4.13176C8.18597 4.13176 9.44479 5.18552 9.76522 6.59212H20.7838C21.0871 5.57064 22.0336 4.823 23.1524 4.823C24.5154 4.823 25.6242 5.93136 25.6242 7.29361C25.6242 8.65591 24.5154 9.76426 23.1524 9.76426C22.0336 9.76426 21.0871 9.01662 20.7838 7.99514H9.76522C9.44479 9.40174 8.18597 10.4555 6.68304 10.4555C4.93875 10.4555 3.51969 9.03713 3.51969 7.29361ZM22.0843 7.29361C22.0843 7.88233 22.5634 8.36128 23.1521 8.36128C23.7408 8.36128 24.2203 7.88233 24.2203 7.29361C24.2203 6.70493 23.7411 6.22599 23.1521 6.22599C22.5632 6.22599 22.0843 6.70493 22.0843 7.29361ZM4.92335 7.29361C4.92335 8.26356 5.71267 9.05251 6.68304 9.05251C7.65341 9.05251 8.44273 8.26356 8.44273 7.29361C8.44273 6.32371 7.65341 5.53475 6.68304 5.53475C5.71267 5.53475 4.92335 6.32371 4.92335 7.29361ZM12.2267 21.6728C11.9063 23.0794 10.6475 24.1332 9.14456 24.1332C7.40026 24.1332 5.98121 22.7148 5.98121 20.9713C5.98121 19.2278 7.40026 17.8095 9.14456 17.8095C10.6475 17.8095 11.9063 18.8632 12.2267 20.2698H18.1476C18.4509 19.2483 19.3974 18.5007 20.5162 18.5007C21.8791 18.5007 22.988 19.609 22.988 20.9713C22.988 22.3336 21.8791 23.4419 20.5162 23.4419C19.3974 23.4419 18.4509 22.6943 18.1476 21.6728H12.2267ZM19.4481 20.9713C19.4481 21.56 19.9272 22.0389 20.5162 22.0389C21.1052 22.0389 21.584 21.56 21.584 20.9713C21.584 20.3826 21.1049 19.9037 20.5162 19.9037C19.9275 19.9037 19.4481 20.3826 19.4481 20.9713ZM10.9042 20.9713C10.9042 20.0014 10.1149 19.2124 9.14456 19.2124C8.17419 19.2124 7.38487 20.0014 7.38487 20.9713C7.38487 21.9412 8.17419 22.7302 9.14456 22.7302C10.1149 22.7302 10.9042 21.9412 10.9042 20.9713ZM4.84067 14.834C4.53744 15.8555 3.5909 16.6031 2.47178 16.6031C1.10886 16.6031 0 15.4947 0 14.1325C0 12.7702 1.10886 11.6619 2.47178 11.6619C3.5909 11.6619 4.53715 12.4095 4.84067 13.431H12.9177C13.2382 12.0243 14.497 10.9706 15.9999 10.9706C17.7442 10.9706 19.1633 12.389 19.1633 14.1325C19.1633 15.876 17.7442 17.2943 15.9999 17.2943C14.497 17.2943 13.2382 16.2406 12.9177 14.834H4.84067ZM14.2405 14.1325C14.2405 15.1024 15.0298 15.8913 16.0002 15.8913C16.9706 15.8913 17.7599 15.1024 17.7599 14.1325C17.7599 13.1626 16.9706 12.3736 16.0002 12.3736C15.0298 12.3736 14.2405 13.1626 14.2405 14.1325ZM3.53991 14.1325C3.53991 13.5438 3.06076 13.0649 2.47178 13.0649C1.8828 13.0649 1.40395 13.5438 1.40395 14.1325C1.40395 14.7212 1.8831 15.2001 2.47178 15.2001C3.06046 15.2001 3.53991 14.7212 3.53991 14.1325ZM25.5026 11.4435L28.427 8.25511C28.0245 7.45077 28.1569 6.44526 28.8271 5.77514C29.6644 4.93791 31.0276 4.93791 31.8652 5.77514C32.7028 6.61234 32.7028 7.97463 31.8652 8.81183C31.4464 9.23043 30.8964 9.43973 30.346 9.43973C30.0334 9.43973 29.7214 9.36979 29.433 9.23437L26.5053 12.4264C27.2904 13.6499 27.1498 15.299 26.0804 16.3682C25.9978 16.4508 25.9108 16.5271 25.8215 16.5989L26.9072 18.8339C27.5182 18.7808 28.1476 18.9865 28.6141 19.4528C29.4517 20.29 29.4517 21.6523 28.6141 22.4895C28.1953 22.9081 27.6452 23.1174 27.0949 23.1174C26.5445 23.1174 25.9948 22.9081 25.5759 22.4895C24.7383 21.6523 24.7383 20.29 25.5759 19.4528C25.5919 19.4368 25.6094 19.4233 25.6257 19.4079L24.5576 17.2084C24.3228 17.2624 24.0836 17.2928 23.844 17.2928C23.0339 17.2928 22.224 16.9846 21.6073 16.3684C20.3738 15.1355 20.3738 13.1297 21.6073 11.8968C22.663 10.8415 24.2839 10.6925 25.5029 11.4438L25.5026 11.4435ZM27.6217 20.445C27.4765 20.3 27.2858 20.2273 27.0949 20.2273C26.9039 20.2273 26.7135 20.3 26.5683 20.445C26.2781 20.7351 26.2781 21.2074 26.5683 21.4976C26.8586 21.7877 27.3311 21.7877 27.6214 21.4976C27.9116 21.2074 27.9119 20.7351 27.6217 20.445ZM25.0884 15.3762C25.7745 14.6904 25.7742 13.5745 25.0884 12.8887C24.7453 12.5458 24.2948 12.3745 23.844 12.3745C23.3932 12.3745 22.9427 12.5458 22.5997 12.8887C21.9135 13.5745 21.9135 14.6904 22.5997 15.3762C23.2858 16.0617 24.4022 16.0617 25.0884 15.3762ZM29.8198 7.8199C30.1104 8.11034 30.5829 8.10972 30.8731 7.8199C31.1634 7.52978 31.1634 7.05748 30.8731 6.76737C30.728 6.62231 30.5373 6.54962 30.3466 6.54962C30.1559 6.54962 29.9652 6.62231 29.8198 6.76737C29.5295 7.05748 29.5295 7.52978 29.8198 7.8199Z'

const SERVICE_SLUGS = [
  'application-development',
  'data-and-ai',
  'servicenow',
  'team-extension',
  'full-delivery-teams',
  'consulting',
  'tenders',
] as const

const LOCALES = ['en', 'cs', 'sk', 'de'] as const

export default function Navbar() {
  const t = useTranslations('Navbar')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  const serviceDropdown = SERVICE_SLUGS.map((slug) => ({
    label: t(`serviceItems.${slug}`),
    href: `/services/${slug}` as const,
  }))

  const otherNavLinks = [
    { label: t('howWeWork'), href: '/#how-we-work' as const },
    { label: t('industries'), href: '/#industries' as const },
    { label: t('whyClariva'), href: '/#why-clariva' as const },
    { label: t('contact'), href: '/#contact' as const },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink/95 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg width="28" height="26" viewBox="0 0 43 39" fill="none">
            <path d={MARK_PATH} fill="url(#navGold)" />
            <defs>
              <linearGradient id="navGold" x1="12.2026" y1="36.1418" x2="32.4904" y2="-1.33861" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFCA66" />
                <stop offset="1" stopColor="#BE8D2F" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-syne font-bold text-[18px] text-white tracking-tight">Clariva</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1.5 text-[14px] font-dm text-white/55 hover:text-white transition-colors duration-200"
            >
              {t('services')}
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[220px] rounded-xl overflow-hidden shadow-2xl z-50"
                  style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.14 }}
                >
                  {serviceDropdown.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-[13px] font-dm text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-150 ${
                        i < serviceDropdown.length - 1 ? 'border-b border-white/[0.04]' : ''
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other links */}
          {otherNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] font-dm text-white/55 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {/* Locale switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-[12px] font-dm font-semibold text-white/40 hover:text-white/70 uppercase tracking-wider transition-colors duration-200"
            >
              {locale}
              <ChevronDown
                size={10}
                className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden shadow-xl z-50"
                  style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.08)', minWidth: 72 }}
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                >
                  {LOCALES.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        router.push(pathname, { locale: loc })
                        setLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-[12px] font-dm font-semibold uppercase tracking-wider transition-colors duration-150 ${
                        loc === locale
                          ? 'text-gold'
                          : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center px-5 py-2.5 bg-gold text-ink text-[13px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:scale-[1.02]"
          >
            {t('letsTalk')}
          </Link>
        </div>

        <button
          className="lg:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-ink/98 border-t border-white/[0.06]"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {/* Services expandable */}
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between text-white/65 hover:text-white font-dm text-[15px] py-2.5 transition-colors"
              >
                {t('services')}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-3 border-l border-white/[0.06] ml-1 mb-1"
                  >
                    {serviceDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 text-white/45 hover:text-white font-dm text-[14px] py-2 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {otherNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/65 hover:text-white font-dm text-[15px] py-2.5 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile locale switcher */}
              <div className="flex items-center gap-3 pt-2 mt-1 border-t border-white/[0.06]">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      router.push(pathname, { locale: loc })
                      setMobileOpen(false)
                    }}
                    className={`text-[12px] font-dm font-semibold uppercase tracking-wider transition-colors duration-150 ${
                      loc === locale ? 'text-gold' : 'text-white/35 hover:text-white/65'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-5 py-3 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full text-center"
              >
                {t('letsTalk')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
