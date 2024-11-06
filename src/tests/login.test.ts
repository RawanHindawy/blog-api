import { Hono } from "hono";
import { testClient } from "hono/testing";

it("login test", async () => {
  const app = new Hono().post("/login", (c) =>
    c.json({ success: true, token: "fake-token" })
  );
  const res = await testClient(app).login.$post({
    json: {
      username: "testuser",
      password: "password123",
    },
  });

  expect(await res.json()).toEqual({
    success: true,
    token: "fake-token",
  });
});

it("should handle invalid credentials", async () => {
  const app = new Hono().post("/login", (c) =>
    c.json({ success: false, message: "Invalid credentials" }, 401)
  );

  const res = await testClient(app).login.$post({
    json: {
      username: "wronguser",
      password: "wrongpass",
    },
  });

  expect(res.status).toBe(401);
  expect(await res.json()).toEqual({
    success: false,
    message: "Invalid credentials",
  });
});
