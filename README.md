# Prisma ORM Playground

A comprehensive Prisma ORM learning playground with PostgreSQL — covering models, relationships, CRUD operations, transactions, raw queries, and more.

---

## Schema Overview

```prisma
User    ──1:1──► Profile
  │
  ├──1:N──► Post (WrittenPosts)
  ├──M:N──► Post (FavoritePosts)
  └──1:N──► Category

Post    ──N:1──► User (author)
  ├──N:1──► Category
  └──M:N──► User (favoriteBy)
```

### Models

| Model    | Fields                                                                 |
| -------- | ---------------------------------------------------------------------- |
| **User**    | `id` (uuid), `name`, `phone`, `email` (unique), `role` (USER / ADMIN)  |
| **Profile** | `id` (uuid), `bio`?, `emailUpdates`, `userId` (unique FK → User)       |
| **Category**| `id` (uuid), `name`, `userId`? (FK → User)                             |
| **Post**    | `id` (uuid), `title`, `rating`, `createdAt`, `updatedAt`, `authorId`, `favoriteById`?, `categoryId`? |

### Relationships Demonstrated

| Type         | Relationship                                  | Field Name            |
| ------------ | --------------------------------------------- | --------------------- |
| **1:1**      | User → Profile                                | `profile`             |
| **1:N**      | User → Post (as author)                       | `WrittenPosts`        |
| **1:N**      | User → Category                               | `categories`          |
| **1:N**      | Category → Post                               | `posts`               |
| **M:N**      | User ↔ Post (favorites)                       | `favoritePosts` / `favoriteBy` |

### Unique Constraints & Indexes

- `@@unique([name, phone])` on User
- `@@index([email])` on User
- `@unique` on `email`
- `@unique` on `Profile.userId`

---

## Quick Start

### 1. Setup

```bash
# Install dependencies
npm install

# Copy env and update your database URL
cp .env.example .env
# Edit .env → DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### 2. Seed

```bash
npm run seed
```

### 3. Run examples

```bash
npx tsx src/examples/01-basic-create.ts
npx tsx src/examples/02-basic-read.ts
npx tsx src/examples/04-relationships.ts
# ... etc
```

### 4. Prisma Studio

```bash
npx prisma studio
```

---

## Examples Index

| File                                      | Topic                         |
| ----------------------------------------- | ----------------------------- |
| `src/examples/01-basic-create.ts`         | Create: User, Profile, Category, Post |
| `src/examples/02-basic-read.ts`           | findMany, findUnique, filtering, pagination, select |
| `src/examples/03-update-delete.ts`        | update, upsert, delete, deleteMany |
| `src/examples/04-relationships.ts`        | Nested writes, include, relational filters |
| `src/examples/05-many-to-many.ts`         | Implicit M:N (favorites), connect/disconnect |
| `src/examples/06-aggregate-grouping.ts`   | avg, count, max, min, groupBy |
| `src/examples/07-transactions.ts`         | Interactive transactions |
| `src/examples/08-raw-queries.ts`          | $queryRaw, $executeRaw |

---

## Scripts

| Script              | Description                     |
| ------------------- | ------------------------------- |
| `npm run seed`      | Seed database with sample data  |
| `npm run dev`       | Watch mode via tsx              |
| `npm run start`     | Run src/index.ts                |
| `npm run build`     | tsc compile to dist/            |
| `npm run prisma:studio` | Open Prisma Studio GUI      |
| `npm run prisma:migrate` | Create new migration        |
| `npm run prisma:generate` | Regenerate Prisma Client  |

---

## 📖 Prisma Concepts Covered

- [x] Schema definition & data models
- [x] One-to-One (`@relation` with unique FK)
- [x] One-to-Many (implicit FK)
- [x] Many-to-Many (implicit, with `connect`/`disconnect`)
- [x] Enums (`UserRole`)
- [x] UUID primary keys
- [x] Unique constraints & composite unique
- [x] Indexes
- [x] Cascade delete
- [x] `@default`, `@updatedAt`
- [x] CRUD: `create`, `findMany`, `findUnique`, `findFirst`, `update`, `upsert`, `delete`, `deleteMany`
- [x] Nested writes (`create` with relational data)
- [x] `include` & `select`
- [x] Filtering, pagination (`skip`/`take`), ordering
- [x] Aggregation (`aggregate`, `groupBy`, `count`)
- [x] Interactive transactions (`$transaction`)
- [x] Raw SQL queries (`$queryRaw`, `$executeRaw`)
- [x] Seeding

---

## Tech Stack

- **Prisma** 6.19.3
- **PostgreSQL**
- **TypeScript** 5.9
- **tsx** (runtime for TS)

---

## 📁 Project Structure

```
prisma/
├── .env.example          # Environment template
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── README.md
├── prisma/
│   ├── schema.prisma     # Data model definition
│   └── migrations/       # Database migrations
└── src/
    ├── index.ts          # Entry point
    ├── seed.ts           # Database seeder
    └── examples/
        ├── 01-basic-create.ts
        ├── 02-basic-read.ts
        ├── 03-update-delete.ts
        ├── 04-relationships.ts
        ├── 05-many-to-many.ts
        ├── 06-aggregate-grouping.ts
        ├── 07-transactions.ts
        └── 08-raw-queries.ts
```

---

## 📜 License

MIT
