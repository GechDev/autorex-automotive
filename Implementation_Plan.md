# Implementation Plan: AutoRex CRM & Dashboard

## Phase 1: Audit & Fixes
- **Auth & Registration Fix**: The current registration creates users as `Employee` role. We will update `registerAction` to assign a new `"Customer"` role by default.
- **Roles & Permissions Strategy**: The Server Actions in `src/lib/actions/*` currently lack role guards. We will integrate `requireRole` into all mutations to prevent privilege escalation and unauthorized modifications.

## Phase 2: Admin Appointments Management (`/admin/appointments`)
- **Schema Validation**: The `Appointment` model exists.
- **UI Implementation**: 
  - Create `/admin/appointments/page.tsx` with a DataTable.
  - Show Customer Name, Email, Phone, Vehicle Info, Service, Date/Time, and Status.
  - Provide Row Actions: Approve, Reschedule (opens a dialog with date/time pickers), Cancel.
- **Server Actions**: Implement secure status transitions in `src/lib/actions/appointment.ts` enforcing `Admin` or `Manager` roles.

## Phase 3: Real Admin Dashboard Analytics (`/admin/page.tsx`)
- **Queries**: Fetch real metrics for the dashboard using `prisma`:
  - Active Orders (`active_order = 1`)
  - Total Customers
  - Upcoming Appointments (`status = 'PENDING' | 'APPROVED'`)
  - Revenue (Sum of `order_total_price` for completed orders)
- **UI Implementation**: Replace the static menu cards with dynamic metric cards. Add a simple bar chart using CSS/Tailwind (no heavy charting libraries needed unless explicitly requested, preserving performance) to show orders over the last 7 days. Add a "Recent Activity" table.

## Phase 4: Customer Portal (`/dashboard`)
- **Authentication Linking**: Link the logged-in user (authenticated via the `Employee` model as per the existing Auth.js implementation) to their customer data by matching `session.user.email` to `CustomerIdentifier.customer_email`.
- **UI Implementation**:
  - Personalized welcome header.
  - "My Orders" table linking to `/order/[hash]`.
  - "My Vehicles" list.
  - "My Appointments" tracking.
  - Quick action to "Book Appointment" (pre-filled with their details).

## Phase 5: Granular Roles and Permissions
- **Enforce Backend Authorization**: 
  - Wrap all sensitive operations in `src/lib/actions/employees.ts`, `customers.ts`, `orders.ts`, and `services.ts` with `requireRole(["Admin", "Manager"])` where appropriate.
  - Ensure Employees can only update order statuses but cannot delete other employees.
  - Customers can only access `/dashboard` and cannot access `/admin/*`.
