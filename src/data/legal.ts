/** Legal pages (/privacy, /terms). Mock copy written for the CARENT demo. */

export type LegalSection = { id: string; heading: string; paragraphs: string[]; list?: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

export const PRIVACY: LegalDoc = {
  title: "Privacy policy",
  updated: "October 1, 2026",
  intro:
    "This policy explains what personal data CARENT collects when you search, book and drive with us, why we collect it, and the choices you have. We only ask for what we need to get you on the road safely.",
  sections: [
    {
      id: "data-we-collect",
      heading: "1. Data we collect",
      paragraphs: ["We collect information you give us directly and information generated when you use the service:"],
      list: [
        "Account details: name, email address, phone number and password.",
        "Booking details: pick-up and return locations, dates, vehicle choice and driver option.",
        "Verification: a copy of your driving license when you choose Self-Drive.",
        "Payment details: processed by our payment partners; we never store full card numbers.",
        "Usage data: pages visited, device type and approximate location, used to keep the service secure.",
      ],
    },
    {
      id: "how-we-use",
      heading: "2. How we use your data",
      paragraphs: [
        "We use your data to confirm and manage bookings, verify drivers, process payments and refunds, send booking updates, and answer support requests.",
        "With your consent we may also send offers and promotions. You can opt out at any time from the link in every email or from your profile.",
      ],
    },
    {
      id: "sharing",
      heading: "3. Sharing",
      paragraphs: [
        "We share booking details with the driver or fleet partner assigned to your rental, with payment processors, and with insurers when a claim is made. We never sell your personal data.",
        "We may disclose information where the law requires it, for example in response to a valid request from the authorities.",
      ],
    },
    {
      id: "retention",
      heading: "4. Retention and security",
      paragraphs: [
        "Booking records are kept for five years to meet tax and insurance obligations. License images are deleted 30 days after your rental ends. Data is encrypted in transit and at rest, and access is limited to staff who need it.",
      ],
    },
    {
      id: "your-rights",
      heading: "5. Your rights",
      paragraphs: [
        "You can access, correct, export or delete your personal data, and withdraw consent for marketing at any time. Send requests to privacy@carent.com and we will reply within 30 days.",
      ],
    },
    {
      id: "cookies",
      heading: "6. Cookies",
      paragraphs: [
        "We use essential cookies to keep you signed in and remember your favourite cars, and analytics cookies to understand how the site is used. You can block non-essential cookies in your browser settings.",
      ],
    },
    {
      id: "changes",
      heading: "7. Changes to this policy",
      paragraphs: [
        "If we make material changes we will let you know by email or with a notice on the site before they take effect.",
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of use",
  updated: "October 1, 2026",
  intro:
    "These terms govern your use of CARENT and every booking you make through it. By creating an account or confirming a rental you agree to them, so please read them carefully.",
  sections: [
    {
      id: "eligibility",
      heading: "1. Eligibility",
      paragraphs: [
        "You must be at least 21 years old to book. Self-Drive rentals require a valid driving license held for at least one year that matches the vehicle class.",
      ],
    },
    {
      id: "bookings",
      heading: "2. Bookings and payment",
      paragraphs: [
        "A booking is confirmed once payment succeeds and you receive a confirmation email. Prices shown at checkout include insurance and taxes; fuel, tolls and parking during the trip are your responsibility.",
      ],
    },
    {
      id: "changes-cancellations",
      heading: "3. Changes and cancellations",
      paragraphs: ["You can change or cancel a booking from your profile:"],
      list: [
        "More than 24 hours before pick-up: free change or full refund.",
        "Less than 24 hours before pick-up: 50% of the first day is charged.",
        "No-show: the first day is charged in full.",
      ],
    },
    {
      id: "vehicle-use",
      heading: "4. Using the vehicle",
      paragraphs: [
        "Return the car at the agreed time and place, with the same fuel level. Smoking, off-road driving, racing and carrying more passengers than the vehicle is registered for are not allowed. Late returns are charged per hour after a 30-minute grace period.",
      ],
    },
    {
      id: "damage",
      heading: "5. Damage and deposits",
      paragraphs: [
        "A refundable deposit may be held on your card for Self-Drive rentals and released within 7 days after return. Damage not covered by the included insurance, up to the stated excess, is deducted from the deposit.",
      ],
    },
    {
      id: "liability",
      heading: "6. Liability",
      paragraphs: [
        "CARENT connects renters with verified vehicles and drivers. To the extent permitted by law, we are not liable for indirect losses such as missed connections or lost earnings caused by delays outside our control.",
      ],
    },
    {
      id: "contact",
      heading: "7. Contact",
      paragraphs: [
        "Questions about these terms? Reach our team through the contact form or at support@carent.com.",
      ],
    },
  ],
};
