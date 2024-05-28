const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error(error)
        process.exit()
    }
}

module.exports = connectDB