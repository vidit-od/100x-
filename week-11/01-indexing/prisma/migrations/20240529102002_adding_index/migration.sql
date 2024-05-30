-- DropIndex
DROP INDEX "User_username_idx";

-- CreateIndex
CREATE INDEX "User_firstname_lastname_idx" ON "User"("firstname", "lastname");
