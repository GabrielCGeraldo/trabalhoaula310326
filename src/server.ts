import "dotenv/config"
import express from 'express'
import cors from 'cors'

import routesGeneros from './routes/generos'
import routesFilmes from './routes/filmes'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/generos", routesGeneros)
app.use("/filmes", routesFilmes)

app.get('/', (req, res) => {
  res.send('API: Amazon Prime Stream - backend')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})