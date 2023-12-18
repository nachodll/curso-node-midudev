// 1ª opción: sistema de módulos (CommonJS)
// Es la forma clásica y esta casi casi deprecada
// const summ = require('./sum')

// 2ª opción: con dict (tmb CommonJS)
// Obliga a usar el mismo nombre al importar
const { sum } = require('./sum')

console.log(sum(2,3))