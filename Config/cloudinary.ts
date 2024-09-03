import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
import { environmentVariable } from "../env/environmemt";
dotenv.config()

cloudinary.config({
cloud_name : environmentVariable.cloud_name,
api_key : environmentVariable.api_key,
api_secret : environmentVariable.api_secret,
secure : true
})

export default cloudinary;