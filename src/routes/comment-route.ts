import { Hono } from "hono";
import * as commentController from "../controllers/comment-controller";
import { validateData } from "../middleware/validation-middleware";
import { commentSchema } from "../validations/comment";

export const commentRoute = () => {
  const router = new Hono();

  router.get("/", commentController.getAllComments);
  router.get("/:id", commentController.getCommentById);
  router.post("/", validateData(commentSchema), commentController.createComment);
  router.put("/:id", validateData(commentSchema), commentController.updateComment);
  router.delete("/:id", commentController.deleteComment);

  return router;
};
