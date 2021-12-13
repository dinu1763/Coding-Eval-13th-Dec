const express = require('express');
const app = express();
const connect = require('./configs/db');


app.use(express.json());





const start = async () => {
    await connect();
    return app.listen(8000, () => {
        console.log("listening at 8000");
    });
}

module.exports = start;