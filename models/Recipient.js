const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// same as, this is object destructuring
// const {Schema} = mongoose

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
