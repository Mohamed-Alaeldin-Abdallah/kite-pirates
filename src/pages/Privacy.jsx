import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero';
import { CONTACT } from '../lib/config';

/**
 * Privacy notice. This is a clear, GDPR-aware starting template — have it
 * reviewed by a qualified professional and complete the bracketed details
 * before relying on it in production.
 */
export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy | Kite Pirates</title>
        <meta name="description" content="How Kite Pirates handles your data." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <PageHero title="PRIVACY" sub="Plain language. No surprises." height="40vh" />

      <section className="section">
        <div className="container-px mx-auto max-w-prose space-y-6 text-gray-light">
          <p>
            Kite Pirates (“we”) respects your privacy. This notice explains what we collect, why,
            and your rights under the EU GDPR and applicable law.
          </p>

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">What we collect</h2>
            <p>
              When you submit the booking form we collect the details you provide — name, email,
              phone/WhatsApp, nationality, trip preferences and any optional notes. We only ask for
              what we need to respond to your enquiry and arrange your trip.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">Why we use it</h2>
            <p>
              To reply to you, plan your week, and manage your booking. We process this on the basis
              of taking steps at your request prior to entering an agreement, and your consent, which
              you give when you submit the form.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">Analytics &amp; cookies</h2>
            <p>
              We load analytics (Google Analytics 4 / Meta Pixel) only after you accept via the cookie
              banner. Decline and no analytics or tracking scripts run. You can change your choice any
              time by clearing the “kp-consent” entry in your browser storage.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">Sharing</h2>
            <p>
              We do not sell your data. We share it only with service providers needed to deliver your
              trip (e.g. accommodation, activity partners) and our email provider, strictly to fulfil
              your booking.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">Retention</h2>
            <p>
              We keep enquiry details only as long as needed to handle your booking and meet legal or
              accounting obligations, then delete them.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-2xl uppercase text-ink">Your rights</h2>
            <p>
              You may request access, correction, deletion, or a copy of your data, and withdraw
              consent at any time. Email{' '}
              <a className="text-teal" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          </div>

          <p className="text-sm text-gray">
            [Add legal entity name, registered address, and Data Protection contact before launch.]
          </p>
        </div>
      </section>
    </>
  );
}
