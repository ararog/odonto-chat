import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import Stripe from 'stripe';

import { Context } from "@/api/context"
import { AuthPayload, ResetPasswordInput, SubscriptionInput, SubscriptionPayload, SuccessPayload, UserCreateInput, UserLoginInput, VerifyEmailInput } from "@/api/types"
import { sendResetPasswordMail, sendVerificationMail } from '@/services/mail'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'api_key_placeholder');

const login= async (
  _parent: unknown,
  args: { input: UserLoginInput},
  context: Context,
) : Promise<AuthPayload> => {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.input.email,
    },
    include:{
      subscription: true
    }
  })

  if (!user) {
    console.error('User not found')
    throw new Error(`Invalid username or password`)
  }

  if (! user.emailVerified) {
    await sendVerificationMail(user);
    return {
      token: undefined,
      user
    }
  }

  if (user.trialEndsAt && user.trialEndsAt < new Date() && !user.subscription) {
    return {
      token: undefined,
      user
    }
  }

  if (user.subscription && user.subscription.status === 'canceled') {
    return {
      token: undefined,
      user
    }
  }

  const passwordValid = await compare(args.input.password, user.password)
  if (!passwordValid) {
    console.error('Invalid password')
    throw new Error('Invalid username or password')
  }
  return {
    token: sign({ userId: user.id }, process.env.API_SECRET || ""),
    user,
  }
}

const signup = async (
  _parent: unknown,
  args: { input: UserCreateInput },
  context: Context,
) => {
  let user = await context.prisma.user.findFirst({
    where: {
      email: args.input.email
    }
  });

  if (user) {
    console.error("An user with this e-mail already exists.");
    throw new Error("An user with this e-mail already exists.");
  }

  const password = await hash(args.input.password, 10);
  user = await context.prisma.user.create({
    data: {
      email: args.input.email,
      password,
      name: args.input?.name,
    },
  })

  sendVerificationMail(user);

  return {
    id: user.id,
    email: user.email,
    name: user.name
  }
}

const verify= async (
  _parent: unknown,
  args: { input: VerifyEmailInput},
  context: Context,
) : Promise<SuccessPayload> => {

  const user = await context.prisma.user.findFirst({
    where: {
      id: args.input.userId
    }
  });

  if (!user) {
    console.error("User not found");
    throw new Error("User not found");
  }

  const verificationToken = await context.prisma.verificationToken.findFirst({ 
    where: {
      userId: user.id,
      token: args.input.token
    }
  });

  if(!verificationToken) {
    console.error("Invalid token");
    throw new Error("Invalid token");
  }

  if (verificationToken.expires && verificationToken.expires  < new Date()) {
    console.error("Token expired");
    throw new Error("Token expired");
  }

  await await context.prisma.user.update({
    where: {
      id: user.id!
    },
    data: {
      emailVerified: new Date()
    }
  });

  await await context.prisma.verificationToken.delete({
    where: {
      userId_token: {
        userId: user.id!,
        token: args.input.token
      }
    }
  });

  return {
    ok: true
  }
}

const resend= async (
  _parent: unknown,
  args: { userId: number},
  context: Context,
) : Promise<SuccessPayload> => {

  if (!args.userId) {
    console.error("Invalid user id");
    throw new Error("Invalid user id");
  }

  const user = await context.prisma.user.findFirst({ 
    where: {
      id: args.userId
    }
  });

  if (!user) {
    console.error("User not found");
    throw new Error("User not found");
  }

  return {
    ok: true
  }
}

const forgot= async (
  _parent: unknown,
  args: { email: string},
  context: Context,
) : Promise<SuccessPayload> => {

  const user = await context.prisma.user.findFirst({
    where: {
      email: args.email
    }
  });

  if (!user) {
    console.warn("User not found");
    throw new Error("User not found");
  }

  sendResetPasswordMail(user);

  return {
    ok: true
  }
}

const reset= async (
  _parent: unknown,
  args: { input: ResetPasswordInput},
  context: Context,
) : Promise<SuccessPayload> => {

  const user = await context.prisma.user.findFirst({
    where: {
      id: args.input.userId
    }
  });

  if (!user) {
    console.warn("User not found");
    throw new Error("User not found");
  }

  const verificationToken = await context.prisma.verificationToken.findFirst({
    where: {
      userId: user.id,
      token: args.input.token
    }
  });

  if(!verificationToken) {
    console.error("Invalid token");
    throw new Error("Invalid token");
  }

  if (verificationToken.expires && verificationToken.expires < new Date()) {
    console.error("Token expired");
    throw new Error("Token expired");
  }

  const password = await hash(args.input.password, 10);

  await context.prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password
    }
  });

  return {
    ok: true
  }
}

const subscribe = async (
  _parent: unknown,
  args: { input: SubscriptionInput},
  context: Context,
) : Promise<SubscriptionPayload> => {
  if (!process.env.STRIPE_KEY) {
    console.error("Missing stripe api key")
    throw new Error("Cannot initialize payment")
  }

  if (!stripe) {
    console.error("Could not load stripe")
    throw new Error("Cannot initialize payment")
  }

  const user = await context.prisma.user.findFirst({
    where: {
      id: args.input.userId
    }
  });

  if (!user) {
    console.warn("User not found");
    throw new Error("Could not subscribe");
  }

  const params: Stripe.CustomerCreateParams = {
    email: user.email,
    name: user.name!,
  }

  const customer = await stripe.customers.create(params)

  if (!customer) {
    console.warn("Could not create stripe customer");
    throw new Error("Could not subscribe");
  }

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{
      price: "price_1QpYOq2ctmWlTauTDoXajUoC",
    }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  const latest_invoice = subscription.latest_invoice as Stripe.Invoice;
  
  const payment_intent = latest_invoice.payment_intent as Stripe.PaymentIntent;

  return {
    subscriptionId: subscription.id,
    clientSecret: payment_intent.client_secret!,
  }
}

export {login, signup, verify, resend, forgot, reset, subscribe};