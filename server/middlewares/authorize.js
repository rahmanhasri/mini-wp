const { tokenDecoder } = require('../helpers/jwt')
const User = require('../models/user')
const Article = require('../models/article')

module.exports = {

  isLogin: function(req, res, next) { // tested
      
    try {
      
      let token = req.headers.token
      if(!token) {
        throw 'invalid token'
      } else {
        
        let tokenDecoded = tokenDecoder(token)
        User.findOne({ _id : tokenDecoded.id })
          .then( function(user) {
            // console.log(user)
            if(!user) {
              throw 'invalid token'
            } else {
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

  isAuthorize: function(req, res, next) {

    Article.findOne({ _id : req.params.id })
      .then( function(article) {
        if((article.author).toString() != (req.headers.id).toString()) {
          res
            .status(400)
            .json({ message : `Invalid authorize access`})
        } else {
          next()
        }
      })
      .catch( function(err) {
        res
          .status(500)
          .json(err)
      })
  }
}