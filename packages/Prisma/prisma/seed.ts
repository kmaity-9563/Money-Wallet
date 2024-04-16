import { PrismaClient, onRampStatus } from '@prisma/client'; // Import onRampStatus enum
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      balance: {
        create: {
          amount: 40000, 
          locked: 0
        }
      },
      onRampTransactions: { 
        create: {
          startTime: new Date(),
          status: onRampStatus.success, 
          amount: 20000,
          token: "token__11223",
          provider: "HDFC Bank",
        },
      },
    },
    include: { balance: true, onRampTransactions: true } 
  });

  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      balance: {
        create: {
          amount: 2000, 
          locked: 0
        }
      },
      onRampTransactions: { 
        create: {
          startTime: new Date(),
          status: onRampStatus.failure, 
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
    include: { balance: true, onRampTransactions: true } 
  });

  console.log({ alice, bob });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
