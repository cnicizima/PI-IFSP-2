/*
  Warnings:

  - You are about to drop the column `destinoCliente` on the `Compras` table. All the data in the column will be lost.
  - The primary key for the `Destinos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigoDestino` on the `Destinos` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Destinos` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `Destinos` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - Added the required column `destinoId` to the `Compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avaliacao` to the `Destinos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Destinos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Destinos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Destinos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `Destinos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compras" (
    "numeroCompra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteCpf" BIGINT NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "Compras_clienteCpf_fkey" FOREIGN KEY ("clienteCpf") REFERENCES "Clientes" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compras_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destinos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Compras" ("clienteCpf", "data", "numeroCompra", "quantidade") SELECT "clienteCpf", "data", "numeroCompra", "quantidade" FROM "Compras";
DROP TABLE "Compras";
ALTER TABLE "new_Compras" RENAME TO "Compras";
CREATE TABLE "new_Destinos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "reviews" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL
);
INSERT INTO "new_Destinos" ("nome", "preco") SELECT "nome", "preco" FROM "Destinos";
DROP TABLE "Destinos";
ALTER TABLE "new_Destinos" RENAME TO "Destinos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
