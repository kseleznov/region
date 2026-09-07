"use client";

import { AuthGate } from "@/features/auth";
import { AuthForm } from "@/widgets/auth-form";
import { Notifications } from "@/widgets/notifications";

export default function NotificationsPage() {
  return (
    <AuthGate fallback={<AuthForm initialMode="sign-in" />}>
      <Notifications />
    </AuthGate>
  );
}
