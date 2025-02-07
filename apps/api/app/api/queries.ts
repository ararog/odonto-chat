import { Context } from "./context"

const allUsers = (_parent: unknown, _args: unknown, context: Context) => {
  return context.prisma.user.findMany()
}

export { allUsers };