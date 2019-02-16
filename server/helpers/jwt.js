const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  tokenGenerator : function(id, email) {
    return jwt.sign({ id: id, email : email }, process.env.SECRET)
  },

  tokenDecoder : function(token) {
    return jwt.verify(token, process.env.SECRET)
  }
}