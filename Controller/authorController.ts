/** @format */

import { Request, Response } from "express";
import { AuthorModel } from "../Model/authorModel";
import bcrypt from "bcrypt";
import cloudinary from "../Config/cloudinary";
import categoryModel from "../Model/categoryModel";
import mongoose from "mongoose";
import { Mailer } from "../Config/mailer";

export const createAuthor = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req!.file!.path!
    );
    const user = await AuthorModel.create({
      name,
      email,
      password: hash,
      avatar: secure_url,
      avatarID: public_id,
    });
    return res.status(200).json({
      message: "Created Author Successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      messsage: "Error Creating Author",
      data: error.message,
    });
  }
};

export const chooseCategory = async (req: Request, res: Response) => {
  try {
    const { authorID, categoryID } = req.params;
    const author: any = await AuthorModel.findById(authorID);
    const category: any = await categoryModel.findById(categoryID);

    if (author) {
      const pushed = author?.chosen?.push(
        new mongoose.Types.ObjectId(category?._id)
      );

      if (pushed) {
        res.status(400).json({
          message: "Pushed already",
        });
      }

      author?.save();
    }
    return res.status(200).json({
      message: "Successfully chosen",
      data: author,
    });
  } catch (error: any) {
    return res.status(400).json({
      messsage: "Error Creating Author",
      data: error.message,
    });
  }
};

export const findAuthors = async (req: Request, res: Response) => {
  try {
    const author = await AuthorModel.find()
      .sort({
        createdAt: -1,
      })
      .populate("article")
      .populate("requests");
    return res.status(200).json({
      message: "Found Author Succssfully",
      data: author,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error Finding Author",
      error: error.message,
    });
  }
};

export const findOneAuthor = async (req: Request, res: Response) => {
  try {
    const { authorID } = req.params;
    const author = await AuthorModel.findById(authorID);
    return res.status(200).json({
      message: "Found One Author Successfully",
      data: author,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Finding One Author",
      data: error.message,
    });
  }
};

export const updateOneAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { authorID } = req.params;
    const author = await AuthorModel.findByIdAndUpdate(
      authorID,
      { name },
      { new: true }
    );
    return res.status(201).json({
      message: "Updated Author Successfully",
      data: author,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Updating Author",
      data: error.message,
    });
  }
};

export const deleteOneAuthor = async (req: Request, res: Response) => {
  try {
    const { authorID } = req.params;
    const author = await AuthorModel.findByIdAndDelete(authorID);
    return res.status(201).json({
      message: "Deleted Author Successfully",
      data: author,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Deleting Author",
    });
  }
};

export const signInAuthor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { authorID } = req.params;
    const author = await AuthorModel.findOne({ email });
    if (author) {
      const checkPassword = await bcrypt.compare(password, author.password);
      if (checkPassword) {
        return res.status(200).json({
          message: "Signed In User Successfully",
          data: author,
        });
      }
    } else {
      return res.status(404).json({
        message: "Author Not Found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error Signing In Author",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const author = await AuthorModel.findOne({ email });

    if (!author) {
      return res.send("user not found");
    }
    const pin: number = Math.floor(Math.random() * 123456);

    const subject = "Passsword reset Pin";
    const text = `Your password reset pin is <h2>${pin}</h2>`;

    Mailer(email, subject, text);

    author!.resetPin! = pin;

    return res.status(200).json({
      message: "Pin sent",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error sending Pin",
    });
  }
};
