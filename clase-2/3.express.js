const express = require('express')
const appExpress = express()

const dittoJSON = require('./pokemon/ditto.json')

appExpress.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

appExpress.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

appExpress.post('/pokemon', (req, res) => {
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).send(data)
  })
})

// La ultima a la que va a llegar
// Al use entran todos los metodos (get, post...)
appExpress.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

appExpress.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
