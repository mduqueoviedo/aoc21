const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const openingChars = ['(', '{', '[', '<']
const closingChars = [')', '}', ']', '>']
const pairMatch = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
    ')': '(',
    '}': '{',
    ']': '[',
    '>': '<',
}

const completionPoints = (completionChar) => {
    switch (completionChar) {
        case '(':
            return 1
        case '[':
            return 2
        case '{':
            return 3
        case '<':
            return 4
        default:
            throw new Error('Unexpected completion char', completionChar)
    }
}

const pointsSet = []

input.forEach((inputLine) => {
    let errorFlag = false

    const charsStack = []

    for (const inputChar of inputLine) {
        if (openingChars.includes(inputChar)) {
            charsStack.push(inputChar)
        } else {
            if (pairMatch[charsStack.at(-1)] === inputChar) {
                charsStack.pop()
            } else {
                errorFlag = true
                break;
            }
        }
    }

    if (!errorFlag && charsStack.length > 0) {
        closingStack = []
        let linePoints = 0

        charsStack.reverse().forEach((remainingChar) => {
            if (closingChars.includes(remainingChar)) {
                charsStack.push(remainingChar)
            } else {
                if (pairMatch[closingStack.at(-1)] === remainingChar) {
                    charsStack.pop()
                } else {
                    linePoints = (linePoints * 5) + completionPoints(remainingChar)
                }
            }
        })

        pointsSet.push(linePoints)
    }
})

console.log(
    "Middle points is",
    pointsSet
        .sort((a, b) => a - b)[Math.trunc((pointsSet.length) / 2)]
)