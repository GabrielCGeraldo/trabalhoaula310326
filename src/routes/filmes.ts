import { prisma } from "../../lib/prisma"
import { Router } from 'express'
import { z } from 'zod'

const router = Router()

const filmeSchema = z.object({
  nome: z.string().min(2),
  preco: z.union([z.number(), z.string()])
    .transform((v) => typeof v === 'string' ? Number(v.replace(',', '.')) : v)
    .refine((v) => !Number.isNaN(v) && v >= 0),
  generoId: z.union([z.number(), z.string()])
    .transform((v) => typeof v === 'string' ? Number(v) : v)
    .refine((v) => Number.isInteger(v) && v > 0),
  sinopse: z.string().min(5),
  ator: z.string().min(2),
  pais: z.string().min(2),
  idioma: z.string().min(2),
  imagem: z.string().url()
})

// LISTAR
router.get("/", async (req, res) => {
  try {
    const filmes = await prisma.filme.findMany({
      include: { genero: true }
    })
    res.json(filmes)
  } catch (error: any) {
    console.error("ERRO FILMES:", error)
    res.status(500).json({ erro: error.message })
  }
})

// PESQUISA
router.get("/pesquisa/:termo", async (req, res) => {
  const { termo } = req.params
  const termoNumero = Number(termo)

  try {
    const filmes = await prisma.filme.findMany({
      include: { genero: true },
      where: isNaN(termoNumero)
        ? {
            OR: [
              { nome: { contains: termo, mode: "insensitive" } },
              { sinopse: { contains: termo, mode: "insensitive" } },
              { ator: { contains: termo, mode: "insensitive" } },
              { pais: { contains: termo, mode: "insensitive" } },
              { idioma: { contains: termo, mode: "insensitive" } },
              { genero: { nome: { contains: termo, mode: "insensitive" } } }
            ]
          }
        : {
            preco: { lte: termoNumero }
          }
    })

    res.json(filmes)
  } catch (error: any) {
    console.error("ERRO PESQUISA:", error)
    res.status(500).json({ erro: error.message })
  }
})

// BUSCAR POR ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ erro: "ID inválido" })
  }

  try {
    const filme = await prisma.filme.findUnique({
      where: { id },
      include: { genero: true }
    })

    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" })
    }

    res.json(filme)
  } catch (error: any) {
    console.error("ERRO BUSCAR:", error)
    res.status(500).json({ erro: error.message })
  }
})

// CRIAR
router.post("/", async (req, res) => {
  const valida = filmeSchema.safeParse(req.body)

  if (!valida.success) {
    return res.status(400).json({ erro: valida.error })
  }

  try {
    const filme = await prisma.filme.create({
      data: valida.data
    })

    res.status(201).json(filme)
  } catch (error: any) {
    console.error("ERRO CREATE:", error)
    res.status(400).json({ erro: error.message })
  }
})

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const filme = await prisma.filme.delete({
      where: { id: Number(req.params.id) }
    })

    res.json(filme)
  } catch (error: any) {
    console.error("ERRO DELETE:", error)
    res.status(400).json({ erro: error.message })
  }
})

// UPDATE
router.put("/:id", async (req, res) => {
  const valida = filmeSchema.safeParse(req.body)

  if (!valida.success) {
    return res.status(400).json({ erro: valida.error })
  }

  try {
    const filme = await prisma.filme.update({
      where: { id: Number(req.params.id) },
      data: valida.data
    })

    res.json(filme)
  } catch (error: any) {
    console.error("ERRO UPDATE:", error)
    res.status(400).json({ erro: error.message })
  }
})

export default router