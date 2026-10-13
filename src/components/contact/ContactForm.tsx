"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { toast } from "@/components/app/Toaster";
import { Button } from "@/components/ui/Button";
import { FieldShell, TextField, boxClass } from "@/components/ui/FormField";
import { CONTACT_FORM } from "@/data/contact";
import { cn } from "@/lib/cn";
import { compact, contactMessageError, emailError, requiredNameError } from "@/lib/validation";

type Field = "firstName" | "lastName" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Values>;

const EMPTY: Values = { firstName: "", lastName: "", email: "", message: "" };

function validate(v: Values): Errors {
  return compact({
    firstName: requiredNameError(v.firstName, "first name"),
    lastName: requiredNameError(v.lastName, "last name"),
    email: emailError(v.email),
    message: contactMessageError(v.message),
  });
}

/** Figma "Frame 21" (233:46097 desktop / 233:48303 mobile): the contact card. */
export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const messageId = useId();
  const f = CONTACT_FORM;

  function set(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;
    toast(`Thanks, ${values.firstName.trim()}! Our team will reply to ${values.email.trim()} shortly.`);
    setValues(EMPTY);
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <section
      aria-labelledby="contact-form-title"
      data-qa="contact-card"
      className="relative flex w-full flex-col items-start gap-6 rounded-[20px] border border-neutral-100 bg-white p-5 shadow-[0_12px_16px_rgb(0_0_0/0.06)] lg:w-[566px] lg:shrink-0 lg:rounded-[32px]"
    >
      <div className="flex w-full flex-col items-start gap-2 lg:px-4 lg:py-3">
        <h2
          id="contact-form-title"
          className="w-full font-display text-[18px] leading-[1.2] font-medium text-ink lg:h-[38px] lg:text-[32px] lg:font-normal"
        >
          {f.titleStart}
          <Image
            src={f.icon}
            alt=""
            width={56}
            height={56}
            className="mx-[2px] -my-[5px] inline-block size-8 align-middle lg:mr-[7px] lg:ml-[10px] lg:-mt-[11px] lg:-mb-[7px] lg:size-14"
          />
          {f.titleEnd}
        </h2>
        <p className="w-full text-[14px] leading-[1.2] text-muted lg:text-[16px] lg:leading-[1.4]">{f.subtitle}</p>
      </div>

      <form noValidate onSubmit={submit} className="flex w-full flex-col gap-6" aria-describedby={`${messageId}-disclaimer`}>
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-5 lg:flex-row">
            <TextField
              label="First name"
              name="firstName"
              autoComplete="given-name"
              placeholder={f.placeholders.firstName}
              value={values.firstName}
              error={errors.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              wrapperClassName="lg:min-w-0 lg:flex-1"
            />
            <TextField
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              placeholder={f.placeholders.lastName}
              value={values.lastName}
              error={errors.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              wrapperClassName="lg:min-w-0 lg:flex-1"
            />
          </div>
          <TextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={f.placeholders.email}
            value={values.email}
            error={errors.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <FieldShell label="How can we help" htmlFor={messageId} error={errors.message} className="lg:[&>label]:leading-[1.2]">
            <div className={boxClass(errors.message, "h-auto! items-start rounded-[20px]! px-5! py-[14px]")}>
              <textarea
                id={messageId}
                name="message"
                rows={6}
                placeholder={f.placeholders.message}
                value={values.message}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${messageId}-error` : undefined}
                onChange={(e) => set("message", e.target.value)}
                className={cn(
                  "block h-[124px] min-h-[124px] w-full resize-y bg-transparent text-[14px] leading-[1.2] outline-none placeholder:text-neutral-400 lg:text-[16px] lg:leading-[1.4]",
                  errors.message ? "text-danger" : "text-neutral-900",
                )}
              />
            </div>
          </FieldShell>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <Button type="submit" variant="primary" className="w-full" aria-disabled={hasErrors || undefined}>
            {f.submit}
          </Button>
          <p id={`${messageId}-disclaimer`} className="w-[313px] max-w-full text-center text-[14px] leading-[1.4] text-neutral-400">
            By submitting this form, you agree to our{" "}
            <Link href="/terms" className="hover:text-neutral-900 hover:underline">
              terms
            </Link>
            . You can opt-out anytime.
          </p>
        </div>
      </form>
    </section>
  );
}
