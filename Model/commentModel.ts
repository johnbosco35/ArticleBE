import mongoose, { Schema }  from "mongoose";

export interface iComment {
    comments? : string;
    article? : string;
    likes? : string;
    userName? : string
}

interface iCommentData extends iComment , mongoose.Document{}

export const commentSchema : Schema = new Schema ({
    comments : {
        type : String
    },
    article : {
        type : String
    },
    likes : {
        type : String
    },
    userName : {
        type : String
    },
}) 