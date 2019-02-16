const User = require('../models/user')
const { compareHash } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

module.exports = {
  register : function(req, res) {

    let input = {
      email : req.body.email,
      name : req.body.name,
      password : req.body.password,
    }
    User.create(input)
      .then( function(newUser) {
        res
          .status(201)
          .json(newUser)
      })
      .catch( function(err) {
        res
          .status(400)
          .json(err)
      })
  },

  login : function(req, res) {

    console.log(req.body)
    User.findOne({email : req.body.email})
      .then( function(user) {
        // console.log(user)
        if(!user) {
          res
            .status(400)
            .json({ msg : `invalid username or password`})
        } else {
          let checkPass = compareHash(req.body.password, user.password)
          if(!checkPass) {
            res
              .status(400) // tanya ke dimitri
              .json({ msg : `invalid username or password`})
          } else {
            let token = tokenGenerator(user._id, user.email)
            res
              .status(200)
              .json({ token : token })
          }
        }
      })
      .catch( function(err) {
        res
          .status(500)
          .json(err)
      })
  }
}