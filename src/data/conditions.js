export const conditions = {
  location: 'Hurghada, Red Sea, Egypt',
  coordinates: { lat: 27.2579, lng: 33.8116 },
  windDays: 270,
  bestSeasons: ['Late March–June', 'Late September–January'],
  avoidMonths: ['February', 'July', 'August'],
  waterTemp: [
    { season: 'Winter', months: 'Dec–Feb', temp: '22–24°C', wetsuit: '5–7mm recommended' },
    { season: 'Spring', months: 'Mar–May', temp: '23–25°C', wetsuit: 'Shorty or rash guard' },
    { season: 'Summer', months: 'Jun–Aug', temp: '27–29°C', wetsuit: 'Rash guard sufficient' },
    { season: 'Autumn', months: 'Sep–Nov', temp: '25–27°C', wetsuit: 'Shorty or rash guard' },
  ],
  minWaterTemp: 'Never below 20°C — 12 month swimming season',
  spots: [
    'Free beaches — open lagoons, mountains behind, sea in front',
    'Affiliate partner spots',
    'Both flat water and wave conditions',
  ],
  airports: [
    { name: 'Hurghada International Airport', code: 'HRG', note: 'Transfers arranged from landing' },
    { name: 'Cairo International Airport', code: 'CAI', note: 'Contact Kite Pirates directly for arrangements' },
  ],
};

export const bookingFlow = [
  { step: 1, title: 'Choose Your Package', body: 'Browse packages or programs and pick your week.' },
  { step: 2, title: 'Contact Us', body: 'WhatsApp, email, or the booking form. We reply within 24 hours.' },
  { step: 3, title: 'Pay 30% Deposit', body: 'Secures your spot instantly.' },
  { step: 4, title: 'Arrive & Ride', body: 'We handle everything else.' },
];

export const deposits = {
  mate: { full: 1099, deposit: 330 },
  pirate: { full: 1600, deposit: 480 },
  captain: { full: 1899, deposit: 570 },
  wingPirateWeek: { full: 1800, deposit: 540 },
  wingCaptainWeek: { full: 2100, deposit: 630 },
  piratePartner: { full: 1299, deposit: 390 },
  captainPartner: { full: 1599, deposit: 480 },
};

export const cancellationPolicy = [
  { notice: '30+ days before arrival', outcome: 'Full deposit refund OR free reschedule' },
  { notice: '15–29 days before arrival', outcome: '50% deposit refunded OR free reschedule' },
  { notice: '7–14 days before arrival', outcome: 'Deposit non-refundable — one free reschedule' },
  { notice: 'Less than 7 days', outcome: 'No refund, no reschedule' },
  { notice: 'No show', outcome: 'Full package charge applies' },
  { notice: 'Issue on our end', outcome: 'Full refund or reschedule — no questions asked' },
];

export const noWindPolicy = [
  { lost: '1 session', cashRefund: 30, credit: 30 },
  { lost: 'Full day', cashRefund: 80, credit: 80 },
  { lost: '2+ days', cashRefund: 150, credit: 150, bonus: 'Free activity day included' },
];

export const paymentMethods = ['Bank transfer', 'PayPal', 'Wise', 'Cash on arrival (balance only)'];
