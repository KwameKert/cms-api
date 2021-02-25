const express = require('express');
const uploadController = require('../controllers/upload.controller');
const router = express.Router();
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');
//const storage = multer.diskStorage({
//  destination: function(req, file, cb) {
//    cb(null, 'public/uploads')
//  },
//  filename: function(req, file, cb) {
//    console.log(file)
//    cb(null, file.originalname)
//  }
//})
//const upload = multer({storage});



router.post('/',upload.single('document'), uploadController.upload );
router.post('/cloud', upload.single('document'),  (req, res)=>{

	cloudinary.uploader.upload(req.file.path, {folder:"CHURCH CMS", use_filename: true}).then(data=>{
	 return res.status(200).send({data: {url: data.url}, message: "Success, File uploaded"});
	}).catch((error)=>{
	 return res.status(500).send(error);
	})
})

module.exports = router;
