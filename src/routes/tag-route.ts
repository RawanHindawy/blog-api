import { Hono } from "hono";
import * as tagController from "../controllers/tag-controller.ts";
import rateLimit from "../middleware/rate-limiter.ts";
import { validateData } from "../middleware/validation-middleware";
import { tagSchema } from "../validations/tag";

export const tagRoute = () => {
  const router = new Hono();

  router.get("/", tagController.getAllTags);
  router.get("/:id", tagController.getTagById);
  router.post("/", rateLimit(), validateData(tagSchema), tagController.createTag);
  router.put("/:id", validateData(tagSchema), tagController.updateTag);
  router.delete("/:id", tagController.deleteTag);

  return router;
};
