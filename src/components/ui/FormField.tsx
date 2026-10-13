"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { IconEye, IconEyeClosed, IconInfoCircle } from "@tabler/icons-react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  label?: string;
  error?: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + error row. Figma "Form field" (48:7044). */
export function FieldShell({ label, error, htmlFor, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex w-full flex-col items-start gap-2.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="w-full text-[14px] leading-[1.2] font-medium text-black lg:leading-[1.4]">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="flex w-full items-start gap-2 text-[12px] leading-[1.4] text-danger lg:text-[14px]">
          <span className="flex py-0.5">
            <IconInfoCircle size={14.5} stroke={1.5} />
          </span>
          <span className="flex-1">{error}</span>
        </p>
      )}
    </div>
  );
}

/** Pill box styles shared by inputs, selects and textareas. */
export function boxClass(error?: string, extra?: string) {
  return cn(
    "flex w-full items-center gap-2.5 rounded-pill border bg-white px-[18px] shadow-field transition-[border-color,box-shadow] lg:gap-3 lg:px-5",
    "h-11 lg:h-[52px]",
    error
      ? "border-danger"
      : "border-stroke focus-within:border-neutral-900 focus-within:shadow-field-active",
    extra,
  );
}

export const inputClass = (error?: string) =>
  cn(
    "min-w-0 flex-1 bg-transparent text-[14px] leading-[1.2] outline-none placeholder:text-neutral-400 lg:text-[16px] lg:leading-[1.4]",
    error ? "text-danger" : "text-neutral-900",
  );

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  label?: string;
  error?: string;
  id?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  wrapperClassName?: string;
};

export function TextField({ label, error, id, leftIcon, rightSlot, wrapperClassName, className, ...input }: TextFieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <FieldShell label={label} error={error} htmlFor={fid} className={wrapperClassName}>
      <div className={boxClass(error, className)}>
        {leftIcon}
        <input
          id={fid}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fid}-error` : undefined}
          className={inputClass(error)}
          {...input}
        />
        {rightSlot}
      </div>
    </FieldShell>
  );
}

/** Password input with the Figma eye-closed toggle. */
export function PasswordField(props: Omit<TextFieldProps, "type" | "rightSlot">) {
  const [shown, setShown] = useState(false);
  return (
    <TextField
      {...props}
      type={shown ? "text" : "password"}
      rightSlot={
        <button
          type="button"
          aria-label={shown ? "Hide password" : "Show password"}
          aria-pressed={shown}
          onClick={() => setShown((s) => !s)}
          className="flex shrink-0 items-center justify-center text-neutral-900"
        >
          {shown ? <IconEye className="size-4 lg:size-5" stroke={1.5} /> : <IconEyeClosed className="size-4 lg:size-5" stroke={1.5} />}
        </button>
      }
    />
  );
}
