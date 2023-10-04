import express from 'express'
import ohmRouter from './routes/ohm'
import colorsRouter from './routes/colors'
import cors from 'cors'

const PORT = 3001

export const app = express()

app.use(cors())
app.use('/api',ohmRouter, colorsRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})