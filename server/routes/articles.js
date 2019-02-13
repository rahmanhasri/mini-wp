var express = require('express');
var router = express.Router();
var article = require('../controllers/articleController')

router.get('/', article.getArticles)
router.post('/', article.createArticle)
router.put('/:id', article.updateArticle)
router.delete('/:id', article.deleteArticle)

module.exports = router;
