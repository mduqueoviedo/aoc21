const fs = require('fs')
const input = fs.readFileSync('./test_input.txt', 'utf-8')
    .trim()
    .split('\n')

const initialTemplate = input[0]

const instructionsMap = {}
input
    .filter((inputValue) => inputValue.includes('->'))
    .forEach((instructionItem) => {
        const instructionKey = instructionItem.split('->')[0].trim()
        const instructionInsert = instructionItem.split('->')[1].trim()

        instructionsMap[instructionKey] = instructionInsert
    })

let elementsMap = {}
const lettersMap = {}

const getMaxMinDifference = () => {


    Object.keys(elementsMap).forEach((elementMapKey) => {
        addKey(lettersMap, elementMapKey[0], elementsMap[elementMapKey])
    })

    addKey(lettersMap, lastItem, lettersMap[lastItem])

    console.log(lastItem)
    console.log(elementsMap)
    console.log(lettersMap)

    const most = Math.max(...Object.values(lettersMap))
    const least = Math.min(...Object.values(lettersMap))

    return most - least
}

const addKey = (elMap, key, val = 1) => {
    elMap[key] = elMap[key] === undefined
        ? val
        : elMap[key] + val
}

// Fill it with the initial string
for (let stringPos = 0; stringPos < initialTemplate.length - 1; stringPos++) {
    const key = `${initialTemplate[stringPos]}${initialTemplate[stringPos + 1]}`

    addKey(elementsMap, key)
}

// Set last item
const lastItem = initialTemplate.slice(-1)

const totalSteps = 3
for (let step = 0; step < totalSteps; step++) {
    console.log({ step, elementsMap })
    let newElementsMap = {}

    Object.keys(elementsMap).forEach((elementKey) => {
        if (instructionsMap[elementKey]) {
            const firstNewKey = `${elementKey[0]}${instructionsMap[elementKey]}`
            const secondNewKey = `${instructionsMap[elementKey]}${elementKey[1]}`

            console.log("Adding keys", { elementKey, insert: instructionsMap[elementKey], firstNewKey, secondNewKey })
            addKey(newElementsMap, firstNewKey, elementsMap[firstNewKey])
            addKey(newElementsMap, secondNewKey, elementsMap[secondNewKey])
        }
        console.log("After it", elementKey, newElementsMap)
    })

    elementsMap = { ...newElementsMap }
}

console.log("Difference is", getMaxMinDifference())