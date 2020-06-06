class Player {
    constructor(id, gameId){
        console.log(gameId)
        this.id = id
        this.color = '#ff4040'
        this.gameId = gameId
    }

    updateUsername(username){
        this.username = username
    }

    updateColourChoice(colour){ 
        this.colour = colour
        this.playerDiv.style.backgroundColor = this.colour
    }

    renderPlayerDiv = gameContainer => {
        this.playerDiv = document.createElement("div")
        this.playerDiv.style.width = "150px"
        this.playerDiv.style.height = "150px"
        this.playerDiv.style.margin = "2px"
        this.playerDiv.style.backgroundColor = this.color
        this.playerDiv.setAttribute("class", "player-color")
        this.playerDiv.setAttribute("id", this.id)
        gameContainer.append(this.playerDiv)
    }

}


class LocalPlayer extends Player {
    updateColour(colour){
        this.updateColourChoice(colour)
        socket.emit('colour-change', { gameId: this.gameId, playerId: this.id, newColour: this.colour })
    }
}


class RemotePlayer extends Player {
    updateColour(colour){
        this.updateColourChoice(colour)
    }
}