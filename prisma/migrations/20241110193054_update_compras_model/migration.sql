/*
  Warnings:

  - You are about to drop the `Clientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clienteCpf` on the `Compras` table. All the data in the column will be lost.
  - Added the required column `clienteId` to the `Compras` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Clientes_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Clientes";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compras" (
    "numeroCompra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "Compras_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compras_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destinos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Compras" ("data", "destinoId", "numeroCompra", "quantidade") SELECT "data", "destinoId", "numeroCompra", "quantidade" FROM "Compras";
DROP TABLE "Compras";
ALTER TABLE "new_Compras" RENAME TO "Compras";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
