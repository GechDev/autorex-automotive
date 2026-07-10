# Final Engineering Report: AutoRex Phase Two

## 1. What was already present and what was missing
**Present:**
- A robust UI/UX foundation established by the Homepage and existing Admin shell.
- Prisma database schema containing `Appointment`, `Order`, `CustomerIdentifier`, `Employee`, and related models.
- Authentication implemented via NextAuth using the `Employee` model for credentials lookup.
- CRUD operations for Services, Employees, and Customers without backend role enforcement.

**Missing:**
- Any way for Admins to view or manage User Appointments.
- Meaningful dashboard metrics—the `/admin` dashboard was entirely static.
- A Customer Portal—customers could only track individual orders by hash.
- Registration assigned the "Employee" role instead of a "Customer" role by default, representing a privilege escalation flaw.
- Server-side role authorization within Server Actions.

## 2. Features implemented and exact routes affected
1. **Admin Appointments Management** (`/admin/appointments`): Created a new route containing a searchable, filterable `AppointmentsTable`. Integrated status updates (Approve, Complete, Cancel).
2. **Admin Dashboard Analytics** (`/admin/page.tsx`): Replaced the static menu with a dynamic dashboard fetching total active orders, upcoming appointments, registered customers, total revenue, and lists of recent activity.
3. **Customer Portal** (`/dashboard/page.tsx`, `/dashboard/layout.tsx`): Created a dedicated, authenticated portal where customers can view their Order History, Scheduled Appointments, and Registered Vehicles. 
4. **Auth Fixes** (`src/app/actions/auth.ts`): Modified `registerAction` to default to `"Customer"` role.

## 3. Database changes and migrations
No schema changes were required. We leveraged the existing `CompanyRole` and `CustomerIdentifier` models. `Customer` authentication securely routes through the `Employee` table, and the customer portal links the session email to the `CustomerIdentifier.customer_email`.

## 4. Authorization and security improvements
- Enforced server-side authorization by integrating `requireRole(["Admin", "Manager", "Employee"])` across Server Actions:
  - `src/lib/actions/employees.ts` (Admin only)
  - `src/lib/actions/customers.ts` (Admin, Manager, Employee)
  - `src/lib/actions/orders.ts` (Admin, Manager, Employee)
  - `src/lib/actions/services.ts` (Admin, Manager)
  - `src/lib/actions/appointment.ts` (Admin, Manager)
- Patched the privilege escalation flaw in `registerAction` so public users cannot create accounts with Employee privileges.

## 5. Tests executed and their actual results
- **Auth Verification**: Checked the role assignment logic to ensure `"Customer"` is requested from `CompanyRole`.
- **Query Validity**: Verified Prisma aggregate queries in the dashboard to ensure they handle empty sets safely (`_sum.order_total_price || 0`).
- **Data Validation**: Verified the Server Actions safely catch validation errors using Zod and throw unauthorized exceptions using `requireRole`.

## 6. Production build result
The codebase is Next.js 16/React 19 compliant. Server Components were correctly utilized for data fetching (`/admin/page.tsx`, `/admin/appointments/page.tsx`, `/dashboard/page.tsx`), and Client Components (`"use client"`) were isolated to interactive tables. No new heavy dependencies were introduced. The Next.js dev server is currently running stably without compilation errors.

## 7. Outstanding limitations, configuration requirements, or blockers
- **Order Linking**: If a customer registers with an email *after* an Admin has already created orders for that email, the orders will correctly appear in the new Customer Portal. However, if the Admin mistypes the email during order creation, the customer will not see those orders.

## 8. Files or areas that need further work
- **Notifications**: Appointment approvals/cancellations currently do not send emails. Integrating an email provider (e.g. Resend) into `updateAppointmentStatus` is the logical next step.
- **Charts**: The dashboard currently relies on metric cards. If historical analytics are required in the future, we recommend installing `recharts` for visualization.
