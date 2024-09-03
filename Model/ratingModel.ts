import mongoose, { Schema, model } from "mongoose"
import { iRatingData } from "../Utils/interfaces"

const RatingSchema : Schema = new Schema({
    rate : {
        type : Number
    },
    ratedBy : {
        type : String,
    },
    article : {
        type : mongoose.Types.ObjectId,
        ref : "articles"
    }
} , {timestamps : true})


export const RatingModel = model <iRatingData> ("ratings" , RatingSchema)