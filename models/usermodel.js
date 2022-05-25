const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell your name']
  },
  email: {
    type: String,
    required: [true, 'provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a vaild email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please give password'],
    minlength: 8,
    select: false
  },
  passwordconfirm: {
    type: String,
    required: [true, 'please give password'],
    validate: {
      // This always work on save and create

      validator: function(el) {
        return el === this.password;
      }
    }
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // ren function if password is modified

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordconfirm = undefined;
  next();
}); 

userSchema.methods.correctpassword = async function(
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
