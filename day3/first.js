const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((value) => value.split(''))

/*
  Get power consumption which is gamma rate * epsilon rate
    - gamma rate: value IN DECIMAL gotten with the most common bit per position
    - epsilon rate: value IN DECIMAL with the least common bit per position
*/

const transpose = (arr) => arr[0].map((_, index) => arr.map((x) => x[index]))
const transposedInput = transpose(input)

let gammaRate = ''
let epsilonRate = ''

transposedInput.forEach((line) => {
    const zeroLength = line.filter((bit) => bit === '0').length
    const oneLength = line.filter((bit) => bit === '1').length

    gammaRate += zeroLength > oneLength ? '0' : '1'
    epsilonRate += zeroLength > oneLength ? '1' : '0'
})

console.log("Power", parseInt(gammaRate, 2) * parseInt(epsilonRate, 2))