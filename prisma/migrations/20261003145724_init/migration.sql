-- CreateTable
CREATE TABLE "customer_identifier" (
    "customer_id" SERIAL NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone_number" TEXT NOT NULL,
    "customer_added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_hash" TEXT NOT NULL,

    CONSTRAINT "customer_identifier_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_info" (
    "customer_info_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "customer_first_name" TEXT NOT NULL,
    "customer_last_name" TEXT NOT NULL,
    "active_customer_status" INTEGER NOT NULL,

    CONSTRAINT "customer_info_pkey" PRIMARY KEY ("customer_info_id")
);

-- CreateTable
CREATE TABLE "customer_vehicle_info" (
    "vehicle_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "vehicle_year" INTEGER NOT NULL,
    "vehicle_make" TEXT NOT NULL,
    "vehicle_model" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "vehicle_mileage" INTEGER NOT NULL,
    "vehicle_tag" TEXT NOT NULL,
    "vehicle_serial" TEXT NOT NULL,
    "vehicle_color" TEXT NOT NULL,

    CONSTRAINT "customer_vehicle_info_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "company_roles" (
    "company_role_id" SERIAL NOT NULL,
    "company_role_name" TEXT NOT NULL,

    CONSTRAINT "company_roles_pkey" PRIMARY KEY ("company_role_id")
);

-- CreateTable
CREATE TABLE "common_services" (
    "service_id" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_description" TEXT,

    CONSTRAINT "common_services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" SERIAL NOT NULL,
    "employee_email" TEXT NOT NULL,
    "active_employee" INTEGER NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "employee_info" (
    "employee_info_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "employee_first_name" TEXT NOT NULL,
    "employee_last_name" TEXT NOT NULL,
    "employee_phone" TEXT NOT NULL,

    CONSTRAINT "employee_info_pkey" PRIMARY KEY ("employee_info_id")
);

-- CreateTable
CREATE TABLE "employee_pass" (
    "employee_pass_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "employee_password_hashed" TEXT NOT NULL,

    CONSTRAINT "employee_pass_pkey" PRIMARY KEY ("employee_pass_id")
);

-- CreateTable
CREATE TABLE "employee_role" (
    "employee_role_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "company_role_id" INTEGER NOT NULL,

    CONSTRAINT "employee_role_pkey" PRIMARY KEY ("employee_role_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active_order" INTEGER NOT NULL,
    "order_hash" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_info" (
    "order_info_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "order_total_price" INTEGER NOT NULL,
    "estimated_completion_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "completion_date" TIMESTAMP(3),
    "additional_request" TEXT,
    "notes_for_internal_use" TEXT,
    "notes_for_customer" TEXT,
    "additional_requests_completed" INTEGER NOT NULL,

    CONSTRAINT "order_info_pkey" PRIMARY KEY ("order_info_id")
);

-- CreateTable
CREATE TABLE "order_services" (
    "order_service_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "service_completed" INTEGER NOT NULL,

    CONSTRAINT "order_services_pkey" PRIMARY KEY ("order_service_id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "order_status_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "order_status" INTEGER NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("order_status_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_identifier_customer_email_key" ON "customer_identifier"("customer_email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_info_customer_id_key" ON "customer_info"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_roles_company_role_name_key" ON "company_roles"("company_role_name");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employee_email_key" ON "employee"("employee_email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_employee_id_key" ON "employee_info"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_pass_employee_id_key" ON "employee_pass"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_info_order_id_key" ON "order_info"("order_id");

-- AddForeignKey
ALTER TABLE "customer_info" ADD CONSTRAINT "customer_info_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer_identifier"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_vehicle_info" ADD CONSTRAINT "customer_vehicle_info_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer_identifier"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_info" ADD CONSTRAINT "employee_info_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_pass" ADD CONSTRAINT "employee_pass_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_role" ADD CONSTRAINT "employee_role_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_role" ADD CONSTRAINT "employee_role_company_role_id_fkey" FOREIGN KEY ("company_role_id") REFERENCES "company_roles"("company_role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer_identifier"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "customer_vehicle_info"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_info" ADD CONSTRAINT "order_info_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "common_services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status" ADD CONSTRAINT "order_status_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
