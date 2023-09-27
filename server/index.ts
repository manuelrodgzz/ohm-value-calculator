import express from 'express'
import path from 'path'

const PORT = 3001

const app = express()

app.use(
  express.static(
    path.resolve(__dirname, '../client/dist')
  )
)

app.get('/api', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})