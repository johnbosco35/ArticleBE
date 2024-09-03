import express, {Request , Response} from "express"
import { AuthorModel } from "../Model/authorModel"

export const makeRequest = async (req : Request , res : Response) => {
    try {
        const {authorID , friendID} = req.params

        const author : any = await AuthorModel.findById(authorID)
        const friend : any = await AuthorModel.findById(friendID)

        if (author && friend) {
            friend.requests.push(author)
            friend.save()
        }
        return res.status(200).json({
            message : "Sent Successfully",
            data : author , friend
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Making Request",
            data : error.message
        })
    }
}

export const deleteRequest = async (req : Request , res : Response) => {
    try {
        const {authorID , friendID} = req.params

        const author : any = await AuthorModel.findById(authorID)
        const friend : any = await AuthorModel.findById(friendID)

        if (author && friend) {
            friend.requests.pull(author._id)
            friend.save()
        }
        return res.status(200).json({
            message : "Deleted Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Deleting Request",
            data : error.message
        })
    }
}

export const viewRequest = async (req : Request , res : Response) => {
    try {
      const {authorID} = req.params;
      const author = await AuthorModel.findById(authorID)
      if (author) {
        const data = await AuthorModel.findById(authorID).
        populate({
            path : "requests",
            options : {
                sort : {
                    createdAt : -1
                }
            }
        })
       return res.status(200).json({
        message : "Viewed Successfully",
        data : data
       })
      }
    } catch (error) {
        return res.status(400).json({
            message : "Error Viewing Request",
            data : error.message
        })
    }
}