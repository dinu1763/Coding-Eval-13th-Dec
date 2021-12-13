const express = require('express');
const app = express();
const connect = require('./configs/db');
const userController = require('./controllers/user.controller');
const movieController = require('./controllers/movie.controller');
const showController = require('./controllers/show.controller');
const seatController = require('./controllers/seat.controller');


app.use(express.json());


app.use('/user', userController);
app.use('/movie', movieController);
app.use('/shows', showController);
app.use('/seats', seatController);

const start = async () => {
    await connect();
    return app.listen(8000, () => {
        console.log("listening at 8000");
    });
}

module.exports = start;