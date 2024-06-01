/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Listing_address_key" ON "Listing"("address");
