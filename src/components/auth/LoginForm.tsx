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
import { compact, emailError, loginPasswordError } from "@/lib/validation";

type Errors = Partial<Record<"email" | "password", string>>;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const next = compact({ email: emailError(email), password: loginPasswordError(password) });
    setErrors(next);
    if (Object.keys(next).length) return;
    signIn({ name: email.split("@")[0], email: email.trim() });
    toast("Welcome back!");
    router.push("/profile");
  }

  return (
    <form noValidate onSubmit={submit} className="contents">
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email"
        value={email}
        error={errors.email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((x) => ({ ...x, email: undefined }));
        }}
      />
      <PasswordField
        label="Password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        error={errors.password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((x) => ({ ...x, password: undefined }));
        }}
      />
      <Button type="submit" variant="primary" className="w-full">
        Login
      </Button>
      <SocialLogin label="Or login with" />
      <AuthSwitch prompt="Dont have an account?">
        <Link href="/signup" className="border-b border-base-black px-1 py-0.5 text-[14px] leading-[1.4] font-medium text-base-black">
          Sign up
        </Link>
      </AuthSwitch>
    </form>
  );
}
