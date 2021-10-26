const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');


const getSubScriper = async (req, res, next) => {
    let subscriber

    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: 'no user found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
}

//get all 
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//get one 
router.get('/:id', getSubScriper, (req, res) => {
    res.json(res.subscriber);
})


//create one 
router.post('/', async (req, res) => {
    let { body } = req
    const subscriber = new Subscriber({
        name: body.name,
        subscribersToChanel: body.subscribersToChanel
    })

    try {
        const newSbscriber = await subscriber.save();
        res.json(newSbscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// delete one
router.delete('/:id', getSubScriper, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'deleted sussfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//update one 
router.patch('/:id', getSubScriper, async (req, res) => {
    let { body } = req;
    let { name, subscribersToChanel, subscribersDate } = body || {};
    let { subscriber } = res;

    if (name) {
        subscriber.name = name;
    }

    if (subscribersToChanel) {
        subscriber.subscribersToChanel = subscribersToChanel;
    }

    if (subscribersDate) {
        subscriber.subscribersDate = subscribersDate;
    }

    try {
        let updateSubscriber = await subscriber.save(); 
        res.json(updateSubscriber)
    } catch (error) {
     res.status(400).json({message: error.message })   
    }
})






module.exports = router;