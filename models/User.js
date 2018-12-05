const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// same as, this is object destructuring
// const {Schema} = mongoose

const userSchema = new Schema({
  providedId: String,
  provider: String
});

//this creates a model class
mongoose.model('users', userSchema);
