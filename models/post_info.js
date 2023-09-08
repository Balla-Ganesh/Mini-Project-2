const mongoose = require('mongoose');

const post_info = new mongoose.Schema({
    roll_no: {
        type: String,
        // required: true
    },
    name: {
      type: String,
    //   required: true
    },
    year: {
      type: String,
    //   required: true
    },
    department: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true 
    },
    phone_no: {
        type: String,
        // required: true 
    },
    company_name: {
        type: String 
    },
    company_role: {
        type: String
    },
    company_requirments: {
        type: String
    },
    exam_pattern: {
        type: String 
    },
    tech1: {
        type: String,
    },
    tech2: {
        type: String
    },
    hr: {
        type: String 
    },
    inputs: {
        type: String 
    }
});

module.exports = mongoose.model('Interview Details', post_info);