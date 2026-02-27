import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: 'user@spendly.app' },
  });

  if (existing) {
    console.warn(`Default user already exists: ${existing.id}`);
    console.warn(`Add to server/.env → DEFAULT_USER_ID=${existing.id}`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      name:  'Spendly User',
      email: 'user@spendly.app',
    },
  });

  console.warn(`Default user created: ${user.id}`);
  console.warn(`Add to server/.env → DEFAULT_USER_ID=${user.id}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());