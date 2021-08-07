const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  facebook: {
    type: String
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  telegram: {
    type: String
  },
  linkedIn: {
    type: String
  },
  watsApp: {
    type: String
  },
  snapChat: {
    type: String
  },
  skype: {
    type: String
  },
  type: {
    type: String,
    enum : ['personal', 'business'],
    default: 'personal'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('contacts', contactSchema);