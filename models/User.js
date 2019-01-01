const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// same as, this is object destructuring
// const {Schema} = mongoose

const userSchema = new Schema({
  active: Boolean,
  activeFlags: {
    verifiedEmailOrProvider: Boolean,
    agreedToTerms: Date
  },
  nameFirst: String,
  nameLast: String,
  providedId: String,
  provider: String,
  profileImage: String,
  about: String,
  expertAreas: [{ type: mongoose.Schema.ObjectId, ref: 'ExpertArea' }]
});

//this creates a model class
mongoose.model('users', userSchema);
