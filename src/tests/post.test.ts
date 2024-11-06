import { Hono } from "hono";
import { testClient } from "hono/testing";

it("should return 400 when creating post without required fields", async () => {
  const app = new Hono().post("/posts", async (c) => {
    const body = await c.req.json();
    if (!body || !body.title || !body.content) {
      return c.json({ message: "Title and content are required" }, 400);
    }
    return c.json({}, 201);
  });

  const res = await testClient(app).posts.$post({
    json: { title: "Test Post" }, // missing content
  });

  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({
    message: "Title and content are required",
  });
});

it("should return 400 when updating post with invalid id or missing fields", async () => {
  const app = new Hono().put("/posts/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ message: "Invalid post ID" }, 400);
    }
    const body = await c.req.json();
    if (!body || !body.title || !body.content) {
      return c.json({ message: "Title and content are required" }, 400);
    }
    return c.json({});
  });

  const res = await testClient(app).posts[":id"].$put({
    param: { id: "invalid" },
  });

  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({
    message: "Invalid post ID",
  });
});

it("should return 400 when deleting post with invalid id", async () => {
  const app = new Hono().delete("/posts/:id", (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ message: "Invalid post ID" }, 400);
    }
    return c.json({ message: "Post deleted successfully" });
  });

  const res = await testClient(app).posts[":id"].$delete({
    param: { id: "invalid" },
  });

  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({
    message: "Invalid post ID",
  });
});

it("should return 401 when creating post without authorization", async () => {
  const app = new Hono().post("/posts", async (c) => {
    const auth = c.req.header("Authorization");
    if (!auth) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const body = await c.req.json();
    if (!body || !body.title || !body.content) {
      return c.json({ message: "Title and content are required" }, 400);
    }
    return c.json({}, 201);
  });

  const res = await testClient(app).posts.$post({
    json: { title: "Test Post", content: "Test Content" },
  });

  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({
    message: "Unauthorized",
  });
});

it("should return 401 when updating post without authorization", async () => {
  const app = new Hono().put("/posts/:id", async (c) => {
    const auth = c.req.header("Authorization");
    if (!auth) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ message: "Invalid post ID" }, 400);
    }
    const body = await c.req.json();
    if (!body || !body.title || !body.content) {
      return c.json({ message: "Title and content are required" }, 400);
    }
    return c.json({});
  });

  const res = await testClient(app).posts[":id"].$put({
    param: { id: "1" },
  });

  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({
    message: "Unauthorized",
  });
});

it("should return 401 when deleting post without authorization", async () => {
  const app = new Hono().delete("/posts/:id", async (c) => {
    const auth = c.req.header("Authorization");
    if (!auth) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ message: "Invalid post ID" }, 400);
    }
    return c.json({ message: "Post deleted successfully" });
  });

  const res = await testClient(app).posts[":id"].$delete({
    param: { id: "1" },
  });

  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({
    message: "Unauthorized",
  });
});

it("should create post with valid authorization", async () => {
  const app = new Hono();

  app.post("/posts", async (c) => {
    const auth = c.req.header("Authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    try {
      const body = await c.req.json();
      if (!body?.title || !body?.content) {
        return c.json({ message: "Title and content are required" }, 400);
      }
      return c.json({ message: "Post created" }, 201);
    } catch (error) {
      return c.json({ message: error }, 400);
    }
  });

  app.post("/login", async (c) => {
    try {
      const body = await c.req.json();
      if (!body?.username || !body?.password) {
        return c.json({ message: "Username and password required" }, 400);
      }
      return c.json({ token: "fake-token" });
    } catch (error) {
      return c.json({ message: error }, 400);
    }
  });

  // First make the login request
  const loginRes = await app.request("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "testuser",
      password: "password123",
    }),
  });

  expect(loginRes.status).toBe(200);
  const { token } = await loginRes.json();
  expect(token).toBe("fake-token");

  // Then make the posts request with the token
  const postRes = await app.request("/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Test Post",
      content: "Test Content",
    }),
  });

  expect(postRes.status).toBe(201);
});
