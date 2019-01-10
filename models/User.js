const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
// same as, this is object destructuring
// const {Schema} = mongoose

const UserSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false
  },
  activeFlags: {
    verifiedEmailOrProvider: {
      type: Boolean,
      default: false
    },
    agreedToTerms: Date
  },
  nameFirst: String,
  nameLast: String,
  email: String,
  emailVerificationToken: String,
  password: String,
  providedId: String,
  provider: String,
  profileImage: String,
  about: String,
  expertAreas: [{ type: mongoose.Schema.ObjectId, ref: 'ExpertArea' }]
});

//need to do function() so that you get binding to this
UserSchema.methods.updateActiveStatus = async function() {
  // const user = this;
  const { agreedToTerms, verifiedEmailOrProvider } = this.activeFlags;
  // console.log('user in User.js: ', user);
  if (agreedToTerms && verifiedEmailOrProvider) {
    user.active = true;
  }

  await user.save();
  return user;
};
//this creates a model class
const User = mongoose.model('User', UserSchema);
module.exports = User;
//mongoose.model('users', userSchema);

// const userSchema = new Schema({
//   active: {
//     type: Boolean,
//     default: false
//   },
//   activeFlags: {
//     verifiedEmailOrProvider: Boolean,
//     agreedToTerms: Date,
//     emailConfirmed: {
//       type: Boolean,
//       default: false
//     }
//   },
//   nameFirst: String,
//   nameLast: String,
//   email: String,
//   emailVerificationToken: String,
//   password: String,
//   providedId: String,
//   provider: String,
//   profileImage: String,
//   about: String,
//   expertAreas: [{ type: mongoose.Schema.ObjectId, ref: 'ExpertArea' }]
// });

// //this creates a model class
// mongoose.model('users', userSchema);
