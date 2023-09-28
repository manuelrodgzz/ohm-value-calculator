import express from 'express'
import ohmRouter from './routes/ohm'

const PORT = 3001

export const app = express()

app.use('/api',ohmRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})