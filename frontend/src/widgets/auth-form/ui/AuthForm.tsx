"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { useAuth } from "@/features/auth";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { GoogleIcon, AppleIcon } from "./icons";
import type { Mode } from "../model/types";

interface AuthFormProps {
  initialMode: Mode;
}

export function AuthForm({ initialMode }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isPending,
    handleSubmit,
  } = useAuth(mode);

  return (
    <div className="px-5 py-8">
      <p className="text-sm text-brand-gray mb-1">
        {mode === "sign-up" ? "Get started" : "Welcome back"}
      </p>
      <h1 className="text-3xl font-bold text-dark mb-6">
        {mode === "sign-up" ? "Create account" : "Sign in"}
      </h1>

      <div className="flex bg-search-bg rounded-full p-1 mb-5">
        {(["sign-in", "sign-up"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 py-3 rounded-full text-sm font-bold transition-all",
              mode === m ? "bg-brand-purple text-white" : "text-brand-gray",
            )}
          >
            {m === "sign-in" ? "Sign in" : "Sign up"}
          </button>
        ))}
      </div>

      {mode === "sign-in" ? (
        <SignInForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={error}
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
      ) : (
        <SignUpForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={error}
          isPending={isPending}
          handleSubmit={handleSubmit}
        />
      )}

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-brand-gray">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-search-bg py-4 rounded-full text-sm font-semibold text-dark"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-search-bg py-4 rounded-full text-sm font-semibold text-dark"
        >
          <AppleIcon />
          Continue with Apple
        </button>
      </div>

      <p className="text-center text-sm text-brand-gray mt-6">
        {mode === "sign-up"
          ? "Already have an account? "
          : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "sign-up" ? "sign-in" : "sign-up")}
          className="text-dark font-bold"
        >
          {mode === "sign-up" ? "Sign in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}
