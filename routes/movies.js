const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');


const getMovie = async (req, res, next) => {
    let movie;

    try {
        movie = await Movie.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json({ message: 'no movie found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.movie = movie;
    next();
}

//get all 
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//get one 
router.get('/:id', getMovie, (req, res) => {
    res.json(res.movie);
})


//create one 
router.post('/', async (req, res) => {
    let { body } = req
    const movie = new Movie({
        name: body.name,
        subscribersToChanel: body.subscribersToChanel
    })

    try {
        const newSbscriber = await movie.save();
        res.json(newSbscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// delete one
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: 'deleted sussfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//update one 
router.patch('/:id', getMovie, async (req, res) => {
    let { body } = req;
    let { name, subscribersToChanel, subscribersDate } = body || {};
    let { movie } = res;

    if (name) {
        movie.name = name;
    }

    if (subscribersToChanel) {
        movie.subscribersToChanel = subscribersToChanel;
    }

    if (subscribersDate) {
        movie.subscribersDate = subscribersDate;
    }

    try {
        let updateSubscriber = await movie.save(); 
        res.json(updateSubscriber)
    } catch (error) {
     res.status(400).json({message: error.message })   
    }
})






module.exports = router;