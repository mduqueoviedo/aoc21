const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let current = Number(input[0])
let increments = 0

input.forEach((line) => {
    if (Number(line) > current) {
        increments++
    }
    current = Number(line)
})

console.log("Increments are", increments)