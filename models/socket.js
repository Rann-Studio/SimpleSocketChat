var socketIo = require('socket.io')
const fs = require('fs')

function init(server) {
    var io = socketIo(server, {
        cors: {
            origin: "*"
        }
    })

    var clients = []

    io.on("connection", (socket) => {

        socket.on('user-join', (data) => {
            clients.push(data)
            socket.broadcast.emit("user-join", data)
        })

        socket.on('send-chat', (data) => {
            socket.broadcast.emit("send-chat", data)
        })

        socket.on('disconnect', () => {
            const data = clients.filter(client => client.socketId == socket.id)[0];
            socket.broadcast.emit("user-left", data)
        })

    })
}



module.exports = {
    init: init
}