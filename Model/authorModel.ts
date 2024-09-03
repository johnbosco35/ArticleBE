/** @format */

import mongoose, { Schema, model } from "mongoose";
import { iAuthorData } from "../Utils/interfaces";

const AuthorSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
      toLowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    chosen: [
      {
        type: mongoose.Types.ObjectId,
        ref: "categorys",
      },
    ],
    avatarID: {
      type: String,
    },
    article: [
      {
        type: mongoose.Types.ObjectId,
        ref: "articles",
      },
    ],
    friends: {
      type: Array<String>,
    },
    requests: {
      type: Array<String>,
    },
    resetPin: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const AuthorModel = model<iAuthorData>("authors", AuthorSchema);
