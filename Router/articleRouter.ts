import { Router } from "express";
import { createArticle, getAllArticles, getAuthorArticle, getFriendArticles, getOneArticle, likePost, unlikePost } from "../Controller/articleController";
import { uploads } from "../Config/multer";
import { chooseCategory } from "../Controller/authorController";

const router = Router()

router.route("/:authorID/:categoryID/create-article").post(uploads,createArticle)
router.route("/:authorID/read-article").get(getAuthorArticle)
router.route("/:articleID/read-one-article").get(getOneArticle)
router.route("/read-all-articles").get(getAllArticles)
router.route("/:id/read-friend-articles").get(getFriendArticles)
router.route("/:authorID/:articleID/like").patch(likePost)
router.route("/:authorID/:articleID/unlike").patch(unlikePost)


export default router