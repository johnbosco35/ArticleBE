import {Router} from "express"
import { deleteRequest, makeRequest, viewRequest } from "../Controller/requestController"


const router = Router()

router.route("/:authorID/:friendID/make-request").post(makeRequest)
router.route("/:authorID/view-request").get(viewRequest)
router.route("/:authorID/:friendID/delete-request").post(deleteRequest)

export default router;