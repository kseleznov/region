export type Mode = "sign-in" | "sign-up";

export interface AuthFormFields {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  error: string;
  isPending: boolean;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export interface SignUpFormFields extends AuthFormFields {
  name: string;
  setName: (v: string) => void;
}
