var mongoose = require('mongoose');

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('Connection success to MONGODB')
    } catch (error) {
        console.log('Connection failed to MONGODB')
        console.error(error.message)
    }
}

module.exports = DB;