-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Destinos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "reviews" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL
);
INSERT INTO "new_Destinos" ("avaliacao", "descricao", "id", "imagem", "nome", "preco", "reviews") SELECT "avaliacao", "descricao", "id", "imagem", "nome", "preco", "reviews" FROM "Destinos";
DROP TABLE "Destinos";
ALTER TABLE "new_Destinos" RENAME TO "Destinos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
