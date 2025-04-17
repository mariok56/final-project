// src/components/ui/form-input.tsx
import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <label 
          htmlFor={id} 
          className="block text-sm font-medium mb-1"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005e54] transition-all",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };