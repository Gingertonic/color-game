const allGames = []
const gamesIndex = document.getElementById('games-index')
const currentGame = document.getElementById('current-game')
const newGame = document.getElementById('create-new')
let stopButton
let colourpick
let soundscape

const loadGames = () => {
    allGames.push('my-team', 'welovepuppies', 'cat-clan')
    allGames.forEach(renderGameLink)
}


const leaveColourscape = () => { 
    currentGame.innerHTML = ""
}

const updateColour = (playerId, colour) => {
    colourscape.updateColour(playerId, colour)
}

const enterGame = id => {
    leaveColourscape()
    console.log(`entering game ${id}`)
    // join the game
    // get the game details (other players)
    const playerIds = ['playerOne', 'playerTwo', 'playerThree']
    const localPlayer = new LocalPlayer('my-id')
    const remoteIds = playerIds.filter(p => p !== 'my-id')
    const remotePlayers = remoteIds.map(p => new RemotePlayer(p))
    const allPlayers = [...remotePlayers, localPlayer]
    colourscape = new Colourscape(id, allPlayers)
    currentGame.innerHTML = (colourscape.renderColourscape())
    colourscape.renderPlayerDivs(currentGame)
    startButton = document.querySelector("#start")
    stopButton = document.querySelector("#stop")
    colourpick = document.querySelector("#color-pick")
    stopButton.onclick = leaveColourscape
    colourpick.onchange = () => updateColour('my-id', colourpick.value)
}

const renderGameLink = gameID => {
    let gameLink = document.createElement("li")
    gameLink.innerText = gameID
    gameLink.setAttribute("class", "game-link")
    gameLink.onclick = () => enterGame(gameID)
    gamesIndex.append(gameLink)
}

const createNewGame = e => {
    e.preventDefault()
    id = e.target.gameID.value
    id && allGames.push(id)
    id && renderGameLink(id)
}

newGame.onsubmit = createNewGame
loadGames()