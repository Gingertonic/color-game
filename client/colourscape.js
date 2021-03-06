class Colourscape {
    constructor(id, players){
        this.id = id;
        this.players = players;
    }

    start(){
        console.log('Starting game')
    }

    end(){
        console.log('Ending game')
    }

    updateColour(playerId, colour){
        const player = this.players.find( p => p.id === playerId  )
        player.updateColour(colour)
    }

    renderColourscape(){
        return (
            `<button id="stop">Leave</button>
            <input id="color-pick" type="color"/>`
        )
    }

    renderPlayerDivs(gameContainer){
        this.players.forEach(p => p.renderPlayerDiv(gameContainer))
    }
}