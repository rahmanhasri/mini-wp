const { tokenDecoder } = require('../helpers/jwt')
const User = require('../models/user')

module.exports = {

  isLogin: function(req, res, next) { // tested
      
    try {
      
      let token = req.headers.token
      if(!token) {
        throw 'invalid token'
      } else {
        
        let tokenDecoded = tokenDecoder(token)
        User.findOne({ email : tokenDecoded.email })
          .then( function(user) {
            if(!user) {
              throw 'invalid token'
            } else {
              console.log('here')
              req.headers.id = user._id
              next()
            }
          })
      }
    } catch (err) {
      // console.log(err)
      res
        .status(400)
        .json({ message :`invalid token` })
    }
  },
}