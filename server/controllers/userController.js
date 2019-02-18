const User = require('../models/user')
const Article = require('../models/article')

module.exports = {
  update : function(req, res) {
  },

  getUser: function(req, res) {
    
    User.findOne({ _id : req.headers.id })
      .then( function(user) {
        res
          .status(200)
          .json(user)
      })
      .catch( function(err) {
        res
          .status(500)
          .json(err)
      })
  },

  getArticles: function(req, res) {

    // console.log(req.headers.id)
    Article.find({ author : req.headers.id , status : req.query.q }).sort({'created_at' : 'desc'})
      .then( function(articles) {
        res
          .status(200)
          .json(articles)
      })
      .catch( function(err) {
        res
          .status(400)
          .json(err)
      })
  }
}
