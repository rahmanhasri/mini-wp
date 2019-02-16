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
  created_at : Date,
  image : String,
  tags : [{ type : Schema.Types.String, ref: 'Tag' }]
})

let article = mongoose.model('Article', articleSchema)

module.exports = article