export type VerificationForm = {
  userId: string;
  token: string;
};

export type SubscriptionForm = {
  userId: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupDetailsForm = {
  name: string;
  birthDate: Date;
};

export type SignupUserForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupForm = SignupUserForm & SignupDetailsForm;

export type ForgotPasswordForm = {
  email: string;
};

export type ResetPasswordForm = {
  userId: number;
  token: string;
  password: string;
  confirmPassword: string;
};
