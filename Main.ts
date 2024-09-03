import express, { Application  , Request , Response} from "express"
import mongoose from "mongoose"
import cors from "cors"
import article from "./Router/articleRouter"
import author from "./Router/authorRouter"
import category from "./Router/categoryRouter"
import request from "./Router/requestRouter"

const appConfig = async (app : Application)=>{
    app
    .use(cors())
    .use(express.json())
    .use("/api/v1/author" , author)
    .use("/api/v1/article" , article)
    .use("/api/v1/cate", category)
    .use("/api/v1/request", request)
    .get("/" , (req : Request , res : Response)=>{
        try {
            return res.status(200).json({
                message : "Good to Go!!!"
            })
        } catch (error) {
            return res.status(404).json({
                message : "Root Error"
            })
        }
    })
}

export default appConfig