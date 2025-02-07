import { prisma, Prisma } from '../src/client'

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: '$2a$10$k2rXCFgdmO84Vhkyb6trJ.oH6MYLf141uTPf81w04BImKVqDbBivi', // random42
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: '$2a$10$lTlNdIBQvCho0BoQg21KWu/VVKwlYsGwAa5r7ctOV41EKXRQ31ING', // iLikeTurtles42
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
