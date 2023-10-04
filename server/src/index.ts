import express from 'express'
import ohmRouter from './routes/ohm'
import colorsRouter from './routes/colors'

const PORT = 3001

export const app = express()

app.use('/api',ohmRouter, colorsRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})