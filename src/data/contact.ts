import { CALL_CENTER } from "@/data/nav";

/** Copy for the Contact us screen (Figma "Contact us/Fill" 233:46026). */
export const CONTACT_INTRO = {
  title: "Contact us",
  lead: "Renting a car with CARENT takes minutes. If you need help choosing a vehicle, planning a trip, or managing an existing booking, our support team is ready to help.",
  prompt: "Share your details and we'll get back to you shortly.",
};

export type Testimonial = { lead: string; rest: string; author: string };

export const CONTACT_TESTIMONIAL: Testimonial = {
  lead: "“I booked a car in under two ",
  rest: "minutes, no calls, no paperwork. It showed up exactly on time.\"",
  author: "Jonathan Gill",
};

export type ContactChannel = {
  kind: "phone" | "email" | "address";
  label: string;
  href: string;
  external?: boolean;
};

export const SUPPORT_EMAIL = "support@carent.com";
export const SUPPORT_ADDRESS = "Jl. Braga No. 21, Bandung";

export const CONTACT_CHANNELS: ContactChannel[] = [
  { kind: "phone", label: "+1 (800) 123-4567", href: `tel:${CALL_CENTER.tel}` },
  { kind: "email", label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
  {
    kind: "address",
    label: SUPPORT_ADDRESS,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SUPPORT_ADDRESS)}`,
    external: true,
  },
];

export const CONTACT_FORM = {
  titleStart: "Tell us",
  titleEnd: "how can we help",
  subtitle: "Wherever you're headed, drive #SafeWithCARENT",
  icon: "/images/3d/telephone.png",
  submit: "Send a message",
  disclaimer: "By submitting this form, you agree to our terms. You can opt-out anytime.",
  placeholders: {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe999@gmail.com",
    message:
      "Hi, I'm planning a trip to Bandung next weekend with 4 people. Is an SUV available for 3 days starting Friday? Also, do you offer with-driver options for that route?",
  },
};

