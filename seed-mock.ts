import 'dotenv/config';
import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding mock data...');
  
  // Create 50 common services
  console.log('Seeding services...');
  const servicesData = Array.from({ length: 50 }).map((_, i) => ({
    service_name: `Service Name ${i + 1}`,
    service_description: `This is a description for service ${i + 1}.`,
  }));
  await prisma.commonService.createMany({
    data: servicesData,
  });

  // Fetch the employee role
  const employeeRole = await prisma.companyRole.findFirst({
    where: { company_role_name: 'Employee' },
  });

  if (!employeeRole) {
    throw new Error('Employee role not found! Run npm run seed first.');
  }

  // Create 100 employees
  console.log('Seeding employees...');
  const passwordHash = await bcrypt.hash('password123', 10);
  for (let i = 0; i < 100; i++) {
    await prisma.employee.create({
      data: {
        employee_email: `employee${i}@autorex.com`,
        active_employee: 1,
        info: {
          create: {
            employee_first_name: `EmpFirst${i}`,
            employee_last_name: `EmpLast${i}`,
            employee_phone: `555-01${i.toString().padStart(2, '0')}`,
          }
        },
        pass: {
          create: {
            employee_password_hashed: passwordHash,
          }
        },
        roles: {
          create: {
            company_role_id: employeeRole.company_role_id,
          }
        }
      }
    });
  }

  // Create 200 customers, each with 1-3 vehicles
  console.log('Seeding customers and vehicles...');
  for (let i = 0; i < 200; i++) {
    const customer = await prisma.customerIdentifier.create({
      data: {
        customer_email: `customer${i}@example.com`,
        customer_phone_number: `555-555-${i.toString().padStart(4, '0')}`,
        customer_hash: `hash_${i}_${Date.now()}`,
        info: {
          create: {
            customer_first_name: `CustFirst${i}`,
            customer_last_name: `CustLast${i}`,
            active_customer_status: 1,
          }
        }
      }
    });

    const vehicleCount = Math.floor(Math.random() * 3) + 1; // 1 to 3
    for (let j = 0; j < vehicleCount; j++) {
      await prisma.customerVehicleInfo.create({
        data: {
          customer_id: customer.customer_id,
          vehicle_year: 2010 + (i % 14),
          vehicle_make: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'][j % 5],
          vehicle_model: `Model ${j}`,
          vehicle_type: 'Sedan',
          vehicle_mileage: 10000 + i * 100,
          vehicle_tag: `ABC-${(i * 10 + j).toString().padStart(4, '0')}`,
          vehicle_serial: `VIN${i}${j}XYZ999`,
          vehicle_color: ['Red', 'Blue', 'Black', 'White', 'Silver'][i % 5],
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
