import { APP_STORE_URL } from './site'

// Monthly US price scheduled in App Store Connect for October 12, 2026.
// Recheck prices before changing these answers. Do not infer ratings from the hero stars.
export const homeFaqs = [
  {
    id: 'what',
    question: 'What is IQONIC?',
    answer: 'IQONIC is a peptide protocol tracking app by IQON Health. It brings research protocol schedules, logging, reconstitution calculations, nutrition, hydration, activity, sleep, and menstrual cycle tracking into one place. It is an organizational and educational tool, not a source of medical advice.',
  },
  {
    id: 'calculator',
    question: 'How does the reconstitution calculator work?',
    answer: 'The IQONIC reconstitution calculator uses the values you enter to calculate concentration and volume. It keeps the calculation breakdown and supply estimator together with your protocol records. It does not decide which protocol is appropriate for you.',
  },
  {
    id: 'health',
    question: 'Can I connect IQONIC to Apple Health?',
    answer: 'Yes. IQONIC supports Apple Health for steps, calories burned, and sleep. You choose which permissions to allow, so you can review those records alongside nutrition, hydration, and your other entries.',
  },
  {
    id: 'download',
    question: 'Where can I download IQONIC?',
    answer: 'IQONIC is available on the App Store for iPhone and iPad. The App Store listing shows current compatibility, subscription options, and availability in your region.',
    link: { href: APP_STORE_URL, text: 'View IQONIC on the App Store' },
  },
  {
    id: 'pricing',
    question: 'How much does IQONIC cost?',
    answer: 'IQONIC is free to download with in-app purchases. Premium Monthly is scheduled to be $8.99 USD/month in the US effective October 12, 2026. Premium Annual remains $49.99 USD/year in the US. Prices vary by region and may change; the current App Store price shown before subscribing is authoritative.',
    link: { href: APP_STORE_URL, text: 'Check current App Store pricing' },
  },
  {
    id: 'cancel',
    question: 'How do I cancel IQONIC Premium?',
    answer: 'Manage or cancel IQONIC Premium in your Apple account subscription settings. Subscriptions renew automatically unless canceled at least 24 hours before the current period ends.',
    link: { href: '/terms', text: 'Read the subscription terms' },
  },
  {
    id: 'medical',
    question: 'Does IQONIC provide medical advice?',
    answer: 'No. IQONIC is for organization and education. It does not prescribe treatment or determine what is safe for you. Discuss medical decisions with a qualified healthcare professional.',
  },
]
