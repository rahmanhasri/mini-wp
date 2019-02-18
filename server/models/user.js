const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashGenerator } = require('../helpers/bcrypt')

let UserSchema = new Schema({
  name : {
    type : String,
    minlength: [ 4, 'minimal input name is 4 character']
  },
  email: {
    type: String,
    validate: [
      {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
        },
        message: "invalid email format"
      },
      {
        isAsync: true,
        validator: function(value, callback) {
          User
          .findOne({ email : value })
            .then( (user) => {
              // console.log(user._id)
              // console.log(this._id)
              // console.log(this._id == user._id)
              if(user && user._id.toString() != this._id.toString()) {
                callback(false)
              } else {
                callback(true)
              }
            })
            .catch( (err) => {
              throw err
            })
        },
        message: "this email is taken. please use another email."
      }
    ]
  },
  password : {
    type: String,
    minlength : [6, 'minimal input password is 6 character']
  },
  articles : [{ type: Schema.Types.ObjectId, ref: 'Article'}]
})

UserSchema.pre('save', function(next,docs) {
  console.log(docs)
  this.password = hashGenerator(this.password)
  next()
})

let User = mongoose.model('User', UserSchema)

module.exports = User