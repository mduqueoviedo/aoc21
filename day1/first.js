const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((line) => Number(line))

let current = input[0]
let increments = 0

input.forEach((line) => {
    if (line > current) {
        increments++
    }
    current = line
})

console.log("Increments are", increments)