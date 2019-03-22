const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultsSchema = new Schema ({
    name: String,
    address: String,
    URL: String,
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Results = mongoose.model(
    'Results', resultsSchema
);

module.exports = Results;
