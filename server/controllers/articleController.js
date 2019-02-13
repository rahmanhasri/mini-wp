const Article = require('../models/article')

module.exports = {
  getArticles: function(req, res) {
    
    Article.find({}).sort({'created_at' : 'desc'})
      .then( function(articles) {
        res
          .status(200)
          .json(articles)
      })
      .catch( function(err) {
        res
          .status(500)
          .json(err)
      })
  },

  createArticle: function(req, res) {

    Article.create({
      title : req.body.title,
      content : req.body.content
    })
      .then( function(newData) {
        res
          .status(201)
          .json(newData)
      })
      .catch( function(err) {
        res
          .status(400)
          .json(err)
      })
  },

  updateArticle: function(req, res) {

    Article.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content
    }, { new : true } )
      .then( function(updated) {
        res
          .status(200)
          .json(updated)
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(400)
          .json(err)
      })
  },

  deleteArticle: function(req, res) {

    Article.findByIdAndDelete(req.params.id)
      .then( function(deleted) {
        console.log(deleted)
        res
          .status(200)
          .json(deleted)
      })
      .catch( function(err) {
        console.log(err)
        res
          .status(400)
          .json(err)
      })
  }


}