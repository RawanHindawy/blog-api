import { Hono } from "hono";
// import { authRoute } from "./auth-route";
import { categoryRoute } from "./category-route";
import { postRoute } from "./post-route";
import { commentRoute } from "./comment-route";
import { tagRoute } from "./tag-route";

const mainRouter = () => {
  const app = new Hono();

  // app.route("/auth", authRoute());
  app.route("/categories", categoryRoute());
  app.route("/posts", postRoute());
  app.route("/comments", commentRoute());
  app.route("/tags", tagRoute());

  return app;
};

export default mainRouter;
