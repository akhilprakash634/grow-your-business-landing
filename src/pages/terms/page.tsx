import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { useSEO } from '../../utils/seo';

export default function TermsPage() {
  useSEO({
    title: 'Terms and Conditions | Grow Your Business',
    description: 'Read the terms and conditions for using Grow Your Business services and purchasing our digital products.',
    canonical: '/terms-and-conditions',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Terms and Conditions</h1>
          <p className="text-gray-400 mb-8 italic">Effective Date: 12 May 2026</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-12 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to Grow Your Business ("Company", "we", "our", "us"). By accessing or using our website growyourbusiness.today and purchasing any of our services or digital products, you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before proceeding.
              </p>
              <p className="mt-4">
                These Terms constitute a legally binding agreement between you ("Client", "User", "you") and Grow Your Business, a company providing IT services, web design, digital marketing, and related digital products, operating in Kerala, India and UAE.
              </p>
              <p className="mt-4">
                If you do not agree to these Terms, please discontinue use of our website and services immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services Offered</h2>
              <p>Grow Your Business provides the following categories of services:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Website Design & Development</li>
                <li>WhatsApp Marketing Systems & Automation</li>
                <li>Google Maps & Google Business Profile Optimization</li>
                <li>Local SEO and Digital Marketing</li>
                <li>IT Support and Consulting</li>
                <li>Digital products including templates, guides, tools, and downloadable resources</li>
              </ul>
              <p className="mt-4">
                Specific deliverables, timelines, and scope for each engagement are defined in the individual Service Agreement or Order Confirmation provided to you at the time of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Digital Products Policy</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">3.1 Nature of Digital Products</h3>
                  <p>
                    We offer digital products including but not limited to: website templates, marketing toolkits, e-books, training materials, automation scripts, and other downloadable or online-access content ("Digital Products"). These are delivered electronically and are available for access immediately or within the timeframe specified at the time of purchase.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">3.2 No Refund Policy for Digital Products</h3>
                  <p className="font-semibold text-red-400 mb-2">ALL SALES OF DIGITAL PRODUCTS ARE FINAL.</p>
                  <p>
                    Due to the intangible and instantly accessible nature of digital products, we do not offer refunds, exchanges, or cancellations once a digital product has been delivered, downloaded, or access has been granted, except as required by applicable law.
                  </p>
                  <p className="mt-4">By completing your purchase of a digital product, you expressly acknowledge and agree that:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>You have reviewed the product description and understand what is included</li>
                    <li>You waive any right to a cooling-off period to the extent permitted by applicable law</li>
                    <li>Delivery is considered complete upon you receiving the download link or access credentials</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">3.3 Exceptions</h3>
                  <p>A refund or replacement may be considered only in the following circumstances:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>The digital product file is corrupted or non-functional and we are unable to provide a working replacement within 5 business days</li>
                    <li>The product delivered is materially different from what was described at the time of purchase</li>
                  </ul>
                  <p className="mt-4">
                    Refund requests under the above exceptions must be submitted to <a href="mailto:support@growyourbusiness.today" className="text-blue-400 hover:underline">support@growyourbusiness.today</a> within 7 days of purchase, with evidence of the issue.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">3.4 Licence to Use Digital Products</h3>
                  <p>
                    Upon purchase of a digital product, you are granted a non-exclusive, non-transferable, personal licence to use the product for your own business or personal purposes. You may not:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Resell, redistribute, share, or sublicense the digital product to any third party</li>
                    <li>Modify and resell the product, in whole or in part</li>
                    <li>Use the product to create competing products or services</li>
                    <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                  </ul>
                  <p className="mt-4">All intellectual property rights in digital products remain with Grow Your Business or its licensors.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Service Agreements & Custom Projects</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.1 Project Scope</h3>
                  <p>
                    For custom services (websites, marketing campaigns, etc.), the scope of work, deliverables, and pricing are agreed upon in writing before commencement. Any work outside the agreed scope may attract additional charges.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.2 Client Responsibilities</h3>
                  <p>
                    You agree to provide us with accurate, timely information, materials, and feedback required to deliver the services. Delays caused by the client may result in revised timelines. We are not liable for delays or shortcomings resulting from failure to provide required inputs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.3 Revisions</h3>
                  <p>
                    Unless otherwise specified in your service agreement, standard packages include a defined number of revision rounds. Additional revisions beyond the agreed number may be billed at our standard hourly rate.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">4.4 Project Cancellation</h3>
                  <p>If you cancel a custom service project after work has commenced:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Any work completed up to the date of cancellation will be billed at a pro-rated rate based on the total project value</li>
                    <li>Non-refundable deposits or advance payments will be retained to cover work already performed</li>
                    <li>All deliverables produced up to cancellation remain the property of Grow Your Business until full payment is received</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Payments & Billing</h2>
              <p>
                Payments are due as per the schedule outlined in your invoice or service agreement. We accept payments via bank transfer, UPI, and other methods specified at the time of purchase.
              </p>
              <p className="mt-4">
                All prices are quoted in Indian Rupees (INR) or UAE Dirhams (AED) as applicable, and are inclusive or exclusive of taxes as stated on the invoice.
              </p>
              <p className="mt-4">
                In the event of non-payment within the agreed period, we reserve the right to suspend or terminate access to services and deliverables, and to pursue recovery through lawful means.
              </p>
              <p className="mt-4">
                Goods and Services Tax (GST) or Value Added Tax (VAT) will be applied where applicable under Indian or UAE law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Grow Your Business or its content suppliers and is protected by applicable intellectual property laws.
              </p>
              <p className="mt-4">
                Upon full payment for a custom project, ownership of the final deliverables (such as a completed website) transfers to you, unless otherwise stated. Third-party assets (stock images, fonts, plugins) remain subject to their respective licences.
              </p>
              <p className="mt-4">
                You grant us permission to display completed projects in our portfolio and use them for promotional purposes, unless you request in writing that we not do so.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement. This obligation does not apply to information that is publicly available or independently developed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Grow Your Business shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services or digital products, even if we have been advised of the possibility of such damages.
              </p>
              <p className="mt-4">
                Our total liability to you in connection with any claim shall not exceed the amount paid by you for the specific service or digital product giving rise to the claim.
              </p>
              <p className="mt-4">
                We do not guarantee specific business results (such as search rankings, leads, or revenue) from our services, as these depend on many factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Warranties & Disclaimers</h2>
              <p>
                We warrant that our services will be performed with reasonable skill and care. Except as expressly stated, all services and digital products are provided "as is" without warranty of any kind, express or implied.
              </p>
              <p className="mt-4">
                We do not warrant that our website or digital products will be uninterrupted, error-free, or free from viruses or other harmful components. You are responsible for maintaining appropriate backups of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Services</h2>
              <p>
                Our services may involve the use of third-party platforms, tools, or APIs (such as Google, WhatsApp, Meta, hosting providers). Your use of such platforms is subject to their own terms of service and privacy policies. We are not responsible for changes to or interruptions in third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Privacy & Data Protection</h2>
              <p>
                We collect and process personal data in accordance with applicable data protection laws, including the Information Technology Act, 2000 (India). By using our services, you consent to the collection and use of your data as described in our Privacy Policy, available on our website.
              </p>
              <p className="mt-4">
                We will not sell or share your personal data with third parties except as necessary to deliver our services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. For clients in the UAE, applicable UAE federal laws shall apply to the extent required.
              </p>
              <p className="mt-4">
                Any disputes arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be referred to the courts of competent jurisdiction in Kerala, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Changes to These Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. The updated version will be posted on our website with a revised effective date. Your continued use of our services after such changes constitutes acceptance of the revised Terms. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <p>For any questions, concerns, or support requests regarding these Terms, please contact us:</p>
              <div className="mt-4 space-y-1">
                <p><strong>Grow Your Business</strong></p>
                <p>Website: growyourbusiness.today</p>
                <p>Email: <a href="mailto:support@growyourbusiness.today" className="text-blue-400 hover:underline">support@growyourbusiness.today</a></p>
                <p>Location: Kerala, India & UAE</p>
              </div>
            </section>

            <p className="pt-8 text-center text-gray-400">
              By using our website or purchasing our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
