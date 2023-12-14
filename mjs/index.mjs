// .js -> por defecto utiliza CommonJS
// .mjs -> para utilizar ES Modules
// .cjs -> para utilizar CommonJS

import { sum, sub } from './sum.mjs'

console.log(sum(2,3))
console.log(sub(4, 1))