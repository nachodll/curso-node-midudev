const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    req.statusCode = 200
    res.end('<h1>Bienvenido aa la páginaaa de inicio</h1>')
  } else if (req.url === '/image.jpg') {
    fs.readFile('clase-2/reno.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      } else {
        res.setHeader('Content-type', 'image/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
