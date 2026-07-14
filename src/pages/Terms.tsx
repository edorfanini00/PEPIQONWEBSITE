import { ContactEmail, LegalPage, Section } from '../components/Legal'

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" effectiveDate="July 11, 2026">
      <section>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) govern your use of
          the IQONIC application (the &ldquo;App&rdquo;), operated by IQON
          Health (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          By downloading, accessing, or using the App you agree to be bound by
          these Terms. If you do not agree, do not use the App.
        </p>
      </section>

      <Section title="Eligibility">
        <p>
          You must be at least eighteen (18) years old to use the App. By
          using the App you represent that you meet this requirement and that
          any information you provide is accurate and complete.
        </p>
      </Section>

      <Section title="Accounts">
        <p>
          Some features require an account. You are responsible for keeping
          your credentials confidential and for all activity under your
          account. Notify us immediately of any unauthorized use. We may
          suspend or terminate accounts that violate these Terms.
        </p>
      </Section>

      <Section title="No medical advice">
        <p>
          The App provides information and tools only. It does not provide
          medical advice, diagnosis, or treatment, and is not a substitute for
          professional medical advice. Always consult a qualified healthcare
          provider with any questions about a medical condition, and never
          disregard professional advice because of something you have seen in
          the App.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p className="mb-3">You agree not to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>use the App for any unlawful purpose;</li>
          <li>
            interfere with or disrupt the App, its servers, or its security
            features;
          </li>
          <li>
            attempt to access accounts or data that do not belong to you; or
          </li>
          <li>
            use automated tools to scrape, crawl, or copy content from the
            App.
          </li>
        </ul>
      </Section>

      <Section title="Intellectual property">
        <p>
          The App, including its design, text, graphics, logos, and software,
          is owned by or licensed to IQON Health and protected by intellectual
          property laws. We grant you a limited, non-exclusive,
          non-transferable license to use the App for personal, non-commercial
          purposes. No other rights are granted.
        </p>
      </Section>

      <Section title="Disclaimers">
        <p>
          The App is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; without warranties of any kind, express or implied,
          including merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the App will be
          uninterrupted, error-free, or secure.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, we will not be liable for
          any indirect, incidental, special, consequential, or punitive
          damages, or any loss of profits or data, arising from or related to
          your use of the App.
        </p>
      </Section>

      <Section title="Indemnification">
        <p>
          You agree to indemnify and hold us harmless from any claims,
          damages, and expenses (including reasonable attorneys&rsquo; fees)
          arising from your breach of these Terms or misuse of the App.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          We may suspend or terminate your access to the App at any time for
          conduct that violates these Terms or is otherwise harmful. You may
          stop using the App and delete your account at any time.
        </p>
      </Section>

      <Section title="Governing law">
        <p>
          These Terms are governed by the laws of the United States and the
          state in which IQON Health operates, without regard to conflict of
          law principles. Any disputes will be resolved in the courts of that
          jurisdiction.
        </p>
      </Section>

      <Section title="Changes to these Terms">
        <p>
          We may update these Terms from time to time. Material changes will
          be reflected by updating the effective date above. Continued use of
          the App after changes take effect constitutes acceptance of the
          updated Terms.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these Terms? Contact us at <ContactEmail />.
        </p>
      </Section>
    </LegalPage>
  )
}
