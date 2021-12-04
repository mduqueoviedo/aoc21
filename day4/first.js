const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

// First row of input is the numbers that will be drawn
// Subsequent rows are the boards, they are separated by an empty row

// Solution is (sum of unmarked numbers * last value drawn)

const drawnNumbers = input[0].split(',').map((value) => Number(value))
const rawBoards = input.slice(2)

const boards = []

// Store boards in an accessible place
let boardNumber = 0
rawBoards.forEach((boardLine) => {
    if (boardLine === '') {
        boardNumber++
    } else {
        // If initial board is not created we need to do it
        if (!boards[boardNumber]) {
            boards[boardNumber] = []
        }

        // Remove double spaces and cast to number
        boards[boardNumber].push(
            boardLine
                .trim()
                .replace(/\s+/g, ' ')
                .split(' ')
                .map((value) => Number(value))
        )
    }
})

// Replace the selected number with a -1
const markNumber = (board, numberToMark) => {
    const replacingValue = -1

    board
        .filter((boardLine) => boardLine.includes(numberToMark))
        .forEach((boardLine) => {
            boardLine.splice(boardLine.indexOf(numberToMark), 1, replacingValue)
        })
}

// Verify a board is winner
const checkBoard = (board) => {
    const valueToCheck = -1
    let isWinner = false

    board.forEach((boardLine, index) => {
        if (!isWinner) {
            // check lines
            if (checkForAllEqual(boardLine, valueToCheck)) {
                isWinner = true
            }

            // check columns
            const column = board.map((boardVline) => boardVline[index])
            if (checkForAllEqual(column, valueToCheck)) {
                isWinner = true
            }
        }
    })

    return isWinner
}

// Verify if all elements of an array have the same value
const checkForAllEqual = (arr, valueToCheck) =>
    arr.every((arrValue) => arrValue === valueToCheck)

// Sum all unmarked numbers
const sumUnmarked = (board) => {
    const markedNumber = -1

    return board.reduce((accSum, currLine) =>
        accSum + currLine.reduce((acc, curr) =>
            curr !== markedNumber ? acc + curr : acc
            , 0)
        , 0)
}

let winningNumber = -1
let winningBoard = []

drawnNumbers.forEach((drawnNumber) => {
    boards.forEach((singleBoard) => {
        if (winningNumber === -1) {
            markNumber(singleBoard, drawnNumber)

            if (checkBoard(singleBoard)) {
                winningNumber = drawnNumber
                winningBoard = singleBoard
            }
        }
    })
})

// console.log("Winning", winningBoard, winningNumber)

console.log("Result is", sumUnmarked(winningBoard) * winningNumber)