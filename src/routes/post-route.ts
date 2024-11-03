import { Hono } from "hono";
import * as postController from "../controllers/post-controller";
import { validateData } from "../middleware/validation-middleware";
import { postSchema } from "../validations/post";

export const postRoute = () => {
  const router = new Hono();

  router.get("/", postController.getAllPosts);
  router.get("/:id", postController.getPostById);
  router.post("/", validateData(postSchema), postController.createPost);
  router.put("/:id", validateData(postSchema), postController.updatePost);
  router.delete("/:id", postController.deletePost);

  return router;
};
