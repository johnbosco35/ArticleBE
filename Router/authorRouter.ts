/** @format */

import { Router } from "express";
import {
  chooseCategory,
  createAuthor,
  deleteOneAuthor,
  findAuthors,
  findOneAuthor,
  forgotPassword,
  signInAuthor,
  updateOneAuthor,
} from "../Controller/authorController";
import { uploads } from "../Config/multer";

const router = Router();

router.route("/sign-up").post(uploads, createAuthor);
router.route("/sign-in").post(signInAuthor);
router.route("/sendpin").get(forgotPassword);
router.route("/find-authors").get(findAuthors);
router.route("/:authorID/find-one-author").get(findOneAuthor);
router.route("/:authorID/update-author").patch(updateOneAuthor);
router.route("/:authorID/delete-author").delete(deleteOneAuthor);
router.route("/:authorID/:categoryID/chosen").patch(chooseCategory);

export default router;
