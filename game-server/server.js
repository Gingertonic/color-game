const server = require("http").createServer();
const io = require("socket.io")(server)

io.on('connection', socket => {
    console.log('A stranger approaches!')
})

server.listen(5002, () => console.log("Serving up fresh data on port 5002"))