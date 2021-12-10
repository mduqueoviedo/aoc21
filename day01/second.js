const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')
    .map((value) => Number(value))

const getWindowSum = (start) => {
    if (
        start + 1 > input.length
        || start + 2 > input.length
        || start + 3 > input.length
    ) {
        return null
    }

    return input[start] + input[start + 1] + input[start + 2]
}

let increments = 0
input.forEach((_, index) => {
    if (getWindowSum(index) && getWindowSum(index + 1)) {
        if (getWindowSum(index + 1) > getWindowSum(index)) {
            increments++
        }
    }
})

console.log("Increments are ", increments)