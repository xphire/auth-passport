const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    userName : String,
    hash : String,
    
  }
);


module.exports = mongoose.model('User',schema);