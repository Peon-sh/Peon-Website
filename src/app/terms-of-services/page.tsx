import type { Metadata } from 'next';
import { LegalPage } from '@/components/marketing/legal-page';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    "Peon's terms of service: rules for using the open-source deployment platform at peon.sh, including billing, acceptable use, and account rights.",
  alternates: { canonical: '/terms-of-services' },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 10, 2026"
      intro="These Terms of Service (“Terms”) govern your access to and use of Peon’s websites, applications, and related services at peon.sh and app.peon.sh (the “Service”). By creating an account or using the Service, you agree to these Terms. If you do not agree, do not use the Service."
      sections={[
        {
          title: 'The Service',
          paragraphs: [
            'Peon is an open-source, self-hostable deployment platform that helps you deploy and manage applications, databases, and services on servers you own or control. Features, pricing, and availability may change over time. We may offer free, paid, beta, or self-hosted options with different capabilities.',
            'Open-source components of Peon are also subject to their applicable software licenses. These Terms govern the hosted Service and our websites; they do not replace open-source license terms for code you obtain from our public repositories.',
          ],
        },
        {
          title: 'Eligibility and accounts',
          paragraphs: [
            'You must be at least 16 years old and able to form a binding contract to use the Service. You are responsible for the accuracy of account information and for keeping credentials secure. You must promptly notify us at support@peon.sh of any unauthorized use of your account.',
            'If you use the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms, and “you” includes that organization.',
          ],
        },
        {
          title: 'Your servers and content',
          paragraphs: [
            'You retain ownership of your applications, data, configuration, and content (“Customer Content”). You grant Peon a limited license to host, transmit, and process Customer Content solely as needed to provide the Service you request.',
            'You are solely responsible for servers you connect to Peon, including security, backups, compliance, and lawful use. You represent that you have all rights and permissions needed to grant Peon access to those servers and to deploy Customer Content on them.',
          ],
        },
        {
          title: 'Acceptable use',
          paragraphs: ['You agree not to use the Service to:'],
          list: [
            'Violate any law, regulation, or third-party rights.',
            'Distribute malware, run unauthorized scanning or attacks, or interfere with others’ systems.',
            'Mine cryptocurrency or run abusive high-load workloads that harm shared infrastructure we operate, unless expressly permitted for your plan.',
            'Attempt to gain unauthorized access to the Service, other accounts, or related systems.',
            'Resell, sublicense, or provide the Service to third parties except as expressly allowed by your plan or a written agreement with us.',
            'Misrepresent your identity or affiliation, or abuse support or billing systems.',
          ],
        },
        {
          title: 'Plans, fees, and billing',
          paragraphs: [
            'Paid features are billed according to the plan and pricing shown at purchase or in your account. Fees are generally charged in advance on a recurring basis unless stated otherwise. Taxes may apply.',
            'You authorize us and our payment processors to charge your selected payment method for applicable fees. Failure to pay may result in suspension or termination of paid features. Except where required by law or stated otherwise at purchase, fees are non-refundable.',
            'We may change pricing with reasonable notice. Continued use after a price change takes effect constitutes acceptance of the new pricing for subsequent billing periods.',
          ],
        },
        {
          title: 'Third-party services',
          paragraphs: [
            'The Service may integrate with third-party products (for example Git providers, cloud servers, DNS, or payment processors). Your use of those products is governed by their own terms and privacy policies. Peon is not responsible for third-party services you choose to connect.',
          ],
        },
        {
          title: 'Intellectual property',
          paragraphs: [
            'Peon and its licensors own the Service, branding, documentation, and related intellectual property, excluding Customer Content and open-source components licensed separately. These Terms do not grant you any right to use Peon trademarks except as needed to identify your use of the Service in a factual way.',
          ],
        },
        {
          title: 'Confidentiality',
          paragraphs: [
            'Each party may receive non-public information from the other. The receiving party will use that information only to perform under these Terms and will protect it with reasonable care. This obligation does not apply to information that is public, independently developed, or rightfully received from a third party without confidentiality duties.',
          ],
        },
        {
          title: 'Disclaimer of warranties',
          paragraphs: [
            'THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, PEON DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS, OR THAT DEPLOYMENTS TO YOUR SERVERS WILL SUCCEED IN EVERY ENVIRONMENT.',
          ],
        },
        {
          title: 'Limitation of liability',
          paragraphs: [
            'TO THE MAXIMUM EXTENT PERMITTED BY LAW, PEON AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.',
            'OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE WILL NOT EXCEED THE AMOUNTS YOU PAID TO PEON FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO THE CLAIM. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE CASES, OUR LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW.',
          ],
        },
        {
          title: 'Indemnification',
          paragraphs: [
            'You will defend, indemnify, and hold harmless Peon and its affiliates from and against claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising from your Customer Content, your servers, your use of the Service, or your violation of these Terms or applicable law.',
          ],
        },
        {
          title: 'Suspension and termination',
          paragraphs: [
            'You may stop using the Service at any time and may request account deletion through the product or by contacting support@peon.sh. We may suspend or terminate access if you breach these Terms, create risk or legal exposure for us or others, or fail to pay fees when due.',
            'Upon termination, your right to use the hosted Service ends. Provisions that by their nature should survive (including ownership, disclaimers, limitations of liability, and indemnity) will survive termination.',
          ],
        },
        {
          title: 'Changes to the Service and Terms',
          paragraphs: [
            'We may modify the Service and these Terms. We will post updated Terms on this page and update the “Last updated” date. If a change is material, we may provide additional notice. Continued use after changes become effective constitutes acceptance of the revised Terms.',
          ],
        },
        {
          title: 'Governing law',
          paragraphs: [
            'These Terms are governed by the laws applicable in the jurisdiction where Peon operates its primary business, without regard to conflict-of-law principles, except where mandatory consumer protection laws in your country of residence require otherwise. Courts in that jurisdiction will have exclusive jurisdiction over disputes, subject to those mandatory protections.',
          ],
        },
        {
          title: 'Contact',
          paragraphs: [
            'Questions about these Terms: support@peon.sh.',
          ],
        },
      ]}
    />
  );
}
