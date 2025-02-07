import { User } from "@ararog/odonto-chat-db"

export interface AuthPayload {
  token?: string
  user: User
}

export interface UserLoginInput {
  email: string
  password: string
}

export interface UserCreateInput {
  email: string
  password: string
  name?: string
}

export interface VerifyEmailInput {
  userId: number
  token: string
}

export interface ResetPasswordInput {
  userId: number
  token: string
  password: string
}

export interface SubscriptionInput {
  userId: number
}

export interface SuccessPayload {
  ok: Boolean
}

export interface SubscriptionPayload {
  subscriptionId: string
  clientSecret: string
}
