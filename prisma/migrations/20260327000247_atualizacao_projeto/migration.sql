-- CreateTable
CREATE TABLE "generos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "generos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filmes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "sinopse" TEXT NOT NULL,
    "ator" VARCHAR(100) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "idioma" VARCHAR(30) NOT NULL,
    "generoId" INTEGER NOT NULL,
    "duracaoMin" INTEGER NOT NULL DEFAULT 0,
    "imagem" TEXT NOT NULL,

    CONSTRAINT "filmes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "filmes" ADD CONSTRAINT "filmes_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "generos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
