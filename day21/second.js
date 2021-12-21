const diceRollsPerTurn = 3
const winningPoints = 21
const minDiceValue = 1
const maxDiceValue = 3

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

// On a set of three dice rolls, 
// there are 27 possible universes but
// actually only 7 results.
const universeRollMap = {
    3: 1,
    4: 3,
    5: 6,
    6: 7,
    7: 6,
    8: 3,
    9: 1
}

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

console.log("Final result is", players[players.currentTurn].totalPoints * totalDiceRolls)