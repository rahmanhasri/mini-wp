var express = require('express');
var router = express.Router();
var articlesRoute = require('./articles')
var uploadRoute = require('./uploads.js')
var authRoute = require('./authentication')
var userRoute = require('./user')
var { isLogin } = require('../middlewares/authorize')


router.use('/', authRoute)
router.use('/upload', uploadRoute)
router.use('/articles',  articlesRoute)
router.use('/user', isLogin, userRoute)
router.get('/', function(req, res) {
  res.send('welcome to mini-wp')
})

module.exports = router;
