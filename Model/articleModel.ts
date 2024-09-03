import mongoose, { Schema, model } from "mongoose"
import { iArticleData } from "../Utils/interfaces"


const ArticleSchema : Schema = new Schema({
    title : {
        type : String
    },
    content : {
        type : String,
        unique : true,
        toLowercase : true,
        trim : true
    },
    description : {
        type : String
    },
    avatar : {
        type : String
    },
    avatarID : {
        type : String
    },
    coverImage : {
        type : String
    },
    coverImageID : {
        type : String
    },
    ratings : [
        {
            type : mongoose.Types.ObjectId,
            ref : "ratings"
        }
    ],
    likes: [
        { 
            type: mongoose.Types.ObjectId,
         ref: "authors" 
        }
        ] ,
    rate : {
        type : Number
    },
    authorID : {
        type : String
    },
    category: {
        type : String
    },
    author : [
        {
            type : mongoose.Types.ObjectId,
            ref : "authors"
        }
    ]
} , {timestamps : true})

export const ArticleModel = model <iArticleData> ("articles" , ArticleSchema)