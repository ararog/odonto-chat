import { prisma, PrismaClient } from '@ararog/odonto-chat-db'

export interface Context {
  prisma: PrismaClient
  req: any // HTTP request carrying the `Authorization` header
  res: any
}

export function createContext(req: any, res: any) {
  return {
    ...req,
    res,
    prisma,
  }
}
