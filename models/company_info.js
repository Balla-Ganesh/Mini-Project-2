const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  name: {
    type: String
  },
  year: {
    type: String
  },
  products: {
    type: String
  },
  info: {
    type: String
  },
  url: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);