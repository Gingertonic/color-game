const server = require("http").createServer();
const io = require("socket.io")(server)

io.on('connection', socket => {
    console.log('A stranger approaches!')
    // get number of connections
    const participantCount = io.engine.clientsCount
    // send event only to user
    socket.emit('admin-message', 'Welcome to our place!')
    // send event to all others Users 
    socket.broadcast.emit('admin-message', `A new friend has arrived!`)
    // send event to all Users
    io.emit('admin-message', `Time to party! There are ${participantCount} friends here now!`)

    socket.on('request-join-game', gameId => {
        socket.join(gameId)
        socket.broadcast.to(gameId).emit('admin-message', `A new user has joined ${gameId}`)
        const roomData = io.sockets.adapter.rooms[gameId]
        const inRoomCount = roomData.length
        const inRoomIds = Object.keys(roomData.sockets)
        // send event only to User
        socket.emit('entry-permission', { gameId, players: inRoomIds})
        // send event to all other Users in room
        socket.broadcast.to(gameId).emit('new-player-joining', { playerId: socket.id, gameId })
        // send event to all Users in room
        io.to(gameId).emit('admin-message', `There are ${inRoomCount} friends in ${gameId} now!`)
    })

    socket.on('colour-change', ({ gameId, playerId, newColour }) => {
        socket.broadcast.to(gameId).emit('remote-colour-change', { playerId, newColour})
    })

    socket.on('leave-game', gameId => {
        socket.leave('leave-game')
        socket.broadcast.to(gameId).emit('player-left', {playerId: socket.id})
    })
    

    socket.on('disconnect', () => console.log('A friend has left us :('))
})

server.listen(5002, () => console.log("Serving up fresh data on port 5002"))

