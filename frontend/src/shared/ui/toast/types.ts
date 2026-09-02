export type ToastVariant = "success" | "info";

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}
