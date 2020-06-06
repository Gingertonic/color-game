class Player {
    constructor(id){
        this.id = id
        this.color = '#ff4040'
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
        gameContainer.append(this.playerDiv)
    }

}


class LocalPlayer extends Player {
    updateColour(colour){
        this.updateColourChoice(colour)
    }

    leaveGame(){
        socket.disconnect()
    }
}

class RemotePlayer extends Player {
    updateColour(colour){
        this.updateColourChoice(colour)
    }
}