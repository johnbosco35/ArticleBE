import { Router } from "express";
import { createCategory, getCategory } from "../Controller/categoryController";

const router = Router()

router.post("/category", createCategory)
router.get("/get-category", getCategory)

export default router;