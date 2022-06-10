import { Router } from "express";
import { signIn } from "./../controllers/authController.js";
import { validate } from "./../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/authSchema.js";
import { userSchema } from "../schemas/userSchema.js";
import { createUser } from "../controllers/userController.js";
import { validatePassword } from "../middlewares/userMiddleware.js";


const authRouter = Router();

authRouter.post('/signin',validate(loginSchema), signIn);
authRouter.post('/signup', validate(userSchema), validatePassword, createUser );

export default authRouter;