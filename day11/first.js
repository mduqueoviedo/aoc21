const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const octopusGrid = input
    .map((inputLine) => inputLine
        .split('')
        .map((inputValue) => Number(inputValue)))

const topX = octopusGrid[0].length - 1
const topY = octopusGrid.length - 1

let totalFlash = 0

const getOctValue = (x, y) => octopusGrid[y][x]
const setOctValue = (x, y, val) => octopusGrid[y][x] = val

const countFlash = () => {
    octopusGrid.forEach((octopusLine) => {
        octopusLine.forEach((octi) => {
            if (octi === 0) {
                totalFlash++
            }
        })
    })
}

const incAll = () => {
    octopusGrid.forEach((octopusLine, indexY) => {
        octopusLine.forEach((octi, indexX) => {
            setOctValue(indexX, indexY, octi + 1)
        })
    })
}

const flashOcti = (x, y) => {
    setOctValue(x, y, 0)

    for (
        let indexY = (Math.max(0, y - 1));
        indexY <= (Math.min(topY, y + 1));
        indexY++
    ) {
        for (
            let indexX = (Math.max(0, x - 1));
            indexX <= (Math.min(topX, x + 1));
            indexX++
        ) {
            if ((indexX !== x || indexY !== y) && getOctValue(indexX, indexY) !== 0) {
                setOctValue(indexX, indexY, getOctValue(indexX, indexY) + 1)
            }
        }
    }
}

const findFlash = () => {
    let hasFlash

    octopusGrid.forEach((octopusLine, indexY) => {
        octopusLine.forEach((octi, indexX) => {
            if (octi > 9) {
                hasFlash = { x: indexX, y: indexY }
            }
        })
    })

    return hasFlash
}

// Useful for debugging
const printGrid = () => {
    octopusGrid.forEach((octopusLine) => {
        console.log(octopusLine.join(''))
    })
}

for (let stepNum = 1; stepNum <= 100; stepNum++) {
    incAll()

    while (findFlash()) {
        const withFlash = findFlash()
        flashOcti(withFlash.x, withFlash.y)
    }

    countFlash()
}

console.log("Total flashes is", totalFlash)