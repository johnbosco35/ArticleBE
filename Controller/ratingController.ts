import { Request , Response } from "express"
import { AuthorModel } from "../Model/authorModel";
import {ArticleModel} from "../Model/articleModel"
import { RatingModel } from "../Model/ratingModel"
import mongoose from "mongoose";

export const createRatings = async (req : Request , res : Response) =>{
    try {
        const {authorID , articleID} = req.params;
        const {rate}  = req.body

        const author = await AuthorModel.findById(authorID)
        const article : any= await ArticleModel.findById(articleID)

        const rating : any = await RatingModel.create({
            rate,
            ratedBy : author?._id,
            article
        })
        article?.ratings?.push(new mongoose.Types.ObjectId(rating._id!))
        article!.save()
        
        return res.status(201).json({
            message : "Created Rating Successfully",
            data : rating
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Creating Rating"
        })
    }
}

export const readRatings = async (req : Request , res : Response) =>{
    try {
        const {articleID} = req.body
        const rating : any = await ArticleModel.findById(articleID).populate({
            path : "ratings"
        })
        
        return res.status(201).json({
            message : "Created Rating Successfully",
            data : rating.ratings
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Creating Rating"
        })
    }
}

export const rateArticle = async (req : Request , res : Response) =>{
    try {
        const {rate} = req.body
        const { authorID , articleID} = req.params;
        const author = await AuthorModel.findById(authorID)
        const article : any = await ArticleModel.findById(articleID).populate({
            path : "ratings"
        })
        let totalRate = article.ratings.length;
        let totalScore = article.ratings
        .map((el : any)=>{
            return el.rate;
        })
        .reduce((a: number , b : number) => {
            return a + b;
        })
        let averageRate = totalScore / totalRate;

        const rated = await ArticleModel.findByIdAndUpdate(
            articleID,
            {
                rate : parseFloat (averageRate.toFixed(2))
            },
            {new : true}
        )
        return res.status(200).json({
            message : "Created Rating Successfully",
            data : rated
        })

    } catch (error) {
        return res.status(400).json({
            message : "Error Rating Article",
            data : error.message
        })
    }
}