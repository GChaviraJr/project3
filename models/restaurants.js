const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultsSchema = new Schema ({
    name: String,
    address: String,
    coordinates: Array,
    URL: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Results = mongoose.model(
    'Results', resultsSchema
);

module.exports = Results;
