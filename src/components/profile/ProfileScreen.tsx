"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AboutPanel } from "@/components/profile/AboutPanel";
import { BookingsPanel } from "@/components/profile/BookingsPanel";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { SettingsPanel } from "@/components/profile/SettingsPanel";
import { isProfileTab, MOCK_USER, type ProfileDetails, type ProfileTabId } from "@/data/profile";
import { seedBookingsOnce, useProfileOverrides } from "@/lib/profile";
import { parseSession, useSessionRaw } from "@/lib/session";

/** Reads `?tab=` (must render inside <Suspense>). */
export function ProfileFromParams() {
  const params = useSearchParams();
  const raw = params.get("tab");
  return <ProfileScreen tab={isProfileTab(raw) ? raw : "profile"} />;
}

/**
 * Figma "Profile/Default" body (233:41639 desktop 1440×773 / 233:42395 mobile).
 * Desktop: left column (title + tabs) and right panel. Mobile: title, panel, tabs.
 */
export function ProfileScreen({ tab }: { tab: ProfileTabId }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = parseSession(useSessionRaw());
  const overrides = useProfileOverrides();

  useEffect(() => {
    seedBookingsOnce();
  }, []);

  const details: ProfileDetails = user
    ? { ...MOCK_USER, phone: overrides.phone ?? MOCK_USER.phone, address: overrides.address ?? MOCK_USER.address, avatar: overrides.avatar, name: user.name, email: user.email }
    : { ...MOCK_USER, ...overrides };

  function select(id: ProfileTabId) {
    router.replace(id === "profile" ? pathname : `${pathname}?tab=${id}`, { scroll: false });
  }

  return (
    <section className="relative w-full overflow-hidden bg-white" aria-label="Profile">
      {/* Decorative gradient band (233:41640 / 233:42396). */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 lg:h-[155.5px]">
        <Image src="/images/profile/band-mobile.png" alt="" fill priority sizes="100vw" className="object-cover lg:hidden" />
        <Image src="/images/profile/band.png" alt="" fill priority sizes="100vw" className="hidden object-cover object-top lg:block" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 pt-[120px] pb-10 lg:grid lg:grid-cols-[minmax(0,754fr)_minmax(0,566fr)] lg:grid-rows-[auto_1fr] lg:px-[60px] lg:pt-[100px] lg:pb-[100px]">
        <h1 className="mb-5 font-display text-[38px] leading-[1.2] text-neutral-900 lg:w-[400px] lg:col-start-1 lg:row-start-1 lg:mt-[100px] lg:mb-8 lg:text-[64px]" data-qa="profile-title">
          Profile
        </h1>

        <div
          id="profile-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="w-full lg:col-start-2 lg:row-span-2 lg:row-start-1"
          data-qa="profile-panel"
        >
          {tab === "profile" && <AboutPanel details={details} signedIn={!!user} />}
          {tab === "active" && <BookingsPanel mode="active" />}
          {tab === "history" && <BookingsPanel mode="history" />}
          {tab === "settings" && <SettingsPanel signedIn={!!user} email={details.email} />}
        </div>

        <ProfileTabs active={tab} onSelect={select} className="mt-10 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:mb-[100px] lg:self-start" />
      </div>
    </section>
  );
}
