const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    empID: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    task: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    }

});

module.exports = mongoose.model('report', reportSchema);