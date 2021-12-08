const fs = require('fs')
const rawInput = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let totalDigits = 0
rawInput.forEach((inputLine) => {
    const output = inputLine
        .split('|')[1]
        .trim()
        .split(' ')
        .map((digit) =>
            digit.trim()
        )
    totalDigits += output.filter((digit) =>
        digit.length === 2
        || digit.length === 3
        || digit.length === 4
        || digit.length === 7
    ).length
})

console.log("Total digits is", totalDigits)