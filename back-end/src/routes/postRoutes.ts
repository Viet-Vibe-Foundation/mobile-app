import { Router } from "express";
import PostService from "../services/postService";

const router = Router();

router.get("/", PostService.getPosts);
router.get("/search", PostService.searchPost);
router.get("/:postId", PostService.getPostById);

export default router;
