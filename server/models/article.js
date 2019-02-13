const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
  title : {
    type : String,
    minlength : [6, 'minimal title length is 6']
  },
  content: {
    type: String,
    required : [true, `content can't be blank`]
  },
  created_at : {
    type : Date,
    default : new Date
  },
  image : String
})

let article = mongoose.model('Article', articleSchema)

module.exports = article