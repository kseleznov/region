import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/authApi";
import { useAuthStore } from "./useAuthStore";

type AuthMode = "sign-in" | "sign-up";

export function useAuth(mode: AuthMode) {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      mode === "sign-in"
        ? authApi.login({ email, password })
        : authApi.register({ name, email, password }),
    onSuccess: async () => {
      const { data } = await authApi.me();

      setUser(data);

      router.push("/overview");
    },
    onError: (err: { response?: { status?: number } }) => {
      if (mode === "sign-up" && err.response?.status === 409) {
        setError("Этот email уже зарегистрирован");
      }

      setError(
        mode === "sign-in"
          ? "Неверный email или пароль"
          : "Что-то пошло не так. Попробуйте ещё раз.",
      );
    },
  });

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
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
