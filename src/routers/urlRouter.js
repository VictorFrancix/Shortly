import { Router } from "express";

import { validateToken } from "../middlewares/tokenMiddleware.js";
import { createShortUrl, findShortUrl, openUrl, deleteUrl, findShortsUsers } from "./../controllers/urlsController.js"
import { validate } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, validate(urlSchema), createShortUrl);
urlRouter.get("/urls/:id", findShortUrl);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.delete("/urls/:id", validateToken, deleteUrl);
urlRouter.get("/users/:id", validateToken, findShortsUsers)
export default urlRouter;