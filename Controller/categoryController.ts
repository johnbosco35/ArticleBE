import { Request,Response } from "express";
import categoryModel from "../Model/categoryModel";


export const createCategory = async(req:Request,res:Response)=>{
    const {title} = req.body
try {
    const category = await categoryModel.create({
        title
    })
   return res.status(200).json({
        message:"Created",
        data:category
    })
} catch (error) {
   return res.status(400).json({
        message:"An error occured"
    })
}
}

export const getCategory = async(req:Request,res:Response)=>{
try {
    const category = await categoryModel.find()
   return res.status(200).json({
        message:"Found",
        data:category
    })
} catch (error) {
   return res.status(400).json({
        message:"An error occured"
    })
}
}

