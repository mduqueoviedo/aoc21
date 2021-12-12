const fs = require('fs')
const input = fs.readFileSync('./input.txt', 'utf-8')
    .trim()
    .split('\n')

const startCave = 'start'
const endCave = 'end'

const caveMap = {}

// Fill cave map
input.forEach((inputLine) => {
    const startPath = inputLine.split('-')[0]
    const endPath = inputLine.split('-')[1]

    if (startPath !== endCave && !caveMap[startPath]) {
        caveMap[startPath] = []
    }

    if (endPath !== endCave && !caveMap[endPath]) {
        caveMap[endPath] = []
    }

    if (startPath !== endCave
        && endPath !== startCave
        && !caveMap[startPath].includes(endPath)
    ) {
        caveMap[startPath].push(endPath)
    }

    if (endPath !== endCave
        && startPath !== startCave
        && !caveMap[endPath].includes(startPath)
    ) {
        caveMap[endPath].push(startPath)
    }
})

const isSmallCave = (cave) => cave === cave.toLowerCase()
const isBigCave = (cave) => cave === cave.toUpperCase()

let paths = []
let changedFlag = true

while (changedFlag) {
    changedFlag = false

    if (paths.length === 0) {
        paths.push(['start'])
    }

    const newPaths = []

    for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
        const lastItemInPath = paths[pathIndex].at(-1)
        const currentPath = [...paths[pathIndex]]

        if (lastItemInPath !== endCave && caveMap[lastItemInPath]) {
            caveMap[lastItemInPath]
                .filter((pathOption) =>
                    pathOption !== startCave
                    && (
                        isBigCave(pathOption)
                        || (isSmallCave(pathOption) && !currentPath.includes(pathOption))
                    )
                )
                .forEach((pathOption) => {
                    newPaths.push(currentPath.concat([pathOption]))
                    changedFlag = true
                })
        } else {
            newPaths.push(currentPath)
        }
    }

    if (changedFlag) {
        paths = [...newPaths]
    }
}

const goodPaths = paths.filter((path) =>
    path.at(0) === startCave
    && path.at(-1) === endCave
)

console.log("Total Good Paths:", goodPaths.length)