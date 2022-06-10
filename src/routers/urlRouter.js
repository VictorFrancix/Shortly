import { Router } from "express";

import { validateToken } from "../middlewares/tokenMiddleware.js";
import { createShortUrl } from "./../controllers/urlsController.js"
import { validate } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, validate(urlSchema), createShortUrl)

export default urlRouter;