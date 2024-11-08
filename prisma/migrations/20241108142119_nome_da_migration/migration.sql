-- CreateTable
CREATE TABLE "Clientes" (
    "cpf" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "sexo" TEXT
);

-- CreateTable
CREATE TABLE "Destinos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagem" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "reviews" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Compras" (
    "numeroCompra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteCpf" BIGINT NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "Compras_clienteCpf_fkey" FOREIGN KEY ("clienteCpf") REFERENCES "Clientes" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compras_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destinos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");
