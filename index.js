require('dotenv').config()
const express = require('express')
const userRouter = require('./routes/userRouter')
require('./config/dbConnect')()
const session = require('express-session')
const { create } = require('connect-mongo')
const chatRouter = require('./routes/chatRouter')
const socket = require('./socket/socket')

const app = express()
const server = app.listen(5000, () => console.log('Server is listening on: http://localhost:5000'))

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/pages')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 60 * 60 * 24 * 14
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

socket(server)

app.use(userRouter)
app.use(chatRouter)
