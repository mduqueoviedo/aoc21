const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let topX = 0
let topY = 0

const dotsCoordinates = input.filter((inputLine) => inputLine !== '' && !inputLine.includes('fold along'))
const foldingInstructions = input.filter((inputLine) => inputLine.includes('fold along'))

dotsCoordinates
    .forEach((inputCoordinates) => {
        const x = Number(inputCoordinates.split(',')[0].trim())
        const y = Number(inputCoordinates.split(',')[1].trim())

        if (x > topX) {
            topX = x
        }

        if (y > topY) {
            topY = y
        }
    })

let dotsGrid = []

for (let indexY = 0; indexY <= topY; indexY++) {
    for (let indexX = 0; indexX <= topX; indexX++) {
        if (!dotsGrid[indexY]) {
            dotsGrid[indexY] = []
        }
        dotsGrid[indexY][indexX] = '.'
    }
}

const setDot = (x, y) => dotsGrid[y][x] = '#'
const getDot = (x, y) => dotsGrid[y][x]

// Fill grid with values
dotsCoordinates
    .forEach((inputCoordinates) => {
        const x = Number(inputCoordinates.split(',')[0].trim())
        const y = Number(inputCoordinates.split(',')[1].trim())
        setDot(x, y)
    })

const printGrid = (grid = [...dotsGrid]) => {
    grid.forEach((gridLine) => {
        console.log(gridLine.join(''))
    })
    console.log('')
}

const foldGrid = (foldingInstruction) => {
    const foldingDirection = foldingInstruction.split(' ')[2].split('=')[0]
    const foldingValue = Number(foldingInstruction.split(' ')[2].split('=')[1])
    const newGrid = []

    if (foldingDirection === 'x') {
        // Fold in vertical line
        for (let indexX = 0; indexX < foldingValue; indexX++) {
            for (let indexY = 0; indexY < dotsGrid.length; indexY++) {

                if (!newGrid[indexY]) {
                    newGrid[indexY] = []
                }

                newGrid[indexY][indexX] = getDot(indexX, indexY)
            }
        }

        // Move values from second half, like a mirror
        for (let indexX = dotsGrid[0].length - 1; indexX > foldingValue; indexX--) {
            for (let indexY = 0; indexY < dotsGrid.length; indexY++) {
                newGrid[indexY][dotsGrid[0].length - 1 - indexX] = getDot(indexX, indexY) === '#'
                    ? '#'
                    : newGrid[indexY][dotsGrid[0].length - 1 - indexX]
            }
        }
    } else if (foldingDirection === 'y') {
        // Fold in horizontal line
        for (let indexY = 0; indexY < foldingValue; indexY++) {
            for (let indexX = 0; indexX < dotsGrid[0].length; indexX++) {
                if (!newGrid[indexY]) {
                    newGrid[indexY] = []
                }

                newGrid[indexY][indexX] = getDot(indexX, indexY)
            }
        }

        // Move values from second half, like a mirror
        for (let indexY = dotsGrid.length - 1; indexY > foldingValue; indexY--) {
            for (let indexX = 0; indexX < dotsGrid[0].length; indexX++) {
                newGrid[dotsGrid.length - 1 - indexY][indexX] = getDot(indexX, indexY) === '#'
                    ? '#'
                    : newGrid[dotsGrid.length - 1 - indexY][indexX]
            }
        }
    } else {
        throw new Error("Wrong folding direction")
    }
    dotsGrid = [...newGrid]
}

foldingInstructions.forEach((foldInstruction, index) => {
    foldGrid(foldInstruction)

    if (index > 9) {
        printGrid()
    }
})

printGrid()