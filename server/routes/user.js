var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

router.get('/', userController.getUser)
router.get('/articles', userController.getArticles)
router.post('/update', userController.update)

module.exports = router;
