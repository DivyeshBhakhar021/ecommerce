const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "ddgtv4sih", 
    api_key: "898435225257456", 
    api_secret:  process.env.CLOUDINARYSECRET
});

const  fileupload = async (filepath,foldername) =>{
    try {
        const uploadResult = await cloudinary.uploader.upload(filepath, {
            folder: foldername,
        }).catch((error)=>{console.log(error)});
        
        console.log(uploadResult);
        
        return uploadResult
        
    } catch (error) {
        
    }
}

module.exports = fileupload