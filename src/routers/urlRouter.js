import { Router } from "express";

import { validateToken } from "../middlewares/tokenMiddleware.js";
import { createShortUrl, findShortUrl } from "./../controllers/urlsController.js"
import { validate } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, validate(urlSchema), createShortUrl);
urlRouter.get("/urls/:id", findShortUrl)

export default urlRouter;