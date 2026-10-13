"use client";

import { useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import { Button, ButtonLink } from "@/components/ui/Button";
import { DRIVER_OPTIONS, SETTING_TOGGLES, type AccountSettings } from "@/data/profile";
import { panelCard } from "@/components/profile/styles";
import { cn } from "@/lib/cn";
import { saveSettings, useAccountSettings } from "@/lib/profile";
import { signOut } from "@/lib/session";

const box = "flex w-full flex-col gap-4 border-t border-neutral-100 pt-5 lg:pt-6";
const title = "text-[16px] leading-[1.3] font-medium text-neutral-900 lg:text-[20px] lg:leading-[1.4]";

/** Account setting: notification toggles (Toggle 125:50698), default rental radio (Radio 112:43729), sign out. */
export function SettingsPanel({ signedIn, email }: { signedIn: boolean; email: string }) {
  const router = useRouter();
  const settings = useAccountSettings();

  function update(next: AccountSettings, message: string) {
    saveSettings(next);
    toast(message, "info");
  }

  return (
    <div className={`${panelCard} gap-5 lg:gap-6`}>
      <h2 className="font-display text-[24px] leading-[1.2] text-neutral-900 lg:text-[32px]">Account setting</h2>

      <section className={box} aria-labelledby="set-notif">
        <h3 id="set-notif" className={title}>
          Notifications
        </h3>
        <ul className="flex flex-col gap-3">
          {SETTING_TOGGLES.map((t) => {
            const on = settings[t.id];
            return (
              <li key={t.id} className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-col">
                  <span id={`set-${t.id}`} className="text-[14px] leading-[1.4] font-medium text-neutral-900 lg:text-[16px]">
                    {t.label}
                  </span>
                  <span className="text-[12px] leading-[1.4] text-neutral-400 lg:text-[14px]">{t.hint}</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-labelledby={`set-${t.id}`}
                  onClick={() => update({ ...settings, [t.id]: !on }, `${t.label} ${on ? "off" : "on"}`)}
                  className="flex shrink-0 items-center justify-center"
                >
                  <span
                    className={cn(
                      "relative block h-3 w-[22px] rounded-pill transition-colors lg:h-[17px] lg:w-[29px]",
                      on ? "bg-primary-500" : "bg-neutral-100 shadow-[inset_0_4px_4px_rgb(0_0_0/0.08)]",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-[1.5px] size-[9px] rounded-full bg-white transition-[left] lg:top-[2px] lg:size-[13px]",
                        on ? "left-[11.5px] shadow-[0_4px_4px_rgb(0_0_0/0.25)] lg:left-[14px]" : "left-[1.5px] lg:left-[2px]",
                      )}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={box} aria-labelledby="set-driver">
        <h3 id="set-driver" className={title}>
          Default rental option
        </h3>
        <div role="radiogroup" aria-labelledby="set-driver" className="flex flex-wrap gap-x-8 gap-y-2">
          {DRIVER_OPTIONS.map((opt) => {
            const on = settings.driver === opt;
            return (
              <label key={opt} className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="radio"
                  name="driver"
                  value={opt}
                  checked={on}
                  onChange={() => update({ ...settings, driver: opt }, `Default set to ${opt.toLowerCase()}`)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-[18px] items-center justify-center rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-radio-on lg:size-[22px]",
                  )}
                >
                  <span className={cn("flex size-[14.5px] items-center justify-center rounded-full border-[0.9px] lg:size-4", on ? "border-radio-on" : "border-radio-off")}>
                    {on && <span className="size-[8px] rounded-full bg-radio-on lg:size-2.5" />}
                  </span>
                </span>
                <span className="text-[14px] leading-[1.2] font-medium whitespace-nowrap text-black lg:text-[16px] lg:leading-[1.4]">{opt}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className={cn(box, "lg:flex-row lg:items-center lg:justify-between")} aria-labelledby="set-account">
        <div className="flex min-w-0 flex-col">
          <h3 id="set-account" className={title}>
            {signedIn ? "Signed in" : "Not signed in"}
          </h3>
          <span className="truncate text-[12px] leading-[1.4] text-neutral-400 lg:text-[14px]">
            {signedIn ? email : "Log in to keep your bookings with your account."}
          </span>
        </div>
        {signedIn ? (
          <Button
            variant="black"
            className="self-start lg:self-auto"
            onClick={() => {
              signOut();
              toast("Signed out", "info");
              router.push("/login");
            }}
          >
            <IconLogout size={18} stroke={1.5} aria-hidden />
            Sign out
          </Button>
        ) : (
          <ButtonLink href="/login" variant="primary" className="self-start lg:self-auto">
            Login
          </ButtonLink>
        )}
      </section>
    </div>
  );
}
