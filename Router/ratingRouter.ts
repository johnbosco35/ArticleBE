import express from "express"
import { createRatings, rateArticle, readRatings } from "../Controller/ratingController"

const router = express.Router()

router.route ("/:authorID/articleID/rate-article").post(createRatings);
router.route ("/:articleID/read-article-rate").post(readRatings);
router.route ("/:articleID/average-article-rate").patch(rateArticle);

export default router;