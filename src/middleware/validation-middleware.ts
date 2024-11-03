import { ZodError, ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";
import type { Context, Next } from "hono";

export function validateData(schema: ZodSchema) {
  return async (c: Context, next: Next) => {
    try {
      const validatedData = await schema.parseAsync(await c.req.json());
      c.set("validatedBody", validatedData);

      await next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          path: issue.path.join("."),
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        return c.json(
          {
            success: false,
            error: "Invalid data",
            details: errorMessages,
          },
          StatusCodes.BAD_REQUEST
        );
      } else {
        return c.json(
          { success: false, error: "Internal Server Error" },
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }
  };
}
