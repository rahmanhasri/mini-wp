var express = require('express');
var router = express.Router();
var article = require('../controllers/articleController')
var images = require('../helpers/images')

router.get('/', article.getArticles)
router.post('/:id', images.multer.single('image'), images.sendUploadToGCS, article.createAndUpdateArticle)
// router.put('/:id', article.updateArticle)
router.delete('/:id', article.deleteArticle)

module.exports = router;
