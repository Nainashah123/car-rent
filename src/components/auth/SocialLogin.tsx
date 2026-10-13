"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/components/app/Toaster";
import { SOCIAL_PROVIDERS } from "@/data/auth";

/** Google / Apple / Facebook row. Mock: signs in and goes to the profile. */
export function SocialLogin({ label }: { label: string }) {
  const router = useRouter();
  return (
    <>
      <p className="text-[14px] leading-[1.2] text-base-black lg:text-[16px] lg:leading-[1.4]">{label}</p>
      <div className="flex items-start gap-4">
        {SOCIAL_PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Continue with ${p.name}`}
            onClick={() => {
              toast(`Signed in with ${p.name}`);
              router.push("/profile");
            }}
            className="flex h-8 w-[37.33px] items-center justify-center rounded-lg px-[5.33px] py-[2.67px] hover:bg-neutral-50"
          >
            {p.id === "google" ? (
              <GoogleLogo />
            ) : (
              <Image src={p.icon} alt="" width={26.67} height={26.67} unoptimized className="size-[26.67px] object-contain" />
            )}
          </button>
        ))}
      </div>
    </>
  );
}

/** Figma builds the Google "G" as a blurred colour group clipped by a mask (2105:5578). */
function GoogleLogo() {
  return (
    <span className="relative block size-[26.67px] overflow-hidden">
      <span
        className="absolute inset-[-0.43%_0.28%_-0.77%_0.23%] [mask-image:url(/icons/google-mask.svg)] [mask-position:0.175px_0.103px] [mask-repeat:no-repeat] [mask-size:23.528px_24.008px]"
      >
        <Image src="/icons/google.svg" alt="" fill unoptimized />
      </span>
    </span>
  );
}
