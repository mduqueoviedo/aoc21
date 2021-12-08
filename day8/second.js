const fs = require('fs')
const rawInput = fs.readFileSync('./my_input.txt', 'utf-8')
    .trim()
    .split('\n')

let totalSum = 0

const processString = (str, pos) => str
    .trim()
    .split('|')[pos]
    .trim()
    .split(' ')
    .map((word) => {
        const aux = word.split('')
        aux.sort((a, b) => a.localeCompare(b))
        return aux.join('')
    })

const setCandidate = (candidatesArray, position, value, finalSet) => {
    const clone = [...candidatesArray]

    if (!clone[position].includes(value) && finalSet[position] === '') {
        clone[position] = clone[position].concat(value)
    }

    return clone
}

const findByLength = (words, length) => words.filter((item) => item.length === length)

const getOne = (words) => findByLength(words, 2)?.[0]
const getFour = (words) => findByLength(words, 4)?.[0]
const getSeven = (words) => findByLength(words, 3)?.[0]
const getZeroSixNine = (words) => findByLength(words, 6)
const getTwoThreeFive = (words) => findByLength(words, 5)

rawInput.forEach((inputLine, index) => {
    if (index === 0) {
        console.log("Reading", inputLine)

        /* Candidate items are like this:
            000
           1   2
           1   2
            333
           4   5
           4   5
            666
        */
        let candidatesList = Array(7).fill([]);
        const finalSet = Array(7).fill('');

        const input = processString(inputLine, 0)
        const output = processString(inputLine, 1)
        const wholeSet = Array.from(new Set(input.concat(output)))

        // console.log("Whole set is", wholeSet)

        let tries = 0
        while (finalSet.some((candidateItem) => candidateItem === '') && tries < 10) {
            if (getOne(wholeSet)) {
                getOne(wholeSet)
                    .split('')
                    .forEach((letter) => {
                        candidatesList = setCandidate(candidatesList, 2, letter, finalSet)
                        candidatesList = setCandidate(candidatesList, 5, letter, finalSet)
                    })
            }

            if (getSeven(wholeSet) && getOne(wholeSet)) {
                const seven = getSeven(wholeSet)
                const one = getOne(wholeSet)

                seven.split('').forEach((letterSeven) => {
                    if (!one.includes(letterSeven)) {
                        finalSet[0] = letterSeven
                    } else {
                        candidatesList = setCandidate(candidatesList, 2, letterSeven, finalSet)
                        candidatesList = setCandidate(candidatesList, 5, letterSeven, finalSet)
                    }
                })
            }

            if (getSeven(wholeSet) && getFour(wholeSet)) {
                const seven = getSeven(wholeSet)
                const four = getFour(wholeSet)

                seven.split('').forEach((letterSeven) => {
                    if (!four.includes(letterSeven)) {
                        finalSet[0] = letterSeven
                    } else {
                        candidatesList = setCandidate(candidatesList, 2, letterSeven, finalSet)
                        candidatesList = setCandidate(candidatesList, 5, letterSeven, finalSet)
                    }
                })

                four.split('').forEach((letterFour) => {
                    if (!seven.includes(letterFour)) {
                        candidatesList = setCandidate(candidatesList, 1, letterFour, finalSet)
                        candidatesList = setCandidate(candidatesList, 3, letterFour, finalSet)
                    }
                })
            }

            tries++
        }

        if (tries === 10) {
            console.log("ERROR, could not resolve in time", finalSet, candidatesList)
        }
    }
})

console.log("Total sum is", totalSum)