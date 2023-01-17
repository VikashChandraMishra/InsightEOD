const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    empID: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true,
    },

    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    designation : {
        type: String,
        required: true
    },

    branch: {
        type: String,
        required: true
    },
    
    reportingManagerID: {
        type: Number,
        default: 0
    },

    reportingManagerName: {
        type: String
    },

    subordinateCount: {
        type: Number,
        default: 0
    },

    currentSubmission: {
        type: String,
        default: "not done"
    }

})

module.exports = mongoose.model('user', userSchema);