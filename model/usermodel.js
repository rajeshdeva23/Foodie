const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  profileImage: { type: String, required: false },
  mobilenumber: { type: String, required: true, unique: true },
  authyId: String,
  address: [{
    type: String,
    loc: {
      type: { type: String },
      coordinates: [],
    },
  }],
})

module.exports = mongoose.model('User', UserSchema)
