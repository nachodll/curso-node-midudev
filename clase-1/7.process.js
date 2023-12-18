// argumentos de entradas
console.log(process.argv)

// controlar el proceso y su salida
process.exit(1)

// controlar los eventos del proceso
process.on('exit', () => {
  // limpiar los recursos
})

// current working directory
process.cwd()

// platform
console.log(process.env.NODE_ENV)
