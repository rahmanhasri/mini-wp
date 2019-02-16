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

  createAndUpdateArticle: function(req, res) {

    let image = req.file ? req.file.cloudStoragePublicUrl : ''
    // console.log(req.file)
    // console.log(req.body)

    console.log(req.body)
    if(req.params.id) {
      Article.updateOne({ _id : req.params.id }, { $set : req.body }, { new : true, runValidators : true })
        .then( function(updated) {
          console.log(updated)
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
    } else {

      Article.create({
        title : req.body.title,
        content : req.body.content,
        image : image,
        created_at : new Date()
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
    }

  },

  updateArticle: function(req, res) {

    input = {
      title : req.body.title,
      content : req.body.content,
    }
    
    Article.findByIdAndUpdate(req.params.id, { $set : input }, { new : true } )
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
        // console.log(deleted)
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