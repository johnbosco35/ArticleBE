

import mongoose from "mongoose";
import { environmentVariable } from "../env/environmemt";


// const Db_String: string = process.env.URL2!;
// const Db_String: string = process.env.URL2 || "mongodb://localhost:27017/DB";
// const Db_String = "mongodb://localhost/ArticleDB";
const Db_String:any = environmentVariable.database

export const DBconnect = async () => {
  try {
    const connect = mongoose.connect(Db_String)
    console.log(`DB is now ON`)
  } catch (error:any) {
    console.log(error);
  }
};

