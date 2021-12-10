const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(',')
    .map((val) => Number(val))

// Sum of distance-first elements of an arithmetic succession
const fuelCost = (distance) => (distance ** 2 + distance) / 2

const minPos = Math.min(...input)
const maxPos = Math.max(...input)

let minCost
for (let i = minPos; i <= maxPos; i++) {
    const cost = input.reduce((totalCost, currentPosition) =>
        totalCost + fuelCost(Math.abs(i - currentPosition))
        , 0)

    if (!minCost || cost < minCost) {
        minCost = cost
    }
}

console.log("Minimum fuel is", minCost)