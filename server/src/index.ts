import express from 'express'

const PORT = 3001

const app = express()

app.get('/api', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})