'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the project'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the project'
  }
  ,picture: {
    type: String,
    required: 'Kindly enter the picture of the project'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }

});

module.exports = mongoose.model('Projects', ProjectSchema);