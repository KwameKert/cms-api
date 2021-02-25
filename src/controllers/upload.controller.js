 const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


async function upload(req, res){
    try{
        console.log(process.env.API_KEY);
        const path = req.file.path;
        console.log("path", path)
        const uniqueFilename = new Date().toISOString();
        cloudinary.uploader
                  .upload(path,
                        {public_id: `CHURCH CMS/${uniqueFilename}`})
                  .then((result)=>{
                      return res.status(200).send({data:result, message: "File Uploaded"})        
                  }).catch(error=>{
                    res.status(500).send({error, message: "Failure"})
                  })

    }catch(error){
        console.error(error);
        res.status(500).send({message: error.message});
    }

}
  




module.exports = {
    upload

}
