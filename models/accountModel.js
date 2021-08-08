const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const isUrlValid = require('url-validation');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      minlength: [6, 'Minimum password length is 6 characters'],
      required: [true, 'Please enter a password']
    },
    username:{
        type: String,
        required: [true, 'Please enter an username'],
        minlength: [4, 'Minimum password length is 4 characters'],
        lowercase: true
    },
    phone_number:{
        type: String,
        minlength: [11, 'Minimum password length is 11 characters'],
        required: [true, 'Please enter a phone_number']
    },
    facebook_account_url:{
        type: String,
        required: [true, 'Please enter a facebook_account_url'],
        validate:[isUrlValid, 'Please enter a valid url']
    },
    twitter_account_url:{
        type: String,
        required: [true, 'Please enter a twitter_account_url'],
        validate:[isUrlValid, 'Please enter a valid url']
    },
    instagram_account_url:{
        type: String,
        required: [true, 'Please enter a instagram_account_url'],
        validate:[isUrlValid, 'Please enter a valid url']
    }
  });


  userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  
  const User = mongoose.model('user', userSchema)
 
  module.exports = User;