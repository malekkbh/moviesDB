const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
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
    },

    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    genres: {
        type: Array,
        required: true,
        default: []
    },
    ratings:
    {
        type: Array,
        required: true,
        default: []
    },
    poster: {
        type: String,
        required: true,
    },
    contentRating: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    averageRating: {
        type: Number,
        required: true,
        default: 0,
    },
    originalTitle: {
        type: String,
        required: false,
    },
    storyline: {
        type: String,
        required: true,
    },
    actors: {
        type: Array,
        required: true,
        default: []
    },
    imdbRating: {
        type: String
    },
    posterurl: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Movie', MovieSchema)