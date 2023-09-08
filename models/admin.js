const mongoose = require('mongoose');

const admin_login = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
      type: String,
    }
});

module.exports = mongoose.model('Admin', admin_login);