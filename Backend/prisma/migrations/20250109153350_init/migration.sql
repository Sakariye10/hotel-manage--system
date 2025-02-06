-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Super_Admin', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "Jobs" AS ENUM ('Manager', 'Cashier', 'Cleaning', 'Guard', 'Waiter', 'Cook');

-- CreateTable
CREATE TABLE "Users" (
    "U_Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" "Roles" NOT NULL DEFAULT 'User',
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("U_Id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "H_Id" SERIAL NOT NULL,
    "H_No" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "No_Floors" TEXT NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("H_Id")
);

-- CreateTable
CREATE TABLE "Floor" (
    "F_Id" SERIAL NOT NULL,
    "F_No" TEXT NOT NULL,
    "H_Id" INTEGER NOT NULL,
    "No_Rooms" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("F_Id")
);

-- CreateTable
CREATE TABLE "Room_Type" (
    "Rt_Id" SERIAL NOT NULL,
    "Rt_Name" TEXT NOT NULL,
    "Rt_Price" TEXT NOT NULL,
    "No_Beds" TEXT NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_Type_pkey" PRIMARY KEY ("Rt_Id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "R_Id" SERIAL NOT NULL,
    "R_No" TEXT NOT NULL,
    "Rt_Id" INTEGER NOT NULL,
    "F_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("R_Id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "Bk_Id" SERIAL NOT NULL,
    "Cu_Name" TEXT NOT NULL,
    "Cu_Phone" TEXT NOT NULL,
    "R_Id" INTEGER NOT NULL,
    "Price" INTEGER NOT NULL,
    "B_Days" INTEGER NOT NULL,
    "Total" INTEGER NOT NULL,
    "Paid" INTEGER NOT NULL,
    "Balance" INTEGER NOT NULL,
    "Us_Id" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("Bk_Id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "Cu_Id" SERIAL NOT NULL,
    "Cu_Name" TEXT NOT NULL,
    "Cu_Phone" TEXT NOT NULL,
    "Cu_Address" TEXT,
    "Cu_Balance" INTEGER NOT NULL DEFAULT 0,
    "Author_Id" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("Cu_Id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "P_Id" SERIAL NOT NULL,
    "Cu_Id" INTEGER NOT NULL,
    "Balance" INTEGER NOT NULL,
    "Paid" INTEGER NOT NULL,
    "Total" INTEGER NOT NULL,
    "Pay_Method" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("P_Id")
);

-- CreateTable
CREATE TABLE "Debts" (
    "D_Id" SERIAL NOT NULL,
    "Cu_Name" TEXT NOT NULL,
    "Cu_Phone" TEXT NOT NULL,
    "Balance" TEXT NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Debts_pkey" PRIMARY KEY ("D_Id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "Em_Id" SERIAL NOT NULL,
    "Em_Name" TEXT NOT NULL,
    "Em_Phone" TEXT NOT NULL,
    "Em_Address" TEXT NOT NULL,
    "Em_Sallary" TEXT NOT NULL,
    "Em_Job" "Jobs" NOT NULL DEFAULT 'Waiter',
    "Author_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Em_Id")
);

-- CreateTable
CREATE TABLE "Sallary" (
    "Sa_Id" SERIAL NOT NULL,
    "Em_Id" INTEGER NOT NULL,
    "Paid" INTEGER NOT NULL,
    "Author_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sallary_pkey" PRIMARY KEY ("Sa_Id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "Ex_Id" SERIAL NOT NULL,
    "Purpose" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "Man_Checked" BOOLEAN NOT NULL DEFAULT false,
    "Author_Id" INTEGER NOT NULL,
    "Is_Deleted" BOOLEAN NOT NULL DEFAULT false,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("Ex_Id")
);

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_H_Id_fkey" FOREIGN KEY ("H_Id") REFERENCES "Hotel"("H_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_Rt_Id_fkey" FOREIGN KEY ("Rt_Id") REFERENCES "Room_Type"("Rt_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_F_Id_fkey" FOREIGN KEY ("F_Id") REFERENCES "Floor"("F_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_R_Id_fkey" FOREIGN KEY ("R_Id") REFERENCES "Rooms"("R_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_Us_Id_fkey" FOREIGN KEY ("Us_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Cu_Id_fkey" FOREIGN KEY ("Cu_Id") REFERENCES "Customers"("Cu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sallary" ADD CONSTRAINT "Sallary_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sallary" ADD CONSTRAINT "Sallary_Em_Id_fkey" FOREIGN KEY ("Em_Id") REFERENCES "Employee"("Em_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
