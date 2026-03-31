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
    "imagem" VARCHAR(255) NOT NULL,

    CONSTRAINT "filmes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "filmes" ADD CONSTRAINT "filmes_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "generos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
