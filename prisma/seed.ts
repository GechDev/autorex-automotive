import { PrismaClient, Role } from '../src/generated/prisma';
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

config(); // load .env

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding initial admin user...');
  
  // Note: we would normally hash the password with argon2id/bcrypt here.
  // We're using a dummy hash for seed purposes.
  const dummyHash = '$2b$10$P6mgc4x5S16WXNu5dMyyZO0tpLWn8U8339E6AB07qIE5liaHNjuuK'; // "admin123"

  const employee = await prisma.employee.upsert({
    where: { email: 'admin@abesgarage.com' },
    update: { passwordHash: dummyHash },
    create: {
      email: 'admin@abesgarage.com',
      firstName: 'System',
      lastName: 'Admin',
      phoneNumber: '555-555-5555',
      passwordHash: dummyHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });

  const advisor = await prisma.employee.upsert({
    where: { email: 'advisor@abesgarage.com' },
    update: { passwordHash: dummyHash },
    create: {
      email: 'advisor@abesgarage.com',
      firstName: 'Service',
      lastName: 'Advisor',
      phoneNumber: '555-555-5556',
      passwordHash: dummyHash,
      role: Role.ADVISOR,
      isActive: true,
    },
  });

  const technician = await prisma.employee.upsert({
    where: { email: 'tech@abesgarage.com' },
    update: { passwordHash: dummyHash },
    create: {
      email: 'tech@abesgarage.com',
      firstName: 'Master',
      lastName: 'Technician',
      phoneNumber: '555-555-5557',
      passwordHash: dummyHash,
      role: Role.TECHNICIAN,
      isActive: true,
    },
  });

  const cashier = await prisma.employee.upsert({
    where: { email: 'cashier@abesgarage.com' },
    update: { passwordHash: dummyHash },
    create: {
      email: 'cashier@abesgarage.com',
      firstName: 'Checkout',
      lastName: 'Cashier',
      phoneNumber: '555-555-5558',
      passwordHash: dummyHash,
      role: Role.CASHIER,
      isActive: true,
    },
  });

  console.log('Staff accounts seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
