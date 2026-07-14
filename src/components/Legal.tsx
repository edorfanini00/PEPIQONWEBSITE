import type { ReactNode } from 'react'

export function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string
  effectiveDate: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-6 py-16 md:py-24">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="text-3xl text-ink md:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-sage">Effective date: {effectiveDate}</p>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-sage md:text-base">
        {children}
      </div>
    </div>
  )
}

export function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg text-ink">{title}</h2>
      {children}
    </section>
  )
}

export function ContactEmail() {
  return (
    <a
      href="mailto:info@iqonhealth.com"
      className="text-ink underline transition-colors duration-300 hover:text-sage"
    >
      info@iqonhealth.com
    </a>
  )
}
