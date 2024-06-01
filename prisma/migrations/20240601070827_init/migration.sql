-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "address" TEXT,
    "Price" DOUBLE PRECISION,
    "bathrooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "offer" BOOLEAN NOT NULL,
    "imageUrls" TEXT[],
    "Realtor" TEXT NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
