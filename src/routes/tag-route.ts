import { Hono } from "hono";
import * as tagController from "../controllers/tag-controller.ts";
import { validateData } from "../middleware/validation-middleware";
import { tagSchema } from "../validations/tag";
import { authMiddleware } from "../middleware/auth-middleware";

export const tagRoute = () => {
  const router = new Hono();

  router.get("/", tagController.getAllTags);
  router.get("/:id", tagController.getTagById);
  router.post(
    "/",
    authMiddleware,
    validateData(tagSchema),
    tagController.createTag
  );
  router.put(
    "/:id",
    authMiddleware,
    validateData(tagSchema),
    tagController.updateTag
  );
  router.delete("/:id", authMiddleware, tagController.deleteTag);

  return router;
};
