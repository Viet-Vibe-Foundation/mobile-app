import { Router } from "express";
import PostService from "../services/postService";

const router = Router();

router.get("/", PostService.getPosts);
router.get("/post", PostService.getPostById);

export default router;
