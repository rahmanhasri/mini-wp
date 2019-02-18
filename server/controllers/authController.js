const User = require('../models/user')
const { compareHash } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
require('dotenv').config()
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = {
  register : function(req, res) {

    let input = {
      email : req.body.email,
      name : req.body.name,
      password : req.body.password,
    }
    User.create(input)
      .then( function(newUser) {
        let token = tokenGenerator(newUser._id, newUser.email)
        res
          .status(201)
          .json({ token : token })
      })
      .catch( function(err) {
        res
          .status(400)
          .json(err)
      })
  },

  login : function(req, res) {

    // console.log(req.body)
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
              .json({ message : `invalid username or password`})
          } else {
            let token = tokenGenerator(user._id, user.email)
            res
              .status(200)
              .json({ token : token , email : user.email})
          }
        }
      })
      .catch( function(err) {
        res
          .status(500)
          .json(err)
      })
  },

  loginGoogle: function(req, res) {

    let oldUser = null
    let dataPayload = null;
    client.verifyIdToken({
      idToken : req.body.token,
      audience : process.env.CLIENT_ID
    })
    .then( function(ticket) {
      const payload = ticket.getPayload();
      dataPayload = payload;
      return User.findOne({
        email : payload.email
      })
    })
    .then( function(data) {
      if(!data) {
        let randomPass = ''
        let kamus = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        while(randomPass.length < 7) {
          randomPass += Math.floor(Math.random() * kamus.length)
        }
        return User.create({
          name : dataPayload.name,
          email : dataPayload.email,
          password : randomPass
        })
      } else {
        oldUser = data
        return null
        res.status(200).json({ token : token })
      }
    })
    .then( newUser => {
      // console.log('google')
      let token = null
      if(!newUser) {
        token = tokenGenerator(oldUser._id, oldUser.email)
      } else {
        token = tokenGenerator(newUser._id, newUser.email)
      }
      res.status(200).json({ token : token })
    })
    .catch( err => {
      res.status(500).json(err)
    })
  }
}