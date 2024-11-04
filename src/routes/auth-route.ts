import { Hono } from "hono";
import * as authController from "../controllers/auth-controller.ts";
// import { authMiddleware } from "../middleware/auth-middleware";
import rateLimit from "../middleware/rate-limiter.ts";
import { validateData } from "../middleware/validation-middleware.ts";
import { loginSchema } from "../validations/LoginSchema.ts";


export const authRoute = () => {
    const router = new Hono();

    router.post("/login", rateLimit(), validateData(loginSchema), authController.login);
    //   router.post("/logout", authMiddleware, authController.logout);
    //   router.post("/register", authController.register);

    return router;
};
