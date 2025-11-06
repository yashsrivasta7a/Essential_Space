import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration?: number; // ms
}

interface ToastContextShape {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType, duration?: number) => number;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextShape | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(1);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
    const id = idRef.current++;
    const toast: ToastItem = { id, message, type, duration };
    setToasts((prev) => [...prev, toast]);

    // Auto-dismiss
    if (duration && duration > 0) {
      window.setTimeout(() => removeToast(id), duration);
    }

    return id;
  }, [removeToast]);

  const value = useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");

  const success = useCallback((message: string, duration?: number) => ctx.addToast(message, "success", duration), [ctx]);
  const error = useCallback((message: string, duration?: number) => ctx.addToast(message, "error", duration), [ctx]);
  const warning = useCallback((message: string, duration?: number) => ctx.addToast(message, "warning", duration), [ctx]);
  const info = useCallback((message: string, duration?: number) => ctx.addToast(message, "info", duration), [ctx]);

  return { ...ctx, success, error, warning, info };
}
