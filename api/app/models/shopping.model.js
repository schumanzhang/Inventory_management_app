import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let shoppingCentreSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    assets: {type: [String], required: true},
    lastChanged: Number
});

export default mongoose.model('ShoppingCentre', shoppingCentreSchema);

module.exports = mongoose.model('ShoppingCentre', shoppingCentreSchema);