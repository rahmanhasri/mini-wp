var express = require('express');
var router = express.Router();
var article = require('../controllers/articleController')
var images = require('../helpers/images')

router.get('/', article.getArticles)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, article.createArticle)
router.put('/:id', article.updateArticle)
router.delete('/:id', article.deleteArticle)

module.exports = router;
