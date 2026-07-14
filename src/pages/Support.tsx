const faqs = [
  {
    q: 'How do I create an account?',
    a: 'Open the app and tap "Sign up". Enter your name, email address, and a password, then confirm your email using the link we send you. You can start using IQONIC right away.',
  },
  {
    q: 'How do I manage my profile?',
    a: 'Go to the Account tab in the app to update your name, email, and any profile information you\'ve chosen to add. Changes are saved instantly across your devices.',
  },
  {
    q: 'How do notifications work?',
    a: 'IQONIC only sends notifications you opt into. You can turn them on or off anytime from Account → Notifications in the app, or from your device\'s system settings.',
  },
  {
    q: 'I forgot my password. How do I reset it?',
    a: 'On the sign-in screen, tap "Forgot password?" and enter your email address. We\'ll send you a secure link to choose a new password. The link expires after a short time for your security.',
  },
  {
    q: 'How do I delete my account?',
    a: 'You can request account deletion from Account → Delete account in the app, or by emailing us at info@iqonhealth.com. Your account and associated personal data will be deleted as described in our Privacy Policy.',
  },
]

export default function Support() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob blob-blue right-[-10%] top-[-5%] h-[22rem] w-[22rem]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[720px] px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">Support</p>
        <h1 className="text-3xl text-ink md:text-4xl">How can we help?</h1>
        <p className="mt-4 text-lg leading-relaxed text-sage">
          Find quick answers below, or reach out to our team directly — we're
          happy to help with anything about your IQONIC account.
        </p>

        <section className="mt-12">
          <h2 className="mb-6 text-xl text-ink">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-hairline bg-cream px-6 py-5 transition-shadow duration-300 open:shadow-[0_8px_32px_rgba(18,32,28,0.06)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="flex-none text-sage transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-sage">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[28px] bg-dark p-8 text-center md:p-10">
          <p className="eyebrow mb-3 !text-lime">Contact us</p>
          <h2 className="text-xl text-bone">Still need help?</h2>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-bone/70">
            Email us and we'll get back to you within 1–2 business days.
          </p>
          <a
            href="mailto:info@iqonhealth.com"
            className="btn-pill hover-lift mt-6 !bg-lime !text-ink"
          >
            info@iqonhealth.com
          </a>
        </section>
      </div>
    </div>
  )
}
