import { Hono } from "hono";
import * as categoryController from "../controllers/category-controller";
import { validateData } from "../middleware/validation-middleware";
import { categorySchema } from "../validations/category";
import { authMiddleware } from "../middleware/auth-middleware";

export const categoryRoute = () => {
  const router = new Hono();

  router.get("/", categoryController.getAllCategories);
  router.get("/:id", categoryController.getCategoryById);
  router.post(
    "/",
    authMiddleware,
    validateData(categorySchema),
    categoryController.createCategory
  );
  router.put(
    "/:id",
    authMiddleware,
    validateData(categorySchema),
    categoryController.updateCategory
  );
  router.delete("/:id", authMiddleware, categoryController.deleteCategory);

  return router;
};
