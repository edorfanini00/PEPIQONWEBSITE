export const APP_STORE_URL = 'https://apps.apple.com/us/app/iqonic/id6765689488'
export const PRODUCTION_ORIGIN = 'https://www.iqonicapp.com'

export const legalAliases: Record<string, string> = {
  '/privacy-policy': '/privacy',
  '/privacypolicy': '/privacy',
  '/privacy_policy': '/privacy',
  '/legal/privacy': '/privacy',
  '/legal/privacy-policy': '/privacy',
  '/policies/privacy': '/privacy',
  '/terms-of-service': '/terms',
  '/terms-of-use': '/terms',
  '/termsofservice': '/terms',
  '/terms_of_service': '/terms',
  '/tos': '/terms',
  '/eula': '/terms',
  '/legal/terms': '/terms',
  '/legal/terms-of-service': '/terms',
  '/policies/terms': '/terms',
}

export const pageSeo: Record<string, { title: string; description: string; label: string; source: string }> = {
  '/': {
    title: 'IQONIC | Peptide Tracking App & Reconstitution Calculator',
    description: 'Organize peptide research protocols, reconstitution calculations, nutrition and cycle tracking in IQONIC by IQON Health. Explore the app and App Store pricing.',
    label: 'IQONIC',
    source: 'src/pages/Home.tsx',
  },
  '/support': {
    title: 'IQONIC App Support | Account, Password & Contact Help',
    description: 'Get help with your IQONIC account, password reset, notifications and account deletion. Contact IQON Health support at info@iqonhealth.com.',
    label: 'Support',
    source: 'src/pages/Support.tsx',
  },
  '/privacy': {
    title: 'IQONIC Privacy Policy | IQON Health',
    description: 'Read how IQON Health collects, uses and protects IQONIC account information, subscription status and usage data, and how to contact us about your privacy.',
    label: 'Privacy Policy',
    source: 'src/pages/Privacy.tsx',
  },
  '/terms': {
    title: 'IQONIC Terms of Service | Subscriptions & App Use',
    description: 'Read the IQONIC terms for app use, eligibility, subscriptions, payments, cancellation and support. IQONIC is operated by IQON Health.',
    label: 'Terms of Service',
    source: 'src/pages/Terms.tsx',
  },
}
