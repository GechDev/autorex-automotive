"use server";

import { prisma } from "@/lib/prisma";
import { ComboboxOption } from "@/components/ui/combobox";

export async function searchCustomers(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    const customers = await prisma.customerIdentifier.findMany({
      take: 10,
      orderBy: { customer_added_date: "desc" },
      include: { info: true },
    });
    return customers.map(c => ({
      value: c.customer_id.toString(),
      label: `${c.info?.customer_first_name} ${c.info?.customer_last_name}`,
      subLabel: `${c.customer_phone_number || ""} ${c.customer_email || ""}`.trim() || "No contact info",
    }));
  }

  const customers = await prisma.customerIdentifier.findMany({
    where: {
      OR: [
        { customer_email: { contains: searchTerm, mode: "insensitive" } },
        { customer_phone_number: { contains: searchTerm, mode: "insensitive" } },
        {
          info: {
            OR: [
              { customer_first_name: { contains: searchTerm, mode: "insensitive" } },
              { customer_last_name: { contains: searchTerm, mode: "insensitive" } },
            ]
          }
        }
      ]
    },
    take: 20,
    include: { info: true },
  });

  return customers.map(c => ({
    value: c.customer_id.toString(),
    label: `${c.info?.customer_first_name} ${c.info?.customer_last_name}`,
    subLabel: `${c.customer_phone_number || ""} ${c.customer_email || ""}`.trim() || "No contact info",
  }));
}

export async function searchEmployees(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    const employees = await prisma.employee.findMany({
      take: 10,
      orderBy: { added_date: "desc" },
      include: { info: true },
    });
    return employees.map(e => ({
      value: e.employee_id.toString(),
      label: `${e.info?.employee_first_name} ${e.info?.employee_last_name}`,
      subLabel: `ID: ${e.employee_id} | Phone: ${e.info?.employee_phone || "N/A"}`
    }));
  }

  const employees = await prisma.employee.findMany({
    where: {
      OR: [
        { employee_email: { contains: searchTerm, mode: "insensitive" } },
        {
          info: {
            OR: [
              { employee_first_name: { contains: searchTerm, mode: "insensitive" } },
              { employee_last_name: { contains: searchTerm, mode: "insensitive" } },
              { employee_phone: { contains: searchTerm, mode: "insensitive" } },
            ]
          }
        }
      ]
    },
    take: 20,
    include: { info: true },
  });

  return employees.map(e => ({
    value: e.employee_id.toString(),
    label: `${e.info?.employee_first_name} ${e.info?.employee_last_name}`,
    subLabel: `ID: ${e.employee_id} | Phone: ${e.info?.employee_phone || "N/A"}`
  }));
}

export async function searchVehicles(query: string, customerId?: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  
  const baseWhere: any = {};
  if (customerId) {
    baseWhere.customer_id = parseInt(customerId);
  }

  if (!searchTerm) {
    const vehicles = await prisma.customerVehicleInfo.findMany({
      where: baseWhere,
      take: 10,
      orderBy: { vehicle_id: "desc" },
      include: { customer: { include: { info: true } } },
    });
    return vehicles.map(v => ({
      value: v.vehicle_id.toString(),
      label: `${v.vehicle_tag} - ${v.vehicle_make} ${v.vehicle_model}`,
      subLabel: v.customer ? `Owner: ${v.customer.info?.customer_first_name} ${v.customer.info?.customer_last_name}` : undefined,
    }));
  }

  const vehicles = await prisma.customerVehicleInfo.findMany({
    where: {
      ...baseWhere,
      OR: [
        { vehicle_tag: { contains: searchTerm, mode: "insensitive" } },
        { vehicle_make: { contains: searchTerm, mode: "insensitive" } },
        { vehicle_model: { contains: searchTerm, mode: "insensitive" } },
        { vehicle_serial: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
    include: { customer: { include: { info: true } } },
  });

  return vehicles.map(v => ({
    value: v.vehicle_id.toString(),
    label: `${v.vehicle_tag} - ${v.vehicle_make} ${v.vehicle_model}`,
    subLabel: v.customer ? `Owner: ${v.customer.info?.customer_first_name} ${v.customer.info?.customer_last_name}` : undefined,
  }));
}

export async function searchServices(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    const services = await prisma.commonService.findMany({
      take: 10,
      orderBy: { service_name: "asc" },
    });
    return services.map(s => ({
      value: s.service_id.toString(),
      label: s.service_name,
      subLabel: undefined,
    }));
  }

  const services = await prisma.commonService.findMany({
    where: {
      OR: [
        { service_name: { contains: searchTerm, mode: "insensitive" } },
        { service_description: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
    orderBy: { service_name: "asc" },
  });

  return services.map(s => ({
    value: s.service_id.toString(),
    label: s.service_name,
    subLabel: undefined,
  }));
}
