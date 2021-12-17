// Target area
// x=85..145
// y=-163..-108

const lowXTarget = 85
const topXTarget = 145
const lowYTarget = -163
const topYTarget = -108

const getNextStep = (currentPos, currentVel) => {
    const newPos = [
        currentVel[0] + currentPos[0],
        currentVel[1] + currentPos[1]
    ]
    const newVel = [
        currentVel[0] > 0
            ? currentVel[0] - 1
            : currentVel[0] < 0
                ? currentVel[0] + 1
                : 0,
        currentVel[1] - 1
    ]

    return { position: newPos, velocity: newVel }
}

const isInTargetArea = (pos) =>
    pos[0] >= lowXTarget
    && pos[0] <= topXTarget
    && pos[1] >= lowYTarget
    && pos[1] <= topYTarget

const willReachTarget = (currentPos, currentVel) => {
    let will = true

    // If not moving horizontally and not in range of target
    if (currentVel[0] === 0) {
        if (currentPos[0] < lowXTarget || currentPos[0] > topXTarget) {
            will = false
        }
    }

    // If moving horizontally and surpassed target
    if (currentVel[0] > 0) {
        if (currentPos[0] > topXTarget) {
            will = false
        }
    }

    if (currentVel[0] < 0) {
        if (currentPos[0] < lowXTarget) {
            will = false
        }
    }

    // If falling down and target above current position
    if (currentVel[1] < 0) {
        if (currentPos[1] < lowYTarget) {
            will = false
        }
    }

    return will
}

const startingPos = [0, 0] // x,y
let validOptions = 0
for (let initialXVel = 0; initialXVel <= topXTarget; initialXVel++) {
    for (let initialYVel = lowYTarget; initialYVel < 10000; initialYVel++) {
        let currentVelocity = [initialXVel, initialYVel]
        let currentPosition = [...startingPos]

        let stopper = 0
        while (willReachTarget(currentPosition, currentVelocity) || stopper < 10000) {
            const nextStep = getNextStep(currentPosition, currentVelocity)
            currentPosition = nextStep.position
            currentVelocity = nextStep.velocity

            if (isInTargetArea(currentPosition)) {
                validOptions++
                break;
            }
            stopper++
        }
    }
}

console.log("Valid options:", validOptions)