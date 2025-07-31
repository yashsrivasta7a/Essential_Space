import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, ...props }, ref) => {
  return (
    <input
      {...props}
      type="text"
      placeholder={placeholder}
      ref={ref}
      className="w-full px-4 py-3 border rounded-xl text-black-300 placeholder-gray-500 transition-all duration-200 font-mono text-sm  "
      
    />
  );
});

Input.displayName = "Input";