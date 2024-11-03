import { Hono } from "hono";
import * as postController from "../controllers/post-controller";

export const postRoute = () => {
  const router = new Hono();

  router.get("/", postController.getAllPosts);
  router.get("/:id", postController.getPostById);
  router.post("/", postController.createPost);
  router.put("/:id", postController.updatePost);
  router.delete("/:id", postController.deletePost);

  return router;
};
