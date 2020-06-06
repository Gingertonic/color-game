const allGames = []
const gamesIndex = document.getElementById('games-index')
const currentGame = document.getElementById('current-game')
const newGame = document.getElementById('create-new')
let stopButton
let colourpick
let colourscape

const socket = io("http://localhost:5002")

const loadGames = () => {
    allGames.push('my-team', 'welovepuppies', 'cat-clan')
    allGames.forEach(renderGameLink)
}

const addPlayer = (playerId, gameId) => {
    const newPlayer = new RemotePlayer(playerId, gameId)
    colourscape.players.push(newPlayer)
    newPlayer.renderPlayerDiv(currentGame)
}


const leaveColourscape = id => {
    socket.emit('leave-game', id)
    currentGame.innerHTML = ""
}

const updateColour = (playerId, colour) => {
    colourscape.updateColour(playerId, colour)
}

const requestGameEntry = gameId => {
    leaveColourscape()
    socket.emit('request-join-game', gameId)
}

const enterGame = ({ gameId, players }) => {
    const localPlayer = new LocalPlayer(socket.id, gameId)
    const remoteIds = players.filter(p => p !== socket.id)
    const remotePlayers = remoteIds.map(p => new RemotePlayer(p, gameId))
    const allPlayers = [...remotePlayers, localPlayer]
    colourscape = new Colourscape(gameId, allPlayers)
    currentGame.innerHTML = (colourscape.renderColourscape())
    colourscape.renderPlayerDivs(currentGame)
    startButton = document.querySelector("#start")
    stopButton = document.querySelector("#stop")
    colourpick = document.querySelector("#color-pick")
    stopButton.onclick = () => leaveColourscape(gameId)
    colourpick.onchange = () => updateColour(socket.id, colourpick.value)
}

const renderGameLink = gameID => {
    let gameLink = document.createElement("li")
    gameLink.innerText = gameID
    gameLink.setAttribute("class", "game-link")
    gameLink.onclick = () => requestGameEntry(gameID)
    gamesIndex.append(gameLink)
}

const createNewGame = e => {
    e.preventDefault()
    id = e.target.gameID.value
    id && allGames.push(id)
    id && renderGameLink(id)
    e.target.gameID.value = ""
    requestGameEntry(id)
}

const removePlayer = ({ playerId }) => document.getElementById(playerId).remove()

socket.on('admin-message', msg => console.log(msg))
socket.on('entry-permission', enterGame)
socket.on('new-player-joining', ({ playerId, gameId }) => addPlayer(playerId, gameId))
socket.on('remote-colour-change', ({ playerId, newColour }) => updateColour(playerId, newColour))
socket.on('player-left', removePlayer)

newGame.onsubmit = createNewGame
loadGames()

