import { z } from "zod";

export const VerifyEmailFormSchema = z.object({
  userId: z
  .number({ required_error: "User ID is required" }),  
  token: z
    .string({ required_error: "Code required" })
    .min(8, "Code must have exactly 8 alphanumeric characters")
    .max(8, "Code must have exactly 8 alphanumeric characters"),
});

export const SubscriptionFormSchema = z.object({
  userId: z
    .number({ required_error: "User ID is required" })
});

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .min(1, "Email is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const SignupDetailsFormSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(5, "Name must be more than 5 characters")
      .max(100, "Name must be less than 100 characters"),
    birthDate: z
      .coerce
      .date({ required_error: "Birth date is required" }),
  });

export const SignupUserFormSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(10, "Name must be more than 5 characters")
      .max(40, "Name must be less than 40 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z
      .string({ required_error: "Password confirmation is required" })
      .min(1, "Password confirmation is required")
      .min(8, "Password confirmation must be more than 8 characters")
      .max(32, "Password confirmation must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and its confirmation doesn't match",
    path: ["confirmPassword"],
  });

export const SignupFormSchema = SignupDetailsFormSchema.and(SignupUserFormSchema);

export const ForgotPasswordFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
});

export const ResetPasswordFormSchema = z.object({
  userId: z
    .number({ required_error: "User ID is required" }),
  token: z.string({ required_error: "Code required" })
    .min(8, "Code must have exactly 8 alphanumeric characters")
    .max(8, "Code must have exactly 8 alphanumeric characters"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: z
    .string({ required_error: "Password confirmation is required" })
    .min(1, "Password confirmation is required")
    .min(8, "Password confirmation must be more than 8 characters")
    .max(32, "Password confirmation must be less than 32 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password and its confirmation doesn't match",
  path: ["confirmPassword"],
});

