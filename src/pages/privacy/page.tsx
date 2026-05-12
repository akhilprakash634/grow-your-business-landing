import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO } from '../../utils/seo';

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy | Grow Your Business',
    description: 'Learn how Grow Your Business collects, uses, and protects your personal information.',
    canonical: '/privacy-policy',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Privacy Policy</h1>
          <p className="text-gray-400 mb-8 italic">Effective Date: 12 May 2026</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-12 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Grow Your Business ("we", "our", "us") operates the website growyourbusiness.today and provides IT services, website design, digital marketing, and related digital products to clients in Kerala, India and the UAE.
              </p>
              <p className="mt-4">
                We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, with whom we share it, and your rights in relation to it.
              </p>
              <p className="mt-4">
                By visiting our website or engaging our services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree, please discontinue use of our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.1 Information You Provide to Us</h3>
                  <p>We collect personal information that you voluntarily provide when you:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Fill in a contact or enquiry form on our website</li>
                    <li>Purchase a service or digital product</li>
                    <li>Communicate with us via email, WhatsApp, phone, or social media</li>
                    <li>Subscribe to our newsletter or marketing communications</li>
                  </ul>
                  <p className="mt-4">
                    This may include: your name, email address, phone number, business name, billing address, payment details (processed securely via third-party gateways), and any other information you choose to provide.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.2 Information Collected Automatically</h3>
                  <p>When you visit our website, we and our third-party partners may automatically collect:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>IP address and approximate geographic location</li>
                    <li>Browser type, version, and operating system</li>
                    <li>Pages visited, time spent on pages, and referring URLs</li>
                    <li>Device identifiers and cookie data</li>
                  </ul>
                  <p className="mt-4">
                    This information is collected through cookies, web beacons, pixels, and similar tracking technologies (see Section 6 on Cookies).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">2.3 Information from Third Parties</h3>
                  <p>
                    We may receive information about you from third-party platforms such as Facebook/Meta, Google, and WhatsApp when you interact with our advertisements or pages on those platforms, subject to their own privacy policies.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>To provide, manage, and deliver the services or digital products you have purchased</li>
                <li>To process payments and send invoices, receipts, and order confirmations</li>
                <li>To respond to your enquiries, support requests, and communications</li>
                <li>To send you service updates, project progress notifications, and important notices</li>
                <li>To send marketing communications about our services, offers, and resources — where you have consented or where permitted by law</li>
                <li>To improve our website, services, and user experience through analytics</li>
                <li>To comply with legal obligations, resolve disputes, and enforce our agreements</li>
                <li>To detect and prevent fraud or other harmful activities</li>
              </ul>
              <p className="mt-4">
                We will only use your personal information for the purposes for which it was collected unless we reasonably consider that we need to use it for another reason compatible with the original purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Legal Basis for Processing</h2>
              <p>We process your personal data on the following legal grounds:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Contract performance:</strong> to fulfil our service obligations to you</li>
                <li><strong>Legitimate interests:</strong> to improve our services, prevent fraud, and conduct marketing to existing clients</li>
                <li><strong>Consent:</strong> where you have given explicit consent, such as subscribing to our newsletter</li>
                <li><strong>Legal obligation:</strong> where processing is required by applicable law in India or the UAE</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Sharing Your Information</h2>
              <p>We do not sell your personal data. We may share your information with:</p>
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.1 Service Providers</h3>
                  <p>Trusted third-party vendors who assist us in operating our business, including:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Payment processors (e.g. Razorpay, PayU, or similar gateways)</li>
                    <li>Website hosting and cloud storage providers</li>
                    <li>Email and communication tools</li>
                    <li>Analytics providers (e.g. Google Analytics)</li>
                    <li>Advertising platforms (e.g. Meta/Facebook Ads, Google Ads)</li>
                  </ul>
                  <p className="mt-4">
                    These providers are contractually obligated to keep your information confidential and use it only for the services they provide to us.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.2 Legal Requirements</h3>
                  <p>
                    We may disclose your information if required to do so by law, court order, government authority, or to protect the rights, property, or safety of Grow Your Business, our clients, or others.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">5.3 Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, or sale of business assets, your personal data may be transferred as part of that transaction. We will notify you of any such change via our website or email.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies & Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytics data.
              </p>
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">6.1 Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Essential cookies:</strong> necessary for the website to function correctly</li>
                    <li><strong>Analytics cookies:</strong> help us understand how visitors interact with the site (e.g. Google Analytics)</li>
                    <li><strong>Marketing cookies:</strong> used to deliver relevant advertisements, including via Meta Pixel</li>
                    <li><strong>Preference cookies:</strong> remember your settings and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">6.2 Your Cookie Choices</h3>
                  <p>
                    You can control cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling certain cookies may affect the functionality of our website.
                  </p>
                  <p className="mt-4">
                    Our website uses the Meta (Facebook) Pixel, which may track your interactions for advertising purposes. You can manage your Facebook ad preferences at <a href="https://facebook.com/ads/preferences" className="text-blue-400 hover:underline">facebook.com/ads/preferences</a>.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, or as required by applicable law.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Client project and billing records:</strong> 7 years (as required for tax and accounting compliance in India)</li>
                <li><strong>Marketing enquiry data:</strong> up to 3 years from last contact</li>
                <li><strong>Website analytics data:</strong> as per the retention settings of the respective analytics platform</li>
              </ul>
              <p className="mt-4">
                When data is no longer required, we will securely delete or anonymise it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include secure HTTPS connections, access controls, and encrypted data storage where applicable.
              </p>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of any login credentials associated with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p>
                As we operate in both India and the UAE, your data may be processed and stored in either jurisdiction. We take steps to ensure that any transfer of data across borders is conducted in accordance with applicable data protection laws and with appropriate safeguards in place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Your Rights</h2>
              <p>
                Depending on your location and applicable law, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Right to Access:</strong> request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> request deletion of your data, subject to legal retention obligations</li>
                <li><strong>Right to Restrict Processing:</strong> request that we limit how we use your data</li>
                <li><strong>Right to Object:</strong> object to processing based on legitimate interests or for direct marketing</li>
                <li><strong>Right to Data Portability:</strong> receive your data in a structured, machine-readable format</li>
                <li><strong>Right to Withdraw Consent:</strong> withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:support@growyourbusiness.today" className="text-blue-400 hover:underline">support@growyourbusiness.today</a>. We will respond within 30 days. We may need to verify your identity before processing your request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Children's Privacy</h2>
              <p>
                Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately and we will take steps to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites, platforms, or services (such as Google, Facebook, WhatsApp). This Privacy Policy does not apply to those external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. WhatsApp & Marketing Communications</h2>
              <p>
                If you have opted in to receive communications from us via WhatsApp or email, we will use your contact details to send you service updates, offers, and business growth tips relevant to our services.
              </p>
              <p className="mt-4">You may opt out of marketing communications at any time by:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Replying "STOP" to any WhatsApp message from us</li>
                <li>Clicking the unsubscribe link in any marketing email</li>
                <li>Contacting us directly at <a href="mailto:support@growyourbusiness.today" className="text-blue-400 hover:underline">support@growyourbusiness.today</a></li>
              </ul>
              <p className="mt-4">
                Opting out of marketing communications will not affect service-related communications necessary to fulfil your contract with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or applicable law. The updated policy will be posted on our website with a revised effective date. We encourage you to review this page periodically.
              </p>
              <p className="mt-4">
                For material changes, we will make reasonable efforts to notify you directly, such as via email or a prominent notice on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Us</h2>
              <p>If you have any questions, concerns, or complaints about this Privacy Policy or how we handle your personal data, please contact our Privacy Officer:</p>
              <div className="mt-4 space-y-1">
                <p><strong>Grow Your Business</strong></p>
                <p>Website: growyourbusiness.today</p>
                <p>Email: <a href="mailto:support@growyourbusiness.today" className="text-blue-400 hover:underline">support@growyourbusiness.today</a></p>
                <p>Location: Kerala, India & UAE</p>
              </div>
              <p className="mt-8">
                You also have the right to lodge a complaint with the relevant data protection authority in your jurisdiction if you believe your data has been handled in violation of applicable law.
              </p>
            </section>

            <p className="pt-8 text-center text-gray-400">
              Your privacy matters to us. We are committed to handling your information with care, transparency, and respect.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
