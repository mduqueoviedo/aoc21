const fs = require('fs')
const rawInput = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let totalSum = 0

// Some chop chop of the list of numbers, sort them alphabetically
// so we can get a Set and remove duplicates, we don't need them to 
// find out the segment items.
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

// Mark number as candidate, make sure it's not there and not in the final list
const setCandidate = (position, value) => {
    if (!candidatesList[position].includes(value) && finalSet[position] === '') {
        candidatesList[position] = candidatesList[position].concat(value)
    }
}

// When setting a value, remove also the candidates from the list
const setFinalSet = (position, value) => {
    candidatesList = candidatesList.map((candidateItem) =>
        candidateItem.includes(value)
            ? candidateItem.filter((item) => item !== value)
            : candidateItem
    )

    finalSet[position] = value
}

const findByLength = (words, length) => words.filter((item) => item.length === length)

const getOne = (words) => findByLength(words, 2)[0]
const getFour = (words) => findByLength(words, 4)[0]
const getSeven = (words) => findByLength(words, 3)[0]
const getZeroSixNine = (words) => findByLength(words, 6)

const getDigit = (word) => {
    switch (word.length) {
        case 2:
            return '1'
        case 3:
            return '7'
        case 4:
            return '4'
        case 7:
            return '8'
    }

    if (word.length === 5) {
        if (word.includes(finalSet[4])) {
            return '2'
        } else if (word.includes(finalSet[1])) {
            return '5'
        } else {
            return '3'
        }
    } else if (word.length === 6) {
        if (!word.includes(finalSet[2])) {
            return '6'
        } else if (!word.includes(finalSet[3])) {
            return '0'
        } else {
            return '9'
        }
    } else {
        throw new Error('We should not be here')
    }
}

let candidatesList
let finalSet

rawInput.forEach((inputLine, index) => {
    candidatesList = Array(7).fill([])
    finalSet = Array(7).fill('')

    /* Candidate items are like this:
        000
       1   2
       1   2
        333
       4   5
       4   5
        666
    */
    const input = processString(inputLine, 0)
    const output = processString(inputLine, 1)

    // Remove duplicate numbers to deduce cleanly
    const wholeSet = Array.from(new Set(input.concat(output)))

    const seven = getSeven(wholeSet)
    const one = getOne(wholeSet)
    const four = getFour(wholeSet)
    const zeroSixNine = getZeroSixNine(wholeSet)

    // With one and seven (unique sets), we deduce segment 0
    // and set candidates 2 and 5
    one.split('').forEach((letter) => {
        setCandidate(2, letter)
        setCandidate(5, letter)
    })

    seven.split('').forEach((letterSeven) => {
        if (!one.includes(letterSeven)) {
            setFinalSet(0, letterSeven)
        } else {
            setCandidate(2, letterSeven)
            setCandidate(5, letterSeven)
        }

        if (!four.includes(letterSeven)) {
            setFinalSet(0, letterSeven)
        } else {
            setCandidate(2, letterSeven)
            setCandidate(5, letterSeven)
        }
    })

    // Then we also get candidates for segments 1 and 3
    four.split('').forEach((letterFour) => {
        if (!seven.includes(letterFour)) {
            setCandidate(1, letterFour)
            setCandidate(3, letterFour)
        }
    })

    // From 0, 6, 9 we can deduct segment 5 because it's the only one in common 
    // for the three of them 
    // Then we deduct segment 2 because it's the other option
    candidatesList[5].forEach((candidateItem) => {
        if (zeroSixNine.filter((item) => item.includes(candidateItem)).length === 3) {
            setFinalSet(5, candidateItem)
            setFinalSet(2, candidatesList[2][0])
        }
    })

    // We do a similar thing for segment 1, it's a candidate from digit 4 
    // and it's the one that the three of them have in common
    // Then we deduct segment 3 as well
    candidatesList[1].forEach((candidateItem) => {
        if (zeroSixNine.filter((item) => item.includes(candidateItem)).length === 3) {
            setFinalSet(1, candidateItem)
            setFinalSet(3, candidatesList[1][0])
        }
    })

    // First we set the two remaining letters as candidates for 4 and 6
    const lettersList = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    lettersList.forEach((letter) => {
        if (!finalSet.join('').includes(letter)) {
            setCandidate(4, letter)
            setCandidate(6, letter)
        }
    })

    // Segment 6 is the only one that zero six and nine have in common that is 
    // not yet discovered
    candidatesList[6].forEach((candidateItem) => {
        if (zeroSixNine.filter((item) => item.includes(candidateItem)).length === 3) {
            setFinalSet(6, candidateItem)
            setFinalSet(4, candidatesList[6][0])
        }
    })

    // And now let's process the output
    let outputStrNumber = ''
    output.forEach((singleOutput) => {
        outputStrNumber += getDigit(singleOutput)
    })

    totalSum += Number(outputStrNumber)
})

console.log("Total sum is", totalSum)