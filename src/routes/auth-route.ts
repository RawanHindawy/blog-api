import { Hono } from "hono";
import * as authController from "../controllers/auth-controller.ts";
import rateLimit from "../middleware/rate-limiter.ts";
import { validateData } from "../middleware/validation-middleware.ts";
import { loginSchema } from "../validations/Login.ts";
import { registerSchema } from "../validations/register.ts";

export const authRoute = () => {
  const router = new Hono();

  router.post(
    "/login",
    rateLimit(),
    validateData(loginSchema),
    authController.login
  );
  router.post("/logout", authController.logout);
  router.post(
    "/register",
    rateLimit(),
    validateData(registerSchema),
    authController.register
  );

  return router;
};
