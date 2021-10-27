
if (process.env.NODE_ENV !== 'production') {
    require('dotenv')?.config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', (e) => console.error('db error: ', e));
db.once('open', () => console.log('conncted to db'))

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
const moviesRouter = require('./routes/movies');

app.use('/subscribers', subscribersRouter);
app.use('/movies', moviesRouter);

app.listen(process.env.PORT || 3000, () => console.log('server started'));