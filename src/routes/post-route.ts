import { Hono } from "hono";
import * as postController from "../controllers/post-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { validateData } from "../middleware/validation-middleware";
import { postSchema } from "../validations/post";

export const postRoute = () => {
  const router = new Hono();

  router.get("/", postController.getAllPosts);
  router.get("/:id", postController.getPostById);
  router.post(
    "/",
    authMiddleware,
    validateData(postSchema),
    postController.createPost
  );
  router.put(
    "/:id",
    authMiddleware,
    validateData(postSchema),
    postController.updatePost
  );
  router.delete("/:id", authMiddleware, postController.deletePost);

  return router;
};
