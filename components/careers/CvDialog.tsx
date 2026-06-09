'use client'

import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, X, UploadCloud, FileText, Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { upload } from '@vercel/blob/client'

const MAX_BYTES = 5 * 1024 * 1024
const ACCEPTED = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

type Status = 'idle' | 'submitting' | 'success'

export default function CvDialog({
  positionId,
  positionTitle,
}: {
  positionId: string
  positionTitle: string
}) {
  const t = useTranslations('Careers.cv')
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // form state
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  if (typeof window !== 'undefined' && !mounted) setMounted(true)

  function close() {
    if (status === 'submitting') return
    setOpen(false)
  }

  function reset() {
    setEmail('')
    setPhone('')
    setMessage('')
    setFile(null)
    setConsent(false)
    setError('')
    setStatus('idle')
  }

  function pickFile(f: File | null) {
    setError('')
    if (!f) return
    if (!ACCEPTED.includes(f.type)) {
      setError(t('errorType'))
      return
    }
    if (f.size > MAX_BYTES) {
      setError(t('errorSize'))
      return
    }
    setFile(f)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim()) return setError(t('errorEmail'))
    if (!file) return setError(t('errorNoFile'))
    if (!consent) return setError(t('errorConsent'))

    setStatus('submitting')
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/cv/upload',
        contentType: file.type,
      })

      const res = await fetch('/api/cv/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          message,
          cvUrl: blob.url,
          cvFilename: file.name,
          positionId,
          positionTitle,
        }),
      })
      if (!res.ok) throw new Error('submit failed')
      setStatus('success')
    } catch (err) {
      setStatus('idle')
      const msg = err instanceof Error ? err.message : ''
      setError(msg ? `${t('errorGeneric')} (${msg})` : t('errorGeneric'))
    }
  }

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-ink-2 border border-white/10 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {status === 'success' ? (
              <div className="p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={28} className="text-gold" />
                </div>
                <h3 className="font-syne font-bold text-white text-[22px] mb-2">
                  {t('successTitle')}
                </h3>
                <p className="font-dm text-white/50 text-[14px] mb-6">
                  {t('successBody')}
                </p>
                <button
                  onClick={() => {
                    reset()
                    setOpen(false)
                  }}
                  className="px-6 py-3 bg-gold text-ink text-[13px] font-dm font-semibold rounded-full hover:brightness-110 transition-all"
                >
                  {t('done')}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-7 lg:p-8">
                <h3 className="font-syne font-bold text-white text-[24px] mb-1">
                  {t('title')}
                </h3>
                <p className="font-dm text-white/45 text-[13px] mb-6">
                  {positionTitle}
                </p>

                <div className="space-y-4">
                  <Field label={t('email')}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="cv-input"
                      required
                    />
                  </Field>
                  <Field label={t('phone')}>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      className="cv-input"
                    />
                  </Field>
                  <Field label={t('message')}>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('messagePlaceholder')}
                      rows={3}
                      className="cv-input resize-none"
                    />
                  </Field>

                  {/* File dropzone */}
                  <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      pickFile(e.dataTransfer.files?.[0] ?? null)
                    }}
                    className="rounded-xl border border-dashed border-white/15 hover:border-gold/40 transition-colors cursor-pointer p-6 text-center"
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    />
                    {file ? (
                      <div className="flex items-center justify-center gap-2 text-white/70 text-[14px]">
                        <FileText size={18} className="text-gold" />
                        {file.name}
                      </div>
                    ) : (
                      <>
                        <UploadCloud
                          size={28}
                          className="text-gold/60 mx-auto mb-2"
                        />
                        <p className="font-dm text-white/60 text-[14px]">
                          {t('uploadPrompt')}
                        </p>
                        <p className="font-dm text-white/30 text-[12px] mt-1">
                          {t('uploadHint')}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[#FFCA66] w-4 h-4"
                    />
                    <span className="font-dm text-white/50 text-[13px] leading-relaxed">
                      {t('consent')}
                    </span>
                  </label>

                  {error && (
                    <p className="font-dm text-red-400 text-[13px]">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all disabled:opacity-60"
                  >
                    {status === 'submitting' && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {t('submit')}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        onClick={() => {
          reset()
          setOpen(true)
        }}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:scale-[1.02]"
      >
        <Mail size={15} />
        {t('trigger')}
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block font-dm text-white/70 text-[13px] font-medium mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}
