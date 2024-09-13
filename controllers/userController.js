const User = require('../models/User')

exports.showLogin = (req, res) => {
    res.render('user/login', { field: '', message: '' })
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        // validate user input
        if (!username) return res.status(400).render('user/login', { field: 'username', message: 'Username is required!' })
        if (!password) return res.status(400).render('user/login', { field: 'password', message: 'Password is required!' })
        // check if username exist
        const user = await User.findOne({ username })
        if (!user) return res.status(404).render('user/login', { field: 'username', message: 'User is not found!' })
        // check if password match
        if (!user.comparePassword(password)) return res.status(400).render('user/login', { field: 'password', message: 'Password is incorrect!' })
        // create session
        req.session.userId = user._id
        // redirect to chat area
        res.redirect('/chat-area')
    } catch (e) {
        console.log(e)
        res.status(400).render('user/login', { field: 'username', message: 'Server error' })
    }
}

exports.showRegister = (req, res) => {
    res.render('user/register', { field: '', message: '' })
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    try {
        // validate user input
        if (!username) return res.status(400).render('user/register', { field: 'username', message: 'Username is required!' })
        if (!password) return res.status(400).render('user/register', { field: 'password', message: 'Password is required!' })
        // create user
        const user = new User({ username, password })
        await user.save()
        // create session
        req.session.userId = user._id
        // redirect to chat area
        res.redirect('/chat-area')
    } catch (e) {
        console.log(e)
        res.status(400).render('user/register', { field: 'username', message: 'Server error' })
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(500).send('Failed to logout')
            res.clearCookie('connect.sid')
            res.redirect('/login')
        })
    } catch (e) {
        res.status(500).send('Failed to logout')
    }
}