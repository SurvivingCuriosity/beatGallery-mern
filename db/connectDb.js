const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    console.log(`MongoDB connected`);
}
module.exports = connectDB;