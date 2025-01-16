//the file contain all the logic wich is belog to  the clodnary api
//using this service we gonna get the imagage adding services
import {v2 as cloudnary} from "cloudinary"
import {config} from "dotenv"

config()

//config the cloudnary
cloudnary.config({
    cloud_name: process.env.CLOUDNINARY_CLOUD_NAME,
    api_key: process.env.CLOUDNINARY_API_KEY,
    api_secret: process.env.CLOUDNINARY_API_SECRET
})

export default cloudnary;