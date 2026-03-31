/*
  Warnings:

  - Added the required column `imagem` to the `filmes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "filmes" ADD COLUMN     "imagem" TEXT NOT NULL;
