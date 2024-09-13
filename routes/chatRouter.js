const { Router } = require('express')
const { showChatArea, getMessagesPagination } = require('../controllers/chatController')
const auth = require('../middleware/auth')

const chatRouter = Router()

chatRouter.get('/chat-area', auth, showChatArea)
chatRouter.post('/get-messages', auth, getMessagesPagination)

module.exports = chatRouter