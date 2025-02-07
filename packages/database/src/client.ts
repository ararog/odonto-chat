import { PrismaClient } from "../generated/client";
export { Prisma } from "../generated/client";
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient().$extends({
  result: {
    user: {
      trialEnded: {
        needs: { trialEndsAt: true },
        compute(user) {
          return user.trialEndsAt && user.trialEndsAt < new Date()
        },
      },
    },
  },
})

 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma