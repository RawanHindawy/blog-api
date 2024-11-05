import { Hono } from "hono";
import * as commentController from "../controllers/comment-controller";
import { validateData } from "../middleware/validation-middleware";
import { commentSchema } from "../validations/comment";
import { authMiddleware } from "../middleware/auth-middleware";

export const commentRoute = () => {
  const router = new Hono();

  router.get("/", commentController.getAllComments);
  router.get("/:id", commentController.getCommentById);
  router.post(
    "/",
    authMiddleware,
    validateData(commentSchema),
    commentController.createComment
  );
  router.put(
    "/:id",
    authMiddleware,
    validateData(commentSchema),
    commentController.updateComment
  );
  router.delete("/:id", authMiddleware, commentController.deleteComment);

  return router;
};
