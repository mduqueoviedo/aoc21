const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let currentHorizontal = 0
let currentDepth = 0
let currentAim = 0

/* 
- down X increases your aim by X units.
- up X decreases your aim by X units.
- forward X does two things:
    It increases your horizontal position by X units.
    It increases your depth by your aim multiplied by X.
*/

input.forEach((instruction) => {
    const command = instruction.split(' ')[0]
    const value = Number(instruction.split(' ')[1])

    switch (command) {
        case 'up':
            currentAim -= value
            break
        case 'down':
            currentAim += value
            break
        case 'forward':
            currentHorizontal += value
            currentDepth += (currentAim * value)
            break
    }
})

console.log("Output is", currentHorizontal * currentDepth)