const { Router } = require('express')
const { login, register, showLogin, showRegister, logout } = require('../controllers/userController')

const userRouter = Router()

userRouter.get('/login', showLogin)
userRouter.post('/login', login)

userRouter.get('/register', showRegister)
userRouter.post('/register', register)

userRouter.get('/logout', logout)

module.exports = userRouter