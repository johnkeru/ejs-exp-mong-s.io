const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Connected!')
    } catch (e) {
        console.log('Error connecting to MongoDB: ' + e.message)
    }
}