import { Request , Response } from "express"
import { AuthorModel } from "../Model/authorModel"
import mongoose from "mongoose"
import { ArticleModel } from "../Model/articleModel"
import cloudinary from "../Config/cloudinary"

export const createArticle = async (req : any , res : Response)=>{
    try {
        const {authorID} = req.params
        const {title , content , description,category} = req.body
        const author = await AuthorModel.findById(authorID);

        const {secure_url ,public_id} = await cloudinary.uploader.upload(req!.file!.path!)

        const article = await ArticleModel.create({
            title , content , description , avatar : secure_url ,avatarID : public_id,category
        });
        author?.article.push(new mongoose.Types.ObjectId(article._id));
        author?.save()
        return res.status(200).json({
            message : "Created Article Successfully",
            data : article
        })
    } catch (error : any) {
        return res.status(400).json({
            message : "Error Creating Article",
            data : error.message
        })
    }
}

export const likePost = async (req : Request , res : Response) => {
    try {
        const {authorID , articleID} = req.params;
        const author : any = await AuthorModel.findById(authorID)
        const article : any = await ArticleModel.findById(articleID)


        if (author) {
            article?.likes?.push(new mongoose.Types.ObjectId(author._id))
            article?.save()
            return res.status(200).json({
                message : "Good",
                data : article
            })
        }
    } catch (error) {
        return res.status(400).json({
            message : "Error"
        })
    }
}

export const unlikePost = async (req : Request , res : Response) => {
    try {
        const {authorID , articleID} = req.params
        const author : any = await AuthorModel.findById(authorID)
        const article : any = await ArticleModel.findById(articleID)

        if (author) {
            article?.likes?.pull(new mongoose.Types.ObjectId(author._id))
            article?.save()
            return res.status(200).json({
                message : "Alright",
                data : article
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error",
            data : error.message
        })
    }
}

export const deleteOnePost = async (req : Request , res : Response)=>{
    try {
        const { articleID } = req.params
        const article = await ArticleModel.findByIdAndDelete(articleID)
        return res.status(200).json({
            message : "Deleted Article Successfully",
            data : article
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Deleting Article",
            data : error.message
        })
    }
}

export const getAuthorArticle = async (req : Request , res : Response)=>{
    try {
        const {authorID} = req.params

        const article = await AuthorModel.findById(authorID).populate({
            path : "article",
            options : {
                sort : {
                    createdAt : -1
                }
            }
        });
        return res.status(200).json({
            message : "Viewed Author Article Successfully",
            data : article
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Getting Author Article",
            data : error.message
        })
    }
}

export const getAllArticles = async (req : Request , res : Response) =>{
    try {
        const articles = await ArticleModel.find()
        return res.status(200).json({
            message : "Viewed All Articles Successfully",
            data : articles
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Getting All Articles"
        })
    }
}

export const getFriendArticles = async (req : Request , res : Response) => {
    try {
        const {authorID} = req.params;

        const authors : any= await AuthorModel.findById(authorID)
        const article : any = await ArticleModel.find();

        const author = await AuthorModel.findById(authorID).populate({
            path : "articles",
            options : {
                sort : {
                    createdAt : -1
                }
            }
        })
        const data = article.filter((el : any)=>
            authors?.friends!.includes(el.authorID)
        )
        return res.status(201).json({
            message : "Author's Article",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Getting Friend's Articles",
            data : error.message
        })
    }
}

export const getOneArticle = async (req : Request , res : Response) => {
    try {
        const {articleID} = req.params
        const article = await ArticleModel.findById(articleID)
        return res.status(200).json({
            message : "Gotten One Article Successfully",
            data : article
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Getting One Post",
            data : error.message
        })
    }
}