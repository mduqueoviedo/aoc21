const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const openingChars = ['(', '{', '[', '<']
const closingMatch = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
}

const errorPoints = (illegalChar) => {
    switch (illegalChar) {
        case ')':
            return 3
        case ']':
            return 57
        case '}':
            return 1197
        case '>':
            return 25137
        default:
            throw new Error('Unexpected illegal char', illegalChar)
    }
}

let points = 0

input.forEach((inputLine) => {
    const charsStack = []

    for (const inputChar of inputLine) {
        if (openingChars.includes(inputChar)) {
            charsStack.push(inputChar)
        } else {
            if (closingMatch[charsStack.at(-1)] === inputChar) {
                charsStack.pop()
            } else {
                points += errorPoints(inputChar)
                break;
            }
        }
    }
})

console.log("Total error points =", points)