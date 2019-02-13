var express = require('express');
var router = express.Router();
var articlesRoute = require('../routes/articles')


router.use('/articles', articlesRoute)
router.get('/', function(req, res) {
  res.send('welcome to mini-wp')
})

module.exports = router;
