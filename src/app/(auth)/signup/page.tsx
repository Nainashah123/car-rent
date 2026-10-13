import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Create account" };

/** Figma Signup/Fill — desktop 232:26106, mobile 232:26396; Signup/Error 232:28389. */
export default function SignupPage() {
  return (
    <AuthShell title="Create Account">
      <SignupForm />
    </AuthShell>
  );
}
