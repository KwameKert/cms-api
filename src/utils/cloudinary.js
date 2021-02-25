const cloudinary = require('cloudinary').v2

 cloudinary.config({
    cloud_name: "kwamekert",
    api_key: "646696376422633",
    api_secret: "XJ0tOLPRIXmpW7VK-_CnGA0QGY0"
  });


module.exports = cloudinary;
