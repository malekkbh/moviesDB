const mongoose = require('mongoose');

const subscribersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    subscribersToChanel: {
        type: String,
        required: true,
    },
    subscribersDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscribersSchema)