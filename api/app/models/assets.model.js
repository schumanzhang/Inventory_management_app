import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let assetsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    dimensions: {type: [Number], required: true},
    location: {type: String, required: true},
    shopping: {type: [String], required: true},
    status: {type: Boolean, required: true},
    lastChanged: Number
});

export default mongoose.model('Assets', assetsSchema);

module.exports = mongoose.model('Assets', assetsSchema);