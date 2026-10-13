import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Login" };

/** Figma Login/Default — desktop 233:42114, mobile 233:42822. */
export default function LoginPage() {
  return (
    <AuthShell title="Welcome back">
      <LoginForm />
    </AuthShell>
  );
}
