import { Document,model,Schema } from "mongoose";
import { Title } from "../Utils/interfaces";

interface Icate extends Title,Document{}

const Category = new Schema<Title>({
title:{
    type:String
}
})

export default model<Icate>("categorys",Category)