export const experiences = [
  {
    name: 'Golden Hour',
    icon: '🌇',
    badge: 'Signature Experience',
    price: '€190 pp',
    duration: '3–4 hrs (late afternoon → sunset)',
    level: 'All levels',
    minMax: 'Min 2 / Max 6',
    includes: ['Kite session', 'Equipment', 'Professional photography', 'Dinner'],
    note: 'Photography is built in — not optional. The sunset shot IS the product.',
    description:
      "The wind drops. The sky turns gold. The mountains swallow the sun whole — and you're still on the water when it happens.",
  },
  {
    name: 'The Downwind Run',
    icon: '💨',
    badge: 'Intermediate+',
    price: '€150 pp',
    route: 'Kite Play Hurghada → Makadi Bay',
    distance: '~22–25 km on the water',
    duration: '2–3 hrs',
    level: 'Intermediate to Advanced only',
    includes: ['Guide', 'Safety boat escort (mandatory)', 'Return transport'],
    addon: { label: 'Photography', price: 70 },
  },
  {
    name: 'Island Trips',
    icon: '🏝️',
    tiers: [
      {
        name: 'Island Kite Day',
        price: '€210 / €140',
        duration: 'Full day',
        includes:
          'Kiter €210 · non-kiter €140 per person. Full day kiting on the island — kite equipment & snorkeling gear included. Group max 7. 20% group-booking discount.',
      },
      {
        name: 'Private Island + BBQ',
        price: '€550 total',
        duration: 'Full day',
        includes:
          'Full day kiting & snorkeling + beach BBQ. Equipment rental €70 per person. Group max 5.',
      },
    ],
  },
  {
    name: 'Horse Riding — Guided by Jade',
    icon: '🐴',
    badge: 'Most Shared',
    contactOnly: true,
  },
  {
    name: 'Snorkeling',
    icon: '🐠',
    contactOnly: true,
  },
  {
    name: 'Orange Bay',
    icon: '🌴',
    contactOnly: true,
  },
  {
    name: "Pirate's Night",
    icon: '🌙',
    badge: 'City Night',
    price: '€65 pp',
    duration: '~5 hrs (8pm–1am)',
    minMax: 'Min 2 / Max 8',
    includes: ['Transport', 'Local markets & bazaars', 'Bowling', 'Billiards', 'Local coffee stops'],
    note: 'Food and drinks purchased individually — part of the authentic local experience.',
  },
];

// Preserved for later re-enable (Horse Riding / Snorkeling / Orange Bay full detail,
// plus the temporarily-removed Desert Safari and Diving).
export const experiencesArchived = [
  {
    name: 'Horse Riding — Guided by Jade',
    icon: '🐴',
    badge: 'Most Shared',
    tiers: [
      { name: 'Desert or Sea', price: '€65 pp', duration: '1 hr', includes: 'Choose desert or sea, guide from stable' },
      { name: 'Sea & Desert Ride', price: '€80 pp', duration: '2 hrs', includes: 'Desert walk then into the sea on horseback' },
      { name: 'Swim With Horses', price: '€100 pp', duration: '3 hrs', includes: 'Desert, sea, unsaddle and swim with horses for 1 hour' },
    ],
    addon: { label: 'Photography', price: 70 },
  },
  {
    name: 'Snorkeling',
    icon: '🐠',
    tiers: [
      { name: 'Reef Explorer (Shared)', price: '€65 pp', duration: '4–5 hrs', includes: 'Boat, gear, guide, transport' },
      { name: 'Private Reef', price: '€380 total', duration: '4–5 hrs', includes: 'Private boat, max 7, gear, guide, transport' },
      { name: 'Reef & Fire', price: '€480 total', duration: '7 hrs', includes: 'Everything above + beach BBQ' },
    ],
  },
  {
    name: 'Orange Bay',
    icon: '🌴',
    tiers: [
      { name: 'Orange Bay Day (Shared)', price: '€75 pp', duration: '7 hrs', includes: 'Shared boat, 2 snorkel stops, gear, lunch, beach time, transport' },
      { name: 'Orange Bay Private', price: '€510 total', duration: '7 hrs', includes: 'Private speedboat, max 7, snorkeling, lunch on board, transport' },
      { name: 'Orange Bay Sunset', price: '€610 total', duration: '8 hrs', includes: 'Everything above + sunset, drinks, photography session' },
    ],
  },
  {
    name: 'Desert Safari',
    icon: '🏜️',
    tiers: [
      { name: 'Desert Pirate', price: '€95 pp', duration: '3 hrs', includes: 'Quad bikes, camel ride, Bedouin tea, sunset, transport. Max 8.' },
      { name: 'Into The Wild', price: '€150 pp', duration: '7 hrs', includes: 'Quads, jeep, Bedouin village, camel, BBQ under stars, stargazing. Max 8.' },
    ],
    addon: { label: 'Photography', price: 70 },
  },
  {
    name: 'Diving',
    icon: '🤿',
    tiers: [
      { name: 'First Dive (Ghost Dive)', price: '€95 pp', duration: '7 hrs', includes: '2 intro dives, equipment, lunch, transport. No cert needed.' },
      { name: 'Deep Pirate', price: '€115 pp', duration: '7–8 hrs', includes: '2 guided dives, equipment, lunch, transport. Certified divers.' },
      { name: 'Ghost Dive (Free Diving)', price: '€100 pp', duration: '3–4 hrs', includes: 'Free diving intro, breath-hold technique, equipment, transport.' },
    ],
    addon: { label: 'Underwater Photography', price: 70 },
  },
];

