const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified) return next();
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPasswrod = await bcrypt.hash(user.password, salt)
        user.password = hashedPasswrod
        next()
    } catch (e) {
        next(e)
    }
})

userSchema.methods.comparePassword = function (password) {
    try {
        const user = this
        return bcrypt.compareSync(password, user.password)
    } catch (e) {
        return false;
    }
}

module.exports = mongoose.model('User', userSchema)