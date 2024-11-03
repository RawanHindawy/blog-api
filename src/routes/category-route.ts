import { Hono } from "hono";
import * as categoryController from "../controllers/category-controller";

export const categoryRoute = () => {
  const router = new Hono();

  router.get("/", categoryController.getAllCategories);
  router.get("/:id", categoryController.getCategoryById);
  router.post("/", categoryController.createCategory);
  router.put("/:id", categoryController.updateCategory);
  router.delete("/:id", categoryController.deleteCategory);

  return router;
};
