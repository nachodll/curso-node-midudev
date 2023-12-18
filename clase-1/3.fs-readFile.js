const fs = require('node:fs')
// Para modulos que no tienen su versión con promesa nativa
// const promisify = require('node:util')
// const readFilePromise = promisify(fs.readFile)

// Leer archivos de forma asíncrona con CALLBACKS
console.log('Leyendo el primer archivo...')
// eslint-disable-next-line n/handle-callback-err
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log('primer texto: ', text)
})

console.log('Hacer cosas mientras se lee el archivo')

console.log('Leyendo el segundo archivo...')
// eslint-disable-next-line n/handle-callback-err
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('segundo texto: ', text)
})
