const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((value) => value.split(''))

/*
  In this case we need to start discarding the lines with 
  less/more frequent values, until there is only one value left
  which will be the O2 / CO2 scrubber ratings
*/

const transpose = (arr) => arr[0].map((_, index) => arr.map((x) => x[index]))

let oxygenGen = [...input]
let co2Scrubber = [...input]

let bitPos = 0
while (oxygenGen.length > 1) {
    const transposedInput = transpose(oxygenGen)
    const line = transposedInput[bitPos]
    const zeroLength = line.filter((bit) => bit === '0').length
    const oneLength = line.filter((bit) => bit === '1').length

    oxygenGen = oxygenGen
        .filter((oxyLine) => oxyLine[bitPos] === Number(zeroLength <= oneLength).toString())

    bitPos++
}

bitPos = 0
while (co2Scrubber.length > 1) {
    const transposedInput = transpose(co2Scrubber)
    const line = transposedInput[bitPos]
    const zeroLength = line.filter((bit) => bit === '0').length
    const oneLength = line.filter((bit) => bit === '1').length

    co2Scrubber = co2Scrubber
        .filter((co2Line) => co2Line[bitPos] === Number(zeroLength > oneLength).toString())

    bitPos++
}

console.log(
    "Life support",
    parseInt(oxygenGen[0].join(''), 2) * parseInt(co2Scrubber[0].join(''), 2)
)