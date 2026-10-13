"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { IconCamera, IconPencil, IconStarFilled } from "@tabler/icons-react";
import { toast } from "@/components/app/Toaster";
import { Modal } from "@/components/profile/Modal";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/FormField";
import { CARS } from "@/data/cars";
import { DEFAULT_AVATAR, MY_REVIEWS, type ProfileDetails } from "@/data/profile";
import { cn } from "@/lib/cn";
import { saveProfile } from "@/lib/profile";
import { signIn } from "@/lib/session";
import { addressError, compact, emailError, nameError, phoneError } from "@/lib/validation";

type Field = "name" | "email" | "phone" | "address";
type Errors = Partial<Record<Field | "avatar", string>>;

/** Card "Frame 21" (233:41707 desktop / 233:42456 mobile) + "Show my review". */
export function AboutPanel({ details, signedIn }: { details: ProfileDetails; signedIn: boolean }) {
  const [editing, setEditing] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  return (
    <div className="relative flex w-full flex-col items-center gap-5 lg:min-h-[573px] lg:gap-[53px]">
      <section
        aria-label="About me"
        className={cn(
          "flex w-full flex-col items-center justify-center gap-6 rounded-[20px] border border-neutral-100 bg-white p-5 drop-shadow-[0_10px_12px_rgb(0_0_0/0.04)] lg:rounded-[32px] lg:drop-shadow-[0_12px_16px_rgb(0_0_0/0.06)]",
          !editing && "lg:h-[466px]",
        )}
      >
        {editing ? (
          <EditForm details={details} signedIn={signedIn} onDone={() => setEditing(false)} />
        ) : (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-3 lg:flex-1">
              <Avatar src={details.avatar} className="size-[100px] lg:size-[120px]" />
              <div className="flex max-w-full flex-col items-center gap-1 lg:gap-2">
                <p className="max-w-full truncate px-2 py-1 font-display text-[18px] leading-[1.2] text-ink lg:text-[32px]">{details.name}</p>
                <p className="max-w-full truncate text-[12px] leading-[1.4] text-neutral-450 lg:text-[16px]">{details.email}</p>
              </div>
            </div>
            <Button variant="white" onClick={() => setEditing(true)}>
              <IconPencil className="size-[18px] lg:size-5" stroke={1.5} aria-hidden />
              Edit
            </Button>
          </>
        )}
      </section>

      <button
        type="button"
        onClick={() => setReviewsOpen(true)}
        className="min-h-0 border-b border-neutral-900 px-1.5 py-1 lg:h-[30px] text-[14px] leading-[1.2] font-medium text-neutral-900 lg:text-[16px] lg:leading-[1.4]"
      >
        Show my review
      </button>

      {!signedIn && (
        <p className="-mt-2 text-center text-[12px] leading-[1.4] text-neutral-400 lg:absolute lg:bottom-0 lg:mt-0">
          You are viewing a demo profile.{" "}
          <Link href="/login" className="font-medium text-neutral-900 underline underline-offset-2">
            Login
          </Link>
        </p>
      )}

      {reviewsOpen && (
        <Modal title="My reviews" onClose={() => setReviewsOpen(false)}>
          <ul className="flex flex-col gap-4">
            {MY_REVIEWS.map((r) => {
              const car = CARS.find((c) => c.id === r.carId);
              return (
                <li key={r.id} className="flex flex-col gap-1.5 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {car ? (
                      <Link href={`/cars/${car.slug}`} className="text-[16px] leading-[1.4] font-semibold text-black hover:underline">
                        {car.name}
                      </Link>
                    ) : (
                      <span className="text-[16px] font-semibold">Car</span>
                    )}
                    <span className="text-[12px] leading-[1.4] text-neutral-400 lg:text-[14px]">{r.date}</span>
                  </div>
                  <span className="flex items-center gap-0.5 text-warning-600" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <IconStarFilled key={i} size={14} className={i < r.rating ? "" : "text-neutral-100"} aria-hidden />
                    ))}
                  </span>
                  <p className="text-[14px] leading-[1.4] text-neutral-500">{r.text}</p>
                </li>
              );
            })}
          </ul>
        </Modal>
      )}
    </div>
  );
}

function Avatar({ src, className }: { src?: string; className?: string }) {
  const url = src || DEFAULT_AVATAR;
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-neutral-50", className)}>
      <Image src={url} alt="Profile photo" fill sizes="120px" unoptimized={url.startsWith("data:")} className="object-cover" />
    </span>
  );
}

/** Downscale an uploaded photo to a 240px square JPEG data URL so it fits in localStorage. */
function toAvatarDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const size = 240;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas"));
      const s = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };
    img.src = url;
  });
}

function EditForm({ details, signedIn, onDone }: { details: ProfileDetails; signedIn: boolean; onDone: () => void }) {
  const [values, setValues] = useState<Record<Field, string>>({
    name: details.name,
    email: details.email,
    phone: details.phone,
    address: details.address,
  });
  const [avatar, setAvatar] = useState(details.avatar);
  const [errors, setErrors] = useState<Errors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function pickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setErrors((x) => ({ ...x, avatar: "Choose an image file (JPG, PNG or WebP)." }));
    if (file.size > 5 * 1024 * 1024) return setErrors((x) => ({ ...x, avatar: "Photo must be 5 MB or smaller." }));
    try {
      setAvatar(await toAvatarDataUrl(file));
      setErrors((x) => ({ ...x, avatar: undefined }));
    } catch {
      setErrors((x) => ({ ...x, avatar: "That image could not be read. Try another one." }));
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = compact({
      name: nameError(values.name),
      email: emailError(values.email),
      phone: phoneError(values.phone),
      address: addressError(values.address),
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    const clean = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
    };
    if (signedIn) {
      signIn({ name: clean.name, email: clean.email });
      saveProfile({ phone: clean.phone, address: clean.address, avatar });
    } else {
      saveProfile({ ...clean, avatar });
    }
    toast("Profile saved");
    onDone();
  }

  return (
    <form noValidate onSubmit={submit} className="flex w-full flex-col items-center gap-5" aria-label="Edit profile">
      <div className="flex flex-col items-center gap-3">
        <Avatar src={avatar} className="size-[100px] lg:size-[120px]" />
        <input ref={fileRef} type="file" accept="image/*" className="sr-only" tabIndex={-1} aria-hidden onChange={pickPhoto} />
        <Button variant="white" size="sm" onClick={() => fileRef.current?.click()}>
          <IconCamera size={16} stroke={1.5} aria-hidden />
          Change photo
        </Button>
        {errors.avatar && (
          <p role="alert" className="text-center text-[12px] leading-[1.4] text-danger lg:text-[14px]">
            {errors.avatar}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        <TextField label="Full name" autoComplete="name" placeholder="Enter your full name" value={values.name} error={errors.name} onChange={set("name")} />
        <TextField label="Email" type="email" autoComplete="email" placeholder="Enter your email" value={values.email} error={errors.email} onChange={set("email")} />
        <TextField label="Phone number" type="tel" autoComplete="tel" placeholder="+62 812 3456 7890" value={values.phone} error={errors.phone} onChange={set("phone")} />
        <TextField label="Address" autoComplete="street-address" placeholder="Street, city" value={values.address} error={errors.address} onChange={set("address")} />
      </div>
      <div className="flex w-full flex-wrap justify-end gap-3">
        <Button variant="white" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save changes
        </Button>
      </div>
    </form>
  );
}
