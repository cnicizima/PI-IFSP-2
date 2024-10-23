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
    "codigoDestino" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "data" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Compras" (
    "numeroCompra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteCpf" BIGINT NOT NULL,
    "destinoCliente" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "Compras_clienteCpf_fkey" FOREIGN KEY ("clienteCpf") REFERENCES "Clientes" ("cpf") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compras_destinoCliente_fkey" FOREIGN KEY ("destinoCliente") REFERENCES "Destinos" ("codigoDestino") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");
