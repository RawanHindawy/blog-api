import { Hono } from "hono";
import * as tagController from "../controllers/tag-controller.ts";
import rateLimit from "../middleware/rate-limiter.ts";

export const tagRoute = () => {
  const router = new Hono();

  router.get("/", tagController.getAllTags);
  router.get("/:id", tagController.getTagById);
  router.post("/", rateLimit(), tagController.createTag);
  router.put("/:id", tagController.updateTag);
  router.delete("/:id", tagController.deleteTag);

  return router;
};
