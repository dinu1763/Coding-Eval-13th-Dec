const { Schema, model } = require('mongoose');

const seatSchema = new Schema({
    screen:{
        type: Schema.Types.ObjectId,
        ref: 'show',
        required:true
    },
},{
    versionKey:false,
    timestamps:true
});

const Seat = model('seat', showSchema);
module.exports = Seat;