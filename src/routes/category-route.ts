import { Hono } from "hono";
import * as categoryController from "../controllers/category-controller";
import { validateData } from "../middleware/validation-middleware";
import { categorySchema } from "../validations/category";

export const categoryRoute = () => {
  const router = new Hono();

  router.get("/", categoryController.getAllCategories);
  router.get("/:id", categoryController.getCategoryById);
  router.post("/", validateData(categorySchema), categoryController.createCategory);
  router.put("/:id", validateData(categorySchema), categoryController.updateCategory);
  router.delete("/:id", categoryController.deleteCategory);

  return router;
};
