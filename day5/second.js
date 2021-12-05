const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const seaMap = {}

const markPosition = (x, y) => {
    if (seaMap[y] === undefined) {
        seaMap[y] = {}
    }
    if (seaMap[y][x] === undefined) {
        seaMap[y][x] = 0
    }

    seaMap[y][x] += 1
}

const countDanger = () => {
    let dangerPoints = 0
    Object.keys(seaMap).forEach((key) => {
        Object.keys(seaMap[key]).forEach((key2) => {
            if (seaMap[key][key2] > 1) {
                dangerPoints++
            }
        })
    })

    return dangerPoints
}

input.forEach((inputLine) => {
    const start = inputLine.split('->')[0].trim()
    const startX = Number(start.split(',')[0].trim())
    const startY = Number(start.split(',')[1].trim())

    const end = inputLine.split('->')[1].trim()
    const endX = Number(end.split(',')[0].trim())
    const endY = Number(end.split(',')[1].trim())

    if (startX === endX || startY === endY) {
        const changingValue = startX === endX ? 'y' : 'x'
        const start = changingValue === 'x'
            ? startX < endX
                ? startX
                : endX
            : startY < endY
                ? startY
                : endY
        const end = changingValue === 'x'
            ? startX < endX
                ? endX
                : startX
            : startY < endY
                ? endY
                : startY

        for (let i = start; i <= end; i++) {
            markPosition(changingValue === 'x'
                ? i
                : startX,
                changingValue === 'y'
                    ? i
                    : startY
            )
        }
    } else if (Math.abs(startX - endX) === Math.abs(startY - endY)) {
        // Lazyness! We add this by separate
        let inc = 0
        while (Math.abs(startX - endX) - inc >= 0) {
            const markX = startX + (inc * ((endX - startX > 0) ? 1 : -1))
            const markY = startY + (inc * ((endY - startY > 0) ? 1 : -1))
            markPosition(markX, markY)
            inc++
        }
    }

})

console.log("Result is", countDanger(seaMap))