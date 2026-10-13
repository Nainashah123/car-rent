"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "@/components/app/Toaster";
import { AuthSwitch } from "@/components/auth/AuthShell";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { Button } from "@/components/ui/Button";
import { PasswordField, TextField } from "@/components/ui/FormField";
import { signIn } from "@/lib/session";
import { compact, confirmError, emailError, nameError, newPasswordError } from "@/lib/validation";

type Field = "name" | "email" | "password" | "confirm";

export function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const set = (f: Field) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    setErrors((x) => ({ ...x, [f]: undefined }));
  };

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = compact({
      name: nameError(values.name),
      email: emailError(values.email),
      password: newPasswordError(values.password),
      confirm: confirmError(values.password, values.confirm),
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    signIn({ name: values.name.trim(), email: values.email.trim() });
    toast("Account created. Welcome to CARENT!");
    router.push("/profile");
  }

  return (
    <form noValidate onSubmit={submit} className="contents">
      <TextField label="Full name" autoComplete="name" placeholder="Enter your full name" value={values.name} error={errors.name} onChange={set("name")} />
      <TextField label="Email" type="email" autoComplete="email" placeholder="Enter your email" value={values.email} error={errors.email} onChange={set("email")} />
      <PasswordField label="Password" autoComplete="new-password" placeholder="Create a password" value={values.password} error={errors.password} onChange={set("password")} />
      <PasswordField label="Repeat password" autoComplete="new-password" placeholder="Repeat your password" value={values.confirm} error={errors.confirm} onChange={set("confirm")} />
      <Button type="submit" variant="primary" className="w-full">
        Sign up
      </Button>
      <SocialLogin label="Or sign up with" />
      <AuthSwitch prompt="Have an account?">
        <Link href="/login" className="border-b border-base-black px-1 py-0.5 text-[14px] leading-[1.4] font-medium text-base-black">
          Login
        </Link>
      </AuthSwitch>
    </form>
  );
}
