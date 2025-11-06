import React from "react";
import type { ToastItem } from "./Toast";
import { useToast } from "./Toast";

const typeStyles: Record<ToastItem["type"], string> = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
  info: "bg-white/10 text-white border border-white/20",
};

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-[calc(100%-2rem)] sm:w-96">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} rounded-lg shadow-lg px-4 py-3 font-mono text-sm flex items-start gap-3 animate-[fadeIn_150ms_ease-out]`}
          role="status"
          aria-live="polite"
        >
          <div className="flex-1 break-words">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
};
