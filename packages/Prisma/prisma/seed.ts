import { PrismaClient, onRampStatus } from '@prisma/client'; // Import onRampStatus enum
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '12' },
    update: {},
    create: {
      number: '12',
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
    where: { number: '34' },
    update: {},
    create: {
      number: '34',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      balance: {
        create: {
          amount: 20000, 
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
