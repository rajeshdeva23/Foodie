var mongoose = require('mongoose')
var moment = require('moment'); // For date handling.
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    verified: { type: Boolean, default: false },
    mobilenumber: { type: String, required: true },
    authyId: String,
    address: [{
        type: String,
        loc: {
            type: { type: String },
            coordinates: []
        }
    }]
})

module.exports = mongoose.model('User', UserSchema);