const { Server } = require('socket.io')
const Message = require('../models/Message')

module.exports = (server) => {
    const io = new Server(server)
    io.on('connection', (socket) => {
        socket.on('create-room', (senderId, receiverId) => {
            const combinedId = [senderId, receiverId].sort().join('_')
            socket.join(combinedId)
        })

        socket.on('message', async (message, senderId, receiverId) => {
            const combinedId = [senderId, receiverId].sort().join('_')
            const newMessage = Message({ message, sender: senderId, receiver: receiverId })
            await newMessage.save()
            io.to(combinedId).emit('message', newMessage)
        })

    })
}

