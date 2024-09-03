
import mongoose from "mongoose";

export interface iArticle {
  title?: string;
  content?: string;
  image?: string;
  imageID?: string;
  coverImage?: string;
  coverImageID?: string;
  description?: string;
  authorID?: string;
  ratings: [];
  likes?: [];
  author: {};
  rate: number;
  category: string;
}

export interface Title {
  title?: string;
}

export interface iAuthor {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  article: {}[];
  friends: [];
  requests: [];
  chosen: [];
  resetPin?: number | undefined;
}

export interface iRating {
  rate: number;
  ratedBy: string;
  author: {};
}

export interface iRatingData extends iRating, mongoose.Document {}

export interface iAuthorData extends iAuthor, mongoose.Document {}

export interface iArticleData extends iArticle, mongoose.Document {}
