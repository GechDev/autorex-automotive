import 'dotenv/config';
import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding mock data...');
  
  // Create 50 common services
  console.log('Seeding services...');
  const servicesData = Array.from({ length: 50 }).map((_, i) => ({
    name: `Service Name ${i + 1}`,
    description: `This is a description for service ${i + 1}.`,
    defaultLaborPrice: Math.random() * 100 + 50,
  }));
  await prisma.commonService.createMany({
    data: servicesData,
  });

  // Create 100 employees
  console.log('Seeding employees...');
  const passwordHash = await bcrypt.hash('password123', 10);
  for (let i = 0; i < 100; i++) {
    await prisma.employee.create({
      data: {
        email: `employee${i}@autorex.com`,
        passwordHash,
        firstName: `EmpFirst${i}`,
        lastName: `EmpLast${i}`,
        phoneNumber: `555-01${i.toString().padStart(2, '0')}`,
        role: ['ADMIN', 'ADVISOR', 'TECHNICIAN', 'CASHIER'][i % 4] as any,
        isActive: true,
      }
    });
  }

  // Create 200 customers, each with 1-3 vehicles
  console.log('Seeding customers and vehicles...');
  for (let i = 0; i < 200; i++) {
    const customer = await prisma.customer.create({
      data: {
        email: `customer${i}@example.com`,
        phoneNumber: `555-555-${i.toString().padStart(4, '0')}`,
        firstName: `CustFirst${i}`,
        lastName: `CustLast${i}`,
      }
    });

    const vehicleCount = Math.floor(Math.random() * 3) + 1; // 1 to 3
    for (let j = 0; j < vehicleCount; j++) {
      await prisma.vehicle.create({
        data: {
          customerId: customer.id,
          year: 2010 + (i % 14),
          make: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'][j % 5],
          model: `Model ${j}`,
          mileage: 10000 + i * 100,
          licensePlate: `ABC-${(i * 10 + j).toString().padStart(4, '0')}`,
          vin: `VIN${i}${j}XYZ999`,
          color: ['Red', 'Blue', 'Black', 'White', 'Silver'][i % 5],
        }
      });
    }
  }

  console.log('Mock data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
