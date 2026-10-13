/**
 * FAQs (Figma component "FAQs" 139:10838). Shared by Home, About and Help.
 * Items are grouped by `category` in the order the categories first appear.
 * "Booking & Rental" copy is from the Figma; the other groups are written to match.
 */
export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    id: "advance",
    category: "Booking & Rental",
    question: "How far in advance should I book?",
    answer:
      "You can book instantly for same-day pick-up, or schedule up to 90 days ahead. Popular classic units tend to book out quickly around weekends and holidays.",
  },
  {
    id: "change-dates",
    category: "Booking & Rental",
    question: "Can I change my pick-up or return date after booking?",
    answer:
      "Yes. Changes can be requested from your profile up to 24 hours before pick-up, subject to vehicle availability.",
  },
  {
    id: "driver",
    category: "Booking & Rental",
    question: "Is a driver included with my rental?",
    answer:
      "You can choose With Driver or Self-Drive when searching. Self-Drive requires a valid license matching the vehicle class.",
  },
  {
    id: "payment-methods",
    category: "Payments & Pricing",
    question: "Which payment methods do you accept?",
    answer:
      "Bank transfer, e-wallets and all major credit cards. Payment is taken when you confirm the booking, and you get a receipt by email straight away.",
  },
  {
    id: "hidden-fees",
    category: "Payments & Pricing",
    question: "Are there any hidden fees?",
    answer:
      "No. The price you see at search time includes insurance and taxes. Fuel, tolls and parking during your trip are the only extras, and only if you use them.",
  },
  {
    id: "refund",
    category: "Payments & Pricing",
    question: "What happens if I cancel?",
    answer:
      "Cancel up to 24 hours before pick-up for a full refund. Cars tagged \"Free refund\" can be cancelled up to the pick-up time.",
  },
  {
    id: "documents",
    category: "Requirements & Policies",
    question: "What documents do I need to rent a car?",
    answer:
      "A valid ID card or passport, plus a driving license for the vehicle class if you choose Self-Drive. International visitors need an International Driving Permit.",
  },
  {
    id: "age",
    category: "Requirements & Policies",
    question: "Is there a minimum age?",
    answer:
      "Self-Drive renters must be at least 21 and have held their license for one year. There is no age limit when you rent with a driver.",
  },
  {
    id: "damage",
    category: "Requirements & Policies",
    question: "What if the car is damaged during my rental?",
    answer:
      "Every rental includes basic insurance. Report any incident to our 24-hour call center and we will arrange a replacement car where possible.",
  },
];
