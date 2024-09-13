const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema)