
if (process.env.NODE_ENV !== 'production') {
    require('dotenv')?.config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', (e) => console.error('db error: ', e));
db.once('open', () => console.log('conncted to db'))

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(process.env.PORT || 3000, () => console.log('server started'));