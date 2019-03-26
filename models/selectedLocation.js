const mongoose = require('mongoose')
const Schema = mongoose.Schema

const selectedLocationSchema = new Schema ({
    name: String,
    address: String,
    coordinates: Array,
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const selectedLocation = mongoose.model(
    'selectedLocation', selectedLocationSchema
);

module.exports = selectedLocation;