import express from "express"
import { beFriend, unFriend } from "../Controller/friendsController"

const router = express.Router()

router.route("/:authorID/friendID/be-friend").post(beFriend);
router.route("/:authorID/friendID/un-friend").post(unFriend);

export default router;