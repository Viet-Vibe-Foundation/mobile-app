import { Router } from "express";
import AuthService from "../services/authService";

const router = Router();

router.post("/signin", AuthService.SignIn);
router.post("/signup", AuthService.SignUp);
router.post("/verify-token", AuthService.VerifyToken);

export default router;
