'use strict'
const express = require('express')
const router = express.Router()
const images = require('../helpers/images')

router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})
router.post('/',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router
