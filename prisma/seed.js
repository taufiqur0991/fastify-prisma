import { PrismaClient } from "./client/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from 'bcrypt';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({
  errorFormat: "minimal",
  adapter,
  transactionOptions: {
    maxWait: 10000, //  10 seconds
    timeout: 15000, //  15s
  },
});

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@local.com" },
    update: {},
    create: {
      email: "admin@local.com",
      name: "Administrator",
      password: await bcrypt.hash("password", 10),
    },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "user@local.com" },
    update: {},
    create: {
      email: "user@local.com",
      name: "User 2",
      password: await bcrypt.hash("password", 10),
    },
  });

  console.log({ user , user2 })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
