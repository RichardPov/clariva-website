'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import BinaryDecoration from '@/components/BinaryDecoration'

export default function Contact() {
  const t = useTranslations('Contact')
  const form_services = t.raw('form.services') as string[]

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputBase =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] font-dm placeholder:text-white/25 focus:outline-none focus:border-gold/40 focus:bg-white/7 transition-all duration-200'

  return (
    <section id="contact" className="bg-ink py-24 lg:py-32 relative overflow-hidden">
      <BinaryDecoration className="top-6 left-0 hidden lg:block" side="left" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 80% 60%, rgba(255,202,102,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-6 h-[1.5px] bg-gold" />
            <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
              {t('label')}
            </span>
            <div className="w-6 h-[1.5px] bg-gold" />
          </motion.div>
          <motion.h2
            className="font-syne font-bold text-3xl md:text-4xl lg:text-[50px] text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block leading-[1.1]">{t('headingLine1')}</span>
            <span className="block text-gradient-gold mt-[0.18em] leading-[1.35]">{t('headingLine2')}</span>
          </motion.h2>
          <motion.p
            className="font-dm text-white/45 text-[15px] max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtext')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="font-dm text-white/55 text-[16px] leading-relaxed mb-8">
              {t('body')}
            </p>

            <div className="space-y-4 mb-10">
              {[
                { label: t('emailLabel'), value: 'hello@clariva.eu', href: 'mailto:hello@clariva.eu' },
                { label: t('linkedinLabel'), value: 'clariva', href: 'https://linkedin.com/company/clariva' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-dm text-white/30 text-[13px] w-16">{item.label}</span>
                  <a
                    href={item.href}
                    className="font-dm text-white/60 text-[14px] hover:text-gold transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3 className="font-syne font-semibold text-white text-[16px] mb-2">
                {t('joinTeam.heading')}
              </h3>
              <p className="font-dm text-white/40 text-[13px] leading-relaxed mb-4">
                {t('joinTeam.body')}
              </p>
              <a
                href="mailto:careers@clariva.eu"
                className="inline-flex items-center gap-1.5 text-gold text-[13px] font-dm font-medium hover:gap-2.5 transition-all duration-200"
              >
                {t('joinTeam.cta')} <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {submitted ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{
                  background: 'rgba(255,202,102,0.06)',
                  border: '1px solid rgba(255,202,102,0.2)',
                }}
              >
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-syne font-bold text-white text-xl mb-2">{t('successTitle')}</h3>
                <p className="font-dm text-white/50 text-[14px]">{t('successBody')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-dm text-[12px] text-white/40 mb-1.5 tracking-wide">
                      {t('form.nameLabel')}
                    </label>
                    <input
                      required
                      placeholder={t('form.namePlaceholder')}
                      className={inputBase}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-dm text-[12px] text-white/40 mb-1.5 tracking-wide">
                      {t('form.companyLabel')}
                    </label>
                    <input
                      required
                      placeholder={t('form.companyPlaceholder')}
                      className={inputBase}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-dm text-[12px] text-white/40 mb-1.5 tracking-wide">
                    {t('form.emailLabel')}
                  </label>
                  <input
                    required
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    className={inputBase}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block font-dm text-[12px] text-white/40 mb-1.5 tracking-wide">
                    {t('form.serviceLabel')}
                  </label>
                  <select
                    className={inputBase + ' appearance-none cursor-pointer'}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <option value="" style={{ background: '#0A0A0B' }}>
                      {t('form.servicePlaceholder')}
                    </option>
                    {form_services.map((s) => (
                      <option key={s} value={s} style={{ background: '#0A0A0B' }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-dm text-[12px] text-white/40 mb-1.5 tracking-wide">
                    {t('form.messageLabel')}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t('form.messagePlaceholder')}
                    className={inputBase + ' resize-none'}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-xl hover:brightness-110 transition-all duration-200 hover:scale-[1.01]"
                >
                  {t('form.submitButton')}
                  <Send size={15} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
