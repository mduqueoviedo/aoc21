const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const seaMap = input
    .map((inputLine) => inputLine
        .split('')
        .map((inputValue) => Number(inputValue)))

const topX = seaMap[0].length - 1
const topY = seaMap.length - 1

const getValue = (x, y) => seaMap[y][x]

const isLowPoint = (x, y) => {
    const value = getValue(x, y)
    // Check top
    if (y > 0) {
        if (getValue(x, y - 1) <= value) {
            return false
        }
    }
    // Check down
    if (y < topY) {
        if (getValue(x, y + 1) <= value) {
            return false
        }
    }
    // Check left
    if (x > 0) {
        if (getValue(x - 1, y) <= value) {
            return false
        }
    }
    // Check right
    if (x < topX) {
        if (getValue(x + 1, y) <= value) {
            return false
        }
    }

    return true
}

let currentBasin = []

const setBasin = (x, y) => {
    const value = getValue(x, y)
    // 9 IS NOT A BASIN!! CAREFUL!!!

    // Check top
    if (y > 0) {
        if (getValue(x, y - 1) !== 9
            && (getValue(x, y - 1) > value)
            && !currentBasin.find((basinItem) => basinItem[0] === x && basinItem[1] === y - 1)
        ) {
            currentBasin.push([x, y - 1])
        }
    }
    // Check down
    if (y < topY) {
        if (getValue(x, y + 1) !== 9
            && (getValue(x, y + 1) > value)
            && !currentBasin.find((basinItem) => basinItem[0] === x && basinItem[1] === y + 1)
        ) {
            currentBasin.push([x, y + 1])
        }
    }
    // Check left
    if (x > 0) {
        if (getValue(x - 1, y) !== 9
            && (getValue(x - 1, y) > value)
            && !currentBasin.find((basinItem) => basinItem[0] === x - 1 && basinItem[1] === y)
        ) {
            currentBasin.push([x - 1, y])
        }
    }
    // Check right
    if (x < topX) {
        if (getValue(x + 1, y) !== 9
            && (getValue(x + 1, y) > value)
            && !currentBasin.find((basinItem) => basinItem[0] === x + 1 && basinItem[1] === y)
        ) {
            currentBasin.push([x + 1, y])
        }
    }
}

const lowPoints = []
const basinsSizes = []

seaMap.forEach((seaMapLine, indexY) => {
    seaMapLine.forEach((seaMapItem, indexX) => {
        // Try to reduce some checks :shrug:
        if (seaMapItem < 9 && isLowPoint(indexX, indexY)) {
            // Store low point
            lowPoints.push([indexX, indexY])
        }
    })
})

lowPoints.forEach((lowerPoint, index) => {
    currentBasin = [lowerPoint]

    let previousSize
    do {
        previousSize = currentBasin.length
        currentBasin.forEach((basinPoint) => {
            setBasin(basinPoint[0], basinPoint[1])
        })
    } while (previousSize < currentBasin.length)

    basinsSizes.push(currentBasin.length)
})

basinsSizes.sort((a, b) => b - a)
console.log("Result is", basinsSizes[0] * basinsSizes[1] * basinsSizes[2])