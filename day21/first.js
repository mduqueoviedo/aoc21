const diceRollsPerTurn = 3
const winningPoints = 1000
const minDiceValue = 1
const maxDiceValue = 100

const players = {
    p1: {
        startingPosition: 4,
        currentPosition: 4,
        totalPoints: 0
    },
    p2: {
        startingPosition: 2,
        currentPosition: 2,
        totalPoints: 0
    },
    currentTurn: 'p1'
}

let totalDiceRolls = 0
let currentDiceValue = minDiceValue

const getFinalPosition = (currentPosition, diceRoll) =>
    (currentPosition + diceRoll) % 10 === 0 ? 10 : (currentPosition + diceRoll) % 10

const isWinner = (player) =>
    player.totalPoints >= winningPoints

const flipTurn = () => {
    players.currentTurn = players.currentTurn === 'p1' ? 'p2' : 'p1'
}

const roll = () => {
    let totalDicePoints = 0
    for (let roll = 1; roll <= diceRollsPerTurn; roll++) {
        totalDicePoints += currentDiceValue

        currentDiceValue++

        if (currentDiceValue > maxDiceValue) {
            currentDiceValue = minDiceValue
        }
        totalDiceRolls++
    }

    const currentPosition = players[players.currentTurn].currentPosition
    const finalPosition = getFinalPosition(currentPosition, totalDicePoints)

    players[players.currentTurn].totalPoints += finalPosition
    players[players.currentTurn].currentPosition = finalPosition
}

while (true) {
    roll()

    if (isWinner(players[players.currentTurn])) {
        break;
    }

    flipTurn()
}

// Hack to get in "current turn" the losing player
flipTurn()

console.log("Final result is", players[players.currentTurn].totalPoints * totalDiceRolls)