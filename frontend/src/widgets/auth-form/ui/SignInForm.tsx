"use client";

import { useTranslation } from "@/shared/i18n";
import { EnvelopeIcon, LockIcon, EyeIcon, ArrowIcon } from "./icons";
import type { AuthFormFields } from "../model/types";

export function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  isPending,
  handleSubmit,
}: AuthFormFields) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex items-center gap-3 bg-search-bg rounded-2xl px-4 py-4">
        <EnvelopeIcon />
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-transparent outline-none text-sm text-dark placeholder:text-brand-gray"
        />
      </label>

      <label className="flex items-center gap-3 bg-search-bg rounded-2xl px-4 py-4">
        <LockIcon />
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("auth.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="flex-1 bg-transparent outline-none text-sm text-dark placeholder:text-brand-gray"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-brand-gray"
        >
          <EyeIcon open={showPassword} />
        </button>
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-purple text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 mt-1 disabled:opacity-60 transition-opacity"
      >
        {isPending ? t("auth.signingIn") : t("auth.signIn")}
        {!isPending && <ArrowIcon />}
      </button>
    </form>
  );
}
