import { ContactEmail, LegalPage, Section } from '../components/Legal'

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="July 11, 2026">
      <section>
        <p>
          This Privacy Policy describes how IQONIC (the &ldquo;App&rdquo;),
          operated by IQON Health (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;), collects, uses, and protects your personal
          information when you use the App. By using the App you agree to the
          practices described in this policy.
        </p>
      </section>

      <Section title="Information we collect">
        <p className="mb-3">We collect the following categories of information:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="font-medium text-ink">Account information</strong>{' '}
            — name, email address, and password when you create an account.
          </li>
          <li>
            <strong className="font-medium text-ink">Profile information</strong>{' '}
            — any details you choose to add to your profile within the App.
          </li>
          <li>
            <strong className="font-medium text-ink">Device and usage data</strong>{' '}
            — device type, operating system, app version, IP address, and
            in-app activity collected automatically to keep the App secure and
            working properly.
          </li>
        </ul>
      </Section>

      <Section title="How we use your information">
        <p>
          We use your information to provide and improve the App, create and
          manage your account, respond to support requests, send notifications
          you have opted into, maintain security and prevent fraud, and comply
          with legal obligations.
        </p>
      </Section>

      <Section title="Sharing and disclosure">
        <p>
          We do not sell your personal information. We share it only with
          trusted service providers who help us operate the App — such as
          hosting, email, and analytics services — and only to the extent
          needed to provide their services, or where disclosure is required by
          law.
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          We keep your information for as long as your account is active or as
          needed to provide the App and meet legal requirements. You may
          request deletion of your account and associated personal data at any
          time by contacting us.
        </p>
      </Section>

      <Section title="Security">
        <p>
          We use reasonable technical and organizational measures to protect
          your data, including encryption in transit. No system can be
          guaranteed completely secure, but we work to protect your
          information against unauthorized access, alteration, or loss.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Depending on where you live, you may have the right to access,
          correct, or delete your personal information. To exercise any of
          these rights, contact us at the address below and we will respond
          within the timeframe required by applicable law.
        </p>
      </Section>

      <Section title="Minors">
        <p>
          The App is intended for adults. It is not directed to individuals
          under eighteen (18) years of age, and we do not knowingly collect
          personal information from them. If you believe a minor has provided
          us information, contact us and we will delete it.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. Material
          changes will be reflected by updating the effective date above.
          Continued use of the App after changes take effect constitutes
          acceptance of the updated policy.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          For questions or requests regarding this policy or your personal
          information, contact us at <ContactEmail />.
        </p>
      </Section>
    </LegalPage>
  )
}
