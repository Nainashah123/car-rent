export type SocialProvider = { id: "google" | "apple" | "facebook"; name: string; icon: string };

export const SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: "google", name: "Google", icon: "/icons/google.svg" },
  { id: "apple", name: "Apple", icon: "/icons/apple.svg" },
  { id: "facebook", name: "Facebook", icon: "/images/facebook.png" },
];

/** sessionStorage key holding the signed-in mock user (set on login / sign-up). */
export const SESSION_KEY = "carent:user";
