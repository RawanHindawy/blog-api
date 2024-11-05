# Blog API

A RESTful API for managing a blog system built with Hono and Bun.

## Features

- Category management
- Post management
- Comment system
- Tag system
- Rate limiting
- Error handling

## Prerequisites

- [Bun](https://bun.sh) runtime (v1.1.33 or higher)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration.

## Database Installation

pull the docker image

```bash
docker pull postgres

# start the container

docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres

```

## Redis Installation

pull the Redis image

```bash
docker pull redis

# start the container

docker run -it --rm --link my-redis:redis redis redis-cli -h redis
```

## Database Generate Migrations

```bash
bun run db:generate
```

or

```bash
bun run db:migrate
```

## Usage

### Development

Run the development server:

```bash
bun run dev
```

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments

- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add comment to a post
- `GET /api/comments/:id` - Get comment by ID
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create a new tag
- `GET /api/tags/:id` - Get tag by ID
- `PUT /api/tags/:id` - Update tag
- `DELETE /api/tags/:id` - Delete tag
