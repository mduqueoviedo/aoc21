const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

let currentTemplate = input[0]

const instructionsMap = {}

input
    .filter((inputValue) => inputValue.includes('->'))
    .forEach((instructionItem) => {
        const instructionKey = instructionItem.split('->')[0].trim()
        const instructionInsert = instructionItem.split('->')[1].trim()

        instructionsMap[instructionKey] = instructionInsert
    })

const totalSteps = 10

const getMostLeastRepeated = () => {
    const arrayedTemplate = currentTemplate.split('')
    const mapOfFrequencies = arrayedTemplate
        .map((a) =>
            arrayedTemplate.filter((b) => a === b).length
        );

    const most = arrayedTemplate[mapOfFrequencies.indexOf(Math.max(...mapOfFrequencies))]
    const least = arrayedTemplate[mapOfFrequencies.indexOf(Math.min(...mapOfFrequencies))]
    return {
        most,
        least,
        val: Math.max(...mapOfFrequencies) - Math.min(...mapOfFrequencies)
    };
}

for (let step = 0; step < totalSteps; step++) {
    let newTemplate = ''

    for (let stringPos = 0; stringPos < currentTemplate.length; stringPos++) {
        const key = `${currentTemplate[stringPos]}${currentTemplate[stringPos + 1]}`
        const insertValue = instructionsMap[key]

        newTemplate += instructionsMap[key]
            ? `${key[0]}${insertValue}`
            : key[0]
    }

    currentTemplate = newTemplate
}

console.log(getMostLeastRepeated())