import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding roles...');
  
  await prisma.companyRole.createMany({
    data: [
      { company_role_name: 'Employee' },
      { company_role_name: 'Manager' },
      { company_role_name: 'Admin' },
    ],
    skipDuplicates: true,
  });

  console.log('Roles seeded.');

  const adminRole = await prisma.companyRole.findUnique({
    where: { company_role_name: 'Admin' },
  });

  if (!adminRole) {
    throw new Error('Admin role not found');
  }

  console.log('Seeding admin user...');

  const employee = await prisma.employee.upsert({
    where: { employee_email: 'admin@admin.com' },
    update: {},
    create: {
      employee_email: 'admin@admin.com',
      active_employee: 1,
      info: {
        create: {
          employee_first_name: 'Admin',
          employee_last_name: 'Admin',
          employee_phone: '555-555-5555',
        },
      },
      pass: {
        create: {
          employee_password_hashed: '$2b$10$ktYtTOwqzOEiLe67fi0Fj.OxdMQgSBjM/7PXp4GnJEAU/dUSYdKIa',
        },
      },
      roles: {
        create: {
          company_role_id: adminRole.company_role_id,
        },
      },
    },
  });

  console.log('Admin user seeded:', employee);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
