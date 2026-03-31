import { prisma } from "../../lib/prisma"
import { Router } from 'express'
import { z } from 'zod'

const router = Router()

const generoSchema = z.object({
  nome: z.string().min(3)
})

// LISTAR
router.get("/", async (req, res) => {
  try {
    const generos = await prisma.genero.findMany()
    res.json(generos)
  } catch (error: any) {
    console.error("ERRO GENEROS:", error)
    res.status(500).json({ erro: error.message })
  }
})

// CRIAR
router.post("/", async (req, res) => {
  const valida = generoSchema.safeParse(req.body)

  if (!valida.success) {
    return res.status(400).json({ erro: valida.error })
  }

  try {
    const genero = await prisma.genero.create({
      data: valida.data
    })

    res.status(201).json(genero)
  } catch (error: any) {
    console.error("ERRO CREATE GENERO:", error)
    res.status(400).json({ erro: error.message })
  }
})

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const genero = await prisma.genero.delete({
      where: { id: Number(req.params.id) }
    })

    res.json(genero)
  } catch (error: any) {
    console.error("ERRO DELETE GENERO:", error)
    res.status(400).json({ erro: error.message })
  }
})

// UPDATE
router.put("/:id", async (req, res) => {
  const valida = generoSchema.safeParse(req.body)

  if (!valida.success) {
    return res.status(400).json({ erro: valida.error })
  }

  try {
    const genero = await prisma.genero.update({
      where: { id: Number(req.params.id) },
      data: valida.data
    })

    res.json(genero)
  } catch (error: any) {
    console.error("ERRO UPDATE GENERO:", error)
    res.status(400).json({ erro: error.message })
  }
})

export default router