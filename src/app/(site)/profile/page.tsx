import { Suspense } from "react";
import { ProfileFromParams, ProfileScreen } from "@/components/profile/ProfileScreen";

export const metadata = { title: "Profile" };

/** Figma "Profile/Default" (233:41637 desktop / 233:42393 mobile). Tabs via `?tab=active|history|settings`. */
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileScreen tab="profile" />}>
      <ProfileFromParams />
    </Suspense>
  );
}
