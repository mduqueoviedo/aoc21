const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let riskLevel = 0

const seaMap = input
    .map((inputLine) => inputLine
        .split('')
        .map((inputValue) => Number(inputValue)))

const topX = seaMap[0].length - 1
const topY = seaMap.length - 1

const isLowPoint = (x, y) => {
    const value = seaMap[y][x]
    // Check top
    if (y > 0) {
        if (seaMap[y - 1][x] <= value) {
            return false
        }
    }
    // Check down
    if (y < topY) {
        if (seaMap[y + 1][x] <= value) {
            return false
        }
    }
    // Check left
    if (x > 0) {
        if (seaMap[y][x - 1] <= value) {
            return false
        }
    }
    // Check right
    if (x < topX) {
        if (seaMap[y][x + 1] <= value) {
            return false
        }
    }

    return true
}

seaMap.forEach((seaMapLine, indexY) => {
    seaMapLine.forEach((seaMapItem, indexX) => {
        // Try to reduce some checks :shrug:
        if (seaMapItem < 9 && isLowPoint(indexX, indexY)) {
            riskLevel += (1 + seaMapItem)
        }
    })
})

console.log("Risk level is", riskLevel)