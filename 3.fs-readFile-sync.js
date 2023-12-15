const fs = require('node:fs')
// Para modulos que no tienen su versión con promesa nativa
// const promisify = require('node:util')
// const readFilePromise = promisify(fs.readFile)

// Leer archivos de forma asíncrona con CALLBACKS
console.log('Leyendo el primer archivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(text)

console.log('Hacer cosas mientras se lee el archivo')

console.log('Leyendo el segundo archivo...')
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log(text2)
