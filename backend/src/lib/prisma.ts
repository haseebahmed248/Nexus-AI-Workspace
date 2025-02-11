import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
  ],
})

// listeners i will use e.duration to find query duration later on dev-stages
prisma.$on('query' as never, (e) => {
  // Handle query events
})

// For error events
prisma.$on('error' as never, (e) => {
  console.log(`Prisma Error`, e)
})