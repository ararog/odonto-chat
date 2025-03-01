import { createSchema } from 'graphql-yoga'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

import * as mutations from '@/api/mutations'
import * as queries from '@/api/queries'

export const typeDefs = `
  ${DateTimeTypeDefinition}

  type Mutation {
    login(input: UserLoginInput): AuthPayload
    signup(input: UserCreateInput): User
    verify(input: VerifyEmailInput): SuccessPayload
    resend(userId: String!): SuccessPayload
    forgot(email: String!): SuccessPayload
    reset(input: ResetPasswordInput): SuccessPayload
    subscribe(input: SubscriptionInput): SubscriptionPayload
  }

  type AuthPayload {
    token: String
    user: User!
  }

  type StripeSecretPayload {
    clientSecret: String!
  }

  type Query {
    allUsers: [User!]!
    getClientSecret: StripeSecretPayload
  }

  enum SortOrder {
    asc
    desc
  }

  type User {
    id: Int!
    name: String
    email: String!
    emailVerified: DateTime
    trialEnded: Boolean
    subscription: Subscription
  }

  type Subscription {
    subscriptionId: String!
    status: String!
  }

  input SubscriptionInput {
    userId: Int!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }  

  input UserCreateInput {
    name: String
    email: String!
    password: String!
  }

  input VerifyEmailInput {
    userId: Int!
    token: String!
  }

  input ResetPasswordInput {
    userId: Int!
    token: String!
    password: String!
    confirmPassword: String!
  }

  input UserUniqueInput {
    email: String
    id: Int
  }

  type SuccessPayload {
    ok: Boolean
  }

  type SubscriptionPayload {
    subscriptionId: String
    clientSecret: String
  }
`

export const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {    
    ...mutations,
  },
  DateTime: DateTimeResolver
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})
