const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let currentHorizontal = 0
let currentDepth = 0

input.forEach((instruction) => {
    const command = instruction.split(' ')[0]
    const value = Number(instruction.split(' ')[1])

    switch (command) {
        case 'up':
            currentDepth -= value
            break
        case 'down':
            currentDepth += value
            break
        case 'forward':
            currentHorizontal += value
            break
    }
})

console.log("Output is", currentHorizontal * currentDepth)