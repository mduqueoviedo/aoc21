const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(',')
    .map((val) => Number(val))

const totalDays = 256
let fishByState = new Array(9).fill(0);

// We store the number of fishes by their current state
input.forEach((initialFish) => {
    fishByState[initialFish]++
})

// Fishes in 0 spawn their same amount to state 8 and convert to state 6
for (let i = 1; i <= totalDays; i++) {
    fishByState.push(fishByState.shift())
    fishByState[6] += fishByState[8]
}

console.log("Result is", fishByState.reduce((acc, curr) => acc + curr, 0))