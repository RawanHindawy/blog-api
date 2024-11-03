import { Hono } from "hono";
import * as commentController from "../controllers/comment-controller";

export const commentRoute = () => {
  const router = new Hono();

  router.get("/", commentController.getAllComments);
  router.get("/:id", commentController.getCommentById);
  router.post("/", commentController.createComment);
  router.put("/:id", commentController.updateComment);
  router.delete("/:id", commentController.deleteComment);

  return router;
};
