// Target area
// x=85..145
// y=-163..-108

const lowXTarget = 85
const topXTarget = 145
const lowYTarget = -163
const topYTarget = -108

/*
    The probe's x position increases by its x velocity.
    The probe's y position increases by its y velocity.
    Due to drag, the probe's x velocity changes by 1 toward the value 0; 
      that is, it decreases by 1 if it is greater than 0, increases by 1 if 
      it is less than 0, or does not change if it is already 0.
    Due to gravity, the probe's y velocity decreases by 1.
*/

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
let topY = 0

for (let initialXVel = 0; initialXVel <= topXTarget; initialXVel++) {
    for (let initialYVel = 0; initialYVel < 1000; initialYVel++) {
        let currentVelocity = [initialXVel, initialYVel]
        let currentPosition = [...startingPos]

        let stopper = 0
        let tempTopY = 0

        while (willReachTarget(currentPosition, currentVelocity) || stopper < 1000) {
            const nextStep = getNextStep(currentPosition, currentVelocity)
            currentPosition = nextStep.position
            currentVelocity = nextStep.velocity

            if (currentPosition[1] > tempTopY) {
                tempTopY = currentPosition[1]
            }

            if (isInTargetArea(currentPosition)) {
                if (tempTopY > topY) {
                    topY = tempTopY
                }
                break;
            }
            stopper++
        }
    }
}

console.log("Top y", topY)