"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-bru-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-bru-well border-2 border-bru-ink
            text-bru-ink placeholder:text-bru-muted/60
            shadow-[var(--shadow-bru-inset)]
            transition-all duration-150
            focus:outline-none focus:bg-bru-surface focus:shadow-[var(--shadow-bru-sm)]
            disabled:opacity-50 disabled:pointer-events-none
            ${error ? "border-bru-red bg-red-50" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-bru-red font-bold pl-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;