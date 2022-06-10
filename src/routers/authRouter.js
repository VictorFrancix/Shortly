import { Router } from "express";
import { signIn } from "./../controllers/authController.js";
import { validateSignIn } from "./../middlewares/authMiddleware.js";
const authRouter = Router();

authRouter.post('/signin',validateSignIn, signIn);

export default authRouter;