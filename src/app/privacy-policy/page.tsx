import type { Metadata } from 'next';
import { LegalPage } from '@/components/marketing/legal-page';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Peon collects, uses, and protects your personal information when you use peon.sh and the Peon platform.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 10, 2026"
      intro="This Privacy Policy explains how Peon (“Peon”, “we”, “us”, or “our”) collects, uses, stores, and shares information when you visit peon.sh, use app.peon.sh, or otherwise interact with our services (collectively, the “Service”)."
      sections={[
        {
          title: 'Who we are',
          paragraphs: [
            'Peon is an open-source, self-hostable deployment platform. We operate the marketing site at peon.sh and the hosted application at app.peon.sh. Questions about this policy can be sent to support@peon.sh.',
          ],
        },
        {
          title: 'Information we collect',
          paragraphs: [
            'We collect information you provide directly and information generated when you use the Service.',
          ],
          list: [
            'Account details such as name, email address, and authentication credentials when you register or sign in.',
            'Billing and payment metadata processed by our payment providers (we do not store full card numbers).',
            'Server connection details you supply (for example SSH host, port, and related configuration) so we can manage deployments on infrastructure you control.',
            'Project, deployment, and usage data needed to operate the platform (builds, logs metadata, resource configuration).',
            'Support communications when you contact us.',
            'Technical data such as IP address, browser type, device information, and approximate location derived from IP, collected through standard server logs and security tooling.',
          ],
        },
        {
          title: 'Google Sign-In and Google user data',
          paragraphs: [
            'Peon offers optional Google Sign-In so you can create an account or log in with your Google account. When you use Google Sign-In, Peon receives basic profile information from Google (typically your name and email address) solely to create, identify, and authenticate your Peon account.',
            'Peon does not request access to Gmail, Google Drive, Calendar, Contacts, or other Google services. We do not use Google user data for advertising, and we do not sell it. You can also register with email and password instead of Google.',
          ],
        },
        {
          title: 'How we use information',
          paragraphs: ['We use the information we collect to:'],
          list: [
            'Provide, operate, secure, and improve the Service.',
            'Authenticate users (including via Google Sign-In), manage teams, and process subscriptions or project billing.',
            'Deploy and manage applications on servers you connect to Peon.',
            'Send transactional messages (account, billing, security, and product notices).',
            'Respond to support requests and investigate abuse or security incidents.',
            'Comply with legal obligations and enforce our Terms of Service.',
          ],
        },
        {
          title: 'Self-hosted workloads and your servers',
          paragraphs: [
            'Peon connects to servers you own or control. Application source code, environment variables, databases, and runtime data that live on your servers remain under your control. We access those systems only as needed to perform the actions you request (for example deploy, restart, or inspect logs) and to operate the Service securely.',
            'You are responsible for ensuring you have the right to connect those servers and for the content and data of applications you deploy.',
          ],
        },
        {
          title: 'Cookies and similar technologies',
          paragraphs: [
            'We use cookies and similar technologies that are necessary for authentication, session management, security, and remembering preferences. We do not use third-party advertising cookies on peon.sh or app.peon.sh.',
            'If we introduce optional analytics in the future, we will update this policy and, where required, provide choices consistent with applicable law.',
          ],
        },
        {
          title: 'How we share information',
          paragraphs: [
            'We do not sell your personal information. We may share information with:',
          ],
          list: [
            'Service providers that help us operate the Service (for example hosting, email delivery, payment processing, and error monitoring), under contractual obligations to protect your data.',
            'Team members you invite to your Peon organization, according to roles you configure.',
            'Authorities when required by law, legal process, or to protect the rights, safety, or security of Peon, our users, or the public.',
            'A successor entity in connection with a merger, acquisition, or sale of assets, subject to appropriate confidentiality protections.',
          ],
        },
        {
          title: 'Data retention',
          paragraphs: [
            'We retain account and Service data for as long as your account is active and as needed to provide the Service. We may retain certain records longer when required for legal, tax, security, or dispute-resolution purposes. When you delete your account, we delete or anonymize personal data associated with it within a reasonable period, except where retention is required by law or for legitimate security needs.',
          ],
        },
        {
          title: 'Security',
          paragraphs: [
            'We implement administrative, technical, and organizational measures designed to protect personal information, including encryption in transit, access controls, and least-privilege practices for operational access. No method of transmission or storage is completely secure; you use the Service at your own risk subject to these safeguards.',
          ],
        },
        {
          title: 'International transfers',
          paragraphs: [
            'We may process and store information in countries other than where you live. Where we transfer personal data internationally, we take steps intended to ensure an appropriate level of protection consistent with this policy and applicable law.',
          ],
        },
        {
          title: 'Your rights',
          paragraphs: [
            'Depending on where you live, you may have rights to access, correct, delete, or export your personal information, or to object to or restrict certain processing. To exercise these rights, contact support@peon.sh. We may need to verify your identity before fulfilling a request. You may also have the right to lodge a complaint with a supervisory authority.',
          ],
        },
        {
          title: 'Children',
          paragraphs: [
            'The Service is not directed to children under 16, and we do not knowingly collect personal information from them. If you believe a child has provided us personal information, contact support@peon.sh and we will take appropriate steps to delete it.',
          ],
        },
        {
          title: 'Changes to this policy',
          paragraphs: [
            'We may update this Privacy Policy from time to time. We will post the updated version on this page and revise the “Last updated” date. Material changes may also be communicated by email or an in-product notice when appropriate. Continued use of the Service after changes become effective constitutes acceptance of the updated policy.',
          ],
        },
        {
          title: 'Contact',
          paragraphs: [
            'For privacy questions or requests, email support@peon.sh.',
          ],
        },
      ]}
    />
  );
}
