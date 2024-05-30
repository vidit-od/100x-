-- DropIndex
DROP INDEX "User_firstname_idx";

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