// Experience teaser cards used on the Home page.
export const experienceTeasers = [
  { title: 'Island Trips', icon: '🏝️', desc: 'Two Red Sea islands a week — speedboat, snorkeling, open water.' },
  { title: 'Horses & Sea', icon: '🐴', desc: 'Ride horses into the Red Sea, mountains watching from behind.' },
  { title: 'Hidden Lagoons', icon: '🗺️', desc: "Open water the map doesn't show. Silence, mountains, no crowds." },
  { title: 'Golden Hour', icon: '🌇', desc: 'Late session ending at sunset. Photography built in. Dinner after.' },
  { title: 'Downwind Run', icon: '💨', desc: '22km on the water from Hurghada to Makadi Bay. Safety boat escort.' },
  { title: 'Orange Bay', icon: '🌴', desc: 'Speedboat to turquoise shallows — snorkel stops, lunch, beach time.' },
];

// "A Pirate's Day" timeline for the Experience page.
export const pirateDay = [
  { time: 'Morning', body: 'Wake up near the water. Breakfast with the crew. Check the wind.' },
  { time: 'At The Spot', body: 'Open lagoon, mountains behind, sea in front. Gear up, no queues.' },
  { time: 'The Session', body: 'Ride. Push a trick. Your instructor stays on the water with you.' },
  { time: 'Midday', body: 'Drinks, fruit and food at the spot. Rest, or head to a hidden gem.' },
  { time: 'Evening', body: 'Dinner out or delivered. City nights, fire on the beach, or early rest.' },
];

// No-wind day options (Experience page grid).
export const noWindDays = [
  { title: 'Snorkeling', icon: '🤿' },
  { title: 'Orange Bay', icon: '🏝️' },
  { title: 'Island Trips', icon: '⛵' },
  { title: 'Hidden Lagoons', icon: '🗺️' },
];

// Alternating feature sections (Experience page).
export const featureSections = [
  {
    title: 'THE ISLANDS',
    image: '/images/islands.jpeg',
    eligibility: 'Included — Pirate & Captain',
    body: 'Speedboat out to Red Sea islands — snorkeling, open water, beach. Pirates get 2 island trips a week; Captains get 3.',
    tags: ['🐠 Snorkeling', '🚤 Speedboat', '🏴‍☠️ Pirate 2 · 🦜 Captain 3'],
  },
  {
    title: 'HIDDEN GEMS',
    image: '/images/hidden-gems.jpeg',
    eligibility: 'All packages',
    body: 'Far from the resorts. Open lagoons, mountain backdrops, silence.',
    tags: ['🗺️ Off The Map', '⛺ Camp Style', 'No Crowds'],
  },
  {
    title: 'RIDE INTO THE SEA',
    image: '/images/horses-sea.jpeg',
    eligibility: 'Captain only',
    body: "Ride horses into the Red Sea. Mountains watch from behind. BBQ in the hills — fire, food, a view that doesn't exist anywhere else.",
    tags: ['🐴 Horse Riding', '🍖 Mountain BBQ', '📸 Photography'],
  },
  {
    title: 'ONE DAY. TWO SKIES.',
    image: '/images/dusk-till-dawn.jpeg',
    eligibility: 'Captain signature day',
    body: 'Sunrise from the sea. Sunset from the mountains. Horses, kiting, a surprise ride.',
    tags: ['🌅 Sunrise at Sea', '🌄 Mountain Sunset', 'Full Day'],
  },
  {
    title: 'GOLDEN HOUR',
    image: '/images/golden-hour.jpeg',
    eligibility: 'Standalone + Captain',
    body: 'Late afternoon kite session ending at sunset. Photography included. Dinner after.',
    tags: ['🌇 Sunset Session', '📸 Photography', '🍽️ Dinner'],
  },
];
