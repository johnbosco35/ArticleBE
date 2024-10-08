import { v2 as cloudinary } from "cloudinary"
import { environmentVariable } from "../env/environmemt";

cloudinary.config({
cloud_name : environmentVariable.cloud_name,
api_key : environmentVariable.api_key,
api_secret : environmentVariable.api_secret,
secure : true
})

export default cloudinary;