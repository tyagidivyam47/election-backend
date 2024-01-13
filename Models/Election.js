const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const electionSchema = new Schema({
    className:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    },
    candidates:{
        type: Array,
        required: true
    },
    result:{
        type: String,
        required: false
    },
    session:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Election', electionSchema);