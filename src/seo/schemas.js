import { SITE_URL, SOCIAL, CONTACT, WHATSAPP_NUMBER } from '../lib/config';

/** Organization / TouristAttraction schema for the homepage. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Kite Pirates',
    description:
      'Premium kite surfing courses, wing foil lessons, and Red Sea experiences in Hurghada, Egypt.',
    url: SITE_URL,
    ...(WHATSAPP_NUMBER ? { telephone: `+${WHATSAPP_NUMBER}` } : {}),
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hurghada',
      addressCountry: 'EG',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 27.2579, longitude: 33.8116 },
    openingHours: 'Mo-Su 06:00-20:00',
    priceRange: '€€€',
    sameAs: [SOCIAL.instagram, SOCIAL.tiktok, SOCIAL.facebook],
  };
}

/** Product schema for a package. */
export function packageSchema(pkg) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${pkg.name} — Kite Pirates`,
    description: pkg.tagline,
    brand: { '@type': 'Brand', name: 'Kite Pirates' },
    offers: {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: pkg.currency,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/packages`,
    },
  };
}

/** Course schema for a kite / wing foil course. */
export function courseSchema(course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.target,
    provider: { '@type': 'Organization', name: 'Kite Pirates', sameAs: SITE_URL },
  };
}

/** FAQPage schema built from the faqs array. */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
