"use server";

import { prisma } from "@/lib/prisma";
import { ComboboxOption } from "@/components/ui/combobox";

export async function searchCustomers(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    const customers = await prisma.customer.findMany({
      take: 10,
      orderBy: { addedDate: "desc" },
    });
    return customers.map(c => ({
      value: c.id.toString(),
      label: `${c.firstName} ${c.lastName}`,
      subLabel: `${c.phoneNumber || ""} ${c.email || ""}`.trim() || "No contact info",
    }));
  }

  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        { email: { contains: searchTerm, mode: "insensitive" } },
        { phoneNumber: { contains: searchTerm, mode: "insensitive" } },
        { firstName: { contains: searchTerm, mode: "insensitive" } },
        { lastName: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
  });

  return customers.map(c => ({
    value: c.id.toString(),
    label: `${c.firstName} ${c.lastName}`,
    subLabel: `${c.phoneNumber || ""} ${c.email || ""}`.trim() || "No contact info",
  }));
}

export async function searchEmployees(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    const employees = await prisma.employee.findMany({
      take: 10,
      orderBy: { addedDate: "desc" },
    });
    return employees.map(e => ({
      value: e.id.toString(),
      label: `${e.firstName} ${e.lastName}`,
      subLabel: `ID: ${e.id} | Phone: ${e.phoneNumber || "N/A"}`
    }));
  }

  const employees = await prisma.employee.findMany({
    where: {
      OR: [
        { email: { contains: searchTerm, mode: "insensitive" } },
        { firstName: { contains: searchTerm, mode: "insensitive" } },
        { lastName: { contains: searchTerm, mode: "insensitive" } },
        { phoneNumber: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
  });

  return employees.map(e => ({
    value: e.id.toString(),
    label: `${e.firstName} ${e.lastName}`,
    subLabel: `ID: ${e.id} | Phone: ${e.phoneNumber || "N/A"}`
  }));
}

export async function searchVehicles(query: string, customerId?: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  
  const baseWhere: any = {};
  if (customerId) {
    baseWhere.customerId = parseInt(customerId);
  }

  if (!searchTerm) {
    const vehicles = await prisma.vehicle.findMany({
      where: baseWhere,
      take: 10,
      orderBy: { id: "desc" },
      include: { customer: true },
    });
    return vehicles.map(v => ({
      value: v.id.toString(),
      label: `${v.licensePlate} - ${v.make} ${v.model}`,
      subLabel: v.customer ? `Owner: ${v.customer.firstName} ${v.customer.lastName}` : undefined,
    }));
  }

  const vehicles = await prisma.vehicle.findMany({
    where: {
      ...baseWhere,
      OR: [
        { licensePlate: { contains: searchTerm, mode: "insensitive" } },
        { make: { contains: searchTerm, mode: "insensitive" } },
        { model: { contains: searchTerm, mode: "insensitive" } },
        { vin: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
    include: { customer: true },
  });

  return vehicles.map(v => ({
    value: v.id.toString(),
    label: `${v.licensePlate} - ${v.make} ${v.model}`,
    subLabel: v.customer ? `Owner: ${v.customer.firstName} ${v.customer.lastName}` : undefined,
  }));
}

export async function searchServices(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  if (!searchTerm) {
    const services = await prisma.commonService.findMany({
      take: 10,
      orderBy: { name: "asc" },
    });
    return services.map(s => ({
      value: s.id.toString(),
      label: s.name,
      subLabel: undefined,
    }));
  }

  const services = await prisma.commonService.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
    orderBy: { name: "asc" },
  });

  return services.map(s => ({
    value: s.id.toString(),
    label: s.name,
    subLabel: undefined,
  }));
}

export async function searchTechnicians(query: string): Promise<ComboboxOption[]> {
  const searchTerm = query.trim();
  
  const baseWhere: any = { role: "TECHNICIAN", isActive: true };
  
  if (!searchTerm) {
    const techs = await prisma.employee.findMany({
      where: baseWhere,
      take: 10,
      orderBy: { firstName: "asc" },
    });
    return techs.map(t => ({
      value: t.id.toString(),
      label: `${t.firstName} ${t.lastName}`,
      subLabel: t.phoneNumber ? `Phone: ${t.phoneNumber}` : `ID: ${t.id}`,
    }));
  }

  const techs = await prisma.employee.findMany({
    where: {
      ...baseWhere,
      OR: [
        { firstName: { contains: searchTerm, mode: "insensitive" } },
        { lastName: { contains: searchTerm, mode: "insensitive" } },
        { phoneNumber: { contains: searchTerm, mode: "insensitive" } },
      ]
    },
    take: 20,
  });

  return techs.map(t => ({
    value: t.id.toString(),
    label: `${t.firstName} ${t.lastName}`,
    subLabel: t.phoneNumber ? `Phone: ${t.phoneNumber}` : `ID: ${t.id}`,
  }));
}
