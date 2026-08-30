"use client";

import { AuthGate } from "@/features/auth";
import { AuthForm } from "@/widgets/auth-form";
import { Profile } from "@/widgets/profile";

export default function ProfilePage() {
  return (
    <AuthGate fallback={<AuthForm initialMode="sign-in" />}>
      <Profile />
    </AuthGate>
  );
}
