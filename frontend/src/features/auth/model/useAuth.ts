import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/authApi";
import { useAuthStore } from "./useAuthStore";
import { getAuthErrorMessage } from "./getAuthErrorMessage";
import type { AuthMode } from "./types";

export function useAuth(mode: AuthMode) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      if (mode === "sign-in") {
        await authApi.login({ email, password });
      } else {
        await authApi.register({ name, email, password });
      }

      // Part of the same operation: if this fails the whole sign-in fails,
      // so it belongs in mutationFn (onError), not in onSuccess.
      const { data } = await authApi.me();

      return data;
    },
    onSuccess: (user) => {
      setUser(user);

      router.push("/overview");
    },
    onError: (err) => {
      setError(getAuthErrorMessage(err, mode));
    },
  });

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (mutation.isPending) {
      return;
    }

    setError("");

    mutation.mutate();
  }

  return {
    name,
    email,
    password,
    error,
    isPending: mutation.isPending,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
