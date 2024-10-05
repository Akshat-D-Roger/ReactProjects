import {v2 as cloudinary} from 'cloudinary'

async function connectToCloudinary(){
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET_KEY
    })
    console.log('connected to cloudinary')
}

export {connectToCloudinary}