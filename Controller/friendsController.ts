import { Request , Response } from "express";

import mongoose from "mongoose";
import { AuthorModel } from "../Model/authorModel";

export const beFriend = async (req : Request ,res : Response) =>{
    try {
        const { authorID , friendID } = req.params

        const author : any = await AuthorModel.findById(authorID)
        const friend : any = await AuthorModel.findById(friendID)

        if (author && friend) {
            await author.friends.push(new mongoose.Types.ObjectId(friendID))
            author.save();
            await friend.friends.push(new mongoose.Types.ObjectId(authorID))
            friend.save()

            return res.status(200).json({
                message : "Friends Made Successfully",
            })
        }
    } catch (error) {
        return res.status(400 ).json({
            message : "Error Ceating Friend",
            data : error.message
        })
    }
}

export const unFriend = async (req : Request ,res : Response) =>{
    try {
        const { authorID , friendID } = req.params

        const author : any = await AuthorModel.findById(authorID)
        const friend : any = await AuthorModel.findById(friendID)

        if (author && friend) {
            await author.friends.push(new mongoose.Types.ObjectId(friendID))
            author.save();
            await friend.friends.pull(new mongoose.Types.ObjectId(authorID))
            friend.save()

            return res.status(200).json({
                message : "Friends Made Successfully",
            })
        }
    } catch (error) {
        return res.status(400 ).json({
            message : "Error Ceating Friend",

            data : error.message
        })
    }
}