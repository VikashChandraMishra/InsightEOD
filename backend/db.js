const mongoose = require('mongoose');
const { mongoURI } = process.env;

mongoose.set('strictQuery', false);

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('successfully connected to mongodb!');
    })
}

module.exports = connectToMongo;