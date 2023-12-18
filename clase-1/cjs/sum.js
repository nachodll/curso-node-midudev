function sum (a, b) {
  return a + b
}

// 1ª opción: sistema de módulos (CommonJS)
// Es la forma clásica y esta casi casi deprecada
// module.exports = sum

// 2ª opción: con dict (tmb CommonJS)
// Obliga a usar el mismo nombre al importar
module.exports = {
  sum
}
