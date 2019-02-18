var express = require('express');
var router = express.Router();
var article = require('../controllers/articleController')
var images = require('../helpers/images')
var { isLogin, isAuthorize } = require('../middlewares/authorize')

router.get('/', article.getArticles)
// router.post('/:id', images.multer.single('image'), images.sendUploadToGCS, article.createAndUpdateArticle)
router.use(isLogin)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, article.createArticle)
// post diatas create, post dibawah update
router.post('/:id', isAuthorize, images.multer.single('image'), images.sendUploadToGCS, article.updateArticle)
router.put('/:id', article.modifyArticle)
router.delete('/:id', isAuthorize, article.deleteArticle)

module.exports = router;
