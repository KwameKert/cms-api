const express = require('express');
const uploadController = require('../controllers/upload.controller');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})
const upload = multer({storage});



router.post('/',upload.single('document'), uploadController.upload );

module.exports = router;
