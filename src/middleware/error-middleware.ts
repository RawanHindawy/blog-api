import type{ Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const errorHandler = (err: Error, c: Context) => {
  console.error('Error:', err);

  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message,
        status: err.status,
      },
      err.status
    );
  }

  if (err.message.includes('not found')) {
    return c.json(
      {
        message: 'Resource not found',
        status: 404,
      },
      404
    );
  }

  if (err.message.includes('unauthorized') || err.message.includes('invalid token')) {
    return c.json(
      {
        message: 'Unauthorized',
        status: 401,
      },
      401
    );
  }

  if (err.message.includes('forbidden') || err.message.includes('not allowed')) {
    return c.json(
      {
        message: 'Forbidden',
        status: 403,
      },
      403
    );
  }

  return c.json(
    {
      message: 'Internal Server Error',
      status: 500,
    },
    500
  );
};
