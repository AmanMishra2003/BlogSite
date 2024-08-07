const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_APIKEY,
    api_secret : process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'BlogSiteCodeSoft/BlogImage',
    },
    allowedFormats : ['png' , 'jpeg', 'jpg']
  });

module.exports = {
    storage,
    cloudinary
}