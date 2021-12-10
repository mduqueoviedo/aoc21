const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(',')
    .map((val) => Number(val))

const totalDays = 80
let currentDay = 1
let fishes = [...input]

while (currentDay <= totalDays) {
    let fishesToAdd = 0
    fishes = fishes.map((fish) => {
        if (fish === 0) {
            fishesToAdd++
            return 6
        } else {
            return fish - 1
        }
    })

    for (let i = 0; i < fishesToAdd; i++) {
        fishes.push(8)
    }
    currentDay++
}

console.log("Result is", fishes.length)