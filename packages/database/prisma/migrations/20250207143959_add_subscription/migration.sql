-- AlterTable
ALTER TABLE "users" ADD COLUMN     "trial_ends_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "subscriptions" (
    "userId" INTEGER NOT NULL,
    "subscriptionId" VARCHAR(70) NOT NULL,
    "customerId" VARCHAR(70) NOT NULL,
    "productId" VARCHAR(70) NOT NULL,
    "status" VARCHAR(20) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
