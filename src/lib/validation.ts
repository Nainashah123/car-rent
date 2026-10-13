/**
 * Client-side form rules shared by the auth and settings forms. Each returns
 * the message to show under the field, or undefined when the value is fine.
 * Server actions must re-check these once auth is wired up.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your email address.";
  if (!EMAIL.test(v)) return "Enter a valid email address.";
  return undefined;
}

export function nameError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Enter your full name.";
  if (v.length < 2) return "Name must be at least 2 characters.";
  return undefined;
}

/** Sign-in only checks presence; strength rules apply when a password is set. */
export function loginPasswordError(value: string): string | undefined {
  if (!value) return "Enter your password.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  return undefined;
}

export function newPasswordError(value: string): string | undefined {
  if (!value) return "Enter a password.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value))
    return "Use at least one letter and one number.";
  return undefined;
}

export function confirmError(password: string, confirm: string): string | undefined {
  if (!confirm) return "Confirm your password.";
  if (confirm !== password) return "Password not matched. Check again";
  return undefined;
}

/** Drops undefined entries so `Object.keys(errors).length` means "has errors". */
export function compact<T extends Record<string, string | undefined>>(errors: T) {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as Partial<T>;
}

/** Remembers the reset email between the reset and confirmation-code steps. */
export const RESET_EMAIL_KEY = "carent:reset-email";
