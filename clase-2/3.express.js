const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const appExpress = express()
appExpress.disable('x-powered-by')

appExpress.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Aqui solo llegan req con POST y json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})

appExpress.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

appExpress.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// La ultima a la que va a llegar
// Al use entran todos los metodos (get, post...)
appExpress.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

appExpress.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
