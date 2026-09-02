"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { Toast, ToastVariant } from "./types";

/** How long a toast stays on screen before it auto-dismisses, in ms. */
const TOAST_DURATION = 2400;

interface ToastContextValue {
  /** Show a short confirmation message. It slides in and auto-dismisses. */
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, message, variant }]);
      setTimeout(() => dismissToast(id), TOAST_DURATION);
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed bottom-32 left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="pointer-events-auto flex items-center gap-2.5 whitespace-nowrap rounded-full bg-dark px-4 py-3 text-sm font-bold text-white shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
            >
              <span
                className={cn(
                  "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                  toast.variant === "success"
                    ? "bg-brand-green text-dark"
                    : "bg-white/20 text-white",
                )}
              >
                {toast.variant === "success" ? (
                  <Check size={13} strokeWidth={3} />
                ) : (
                  <Info size={13} strokeWidth={3} />
                )}
              </span>
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within <ToastProvider>");
  }

  return context;
}
