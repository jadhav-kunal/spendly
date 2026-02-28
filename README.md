# Spendly — Expense Tracker

A full-stack expense tracking application built with React, TypeScript, Express, Prisma, and PostgreSQL.

---

## Architecture
```
            User Browser
                 │
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────┐
│           Vercel (Frontend)             │
│                                         │
│   React 18 + TypeScript + Vite          │
│                                         │
│   ┌─────────┐  ┌──────────┐             │
│   │  Pages  │  │Components│             │
│   └────┬────┘  └────┬─────┘             │
│        │             │                  │
│   ┌────▼─────────────▼──────┐           │
│   │     ExpenseContext      │           │
│   │  useReducer + dispatch  │           │
│   └────────────┬────────────┘           │
│                │                        │
│   ┌────────────▼────────────┐           │
│   │   expenseService.ts     │           │
│   │   Axios HTTP layer      │           │
│   └────────────┬────────────┘           │
└────────────────┼────────────────────────┘
                 │ HTTPS REST (JSON)
                 ▼
┌─────────────────────────────────────────┐
│           Render (Backend)              │
│                                         │
│   Node.js + Express                     │
│                                         │
│   ┌────────┐  ┌──────────┐              │
│   │ Routes │  │Middleware│              │
│   └───┬────┘  │  Zod     │              │
│       │       │  CORS    │              │
│  ┌────▼─────┐ │  Logger  │              │
│  │Controller│ └──────────┘              │
│  └────┬─────┘                           │
│  ┌────▼────┐                            │
│  │ Service │                            │
│  └────┬────┘                            │
│  ┌────▼────┐                            │
│  │ Prisma  │                            │
│  └────┬────┘                            │
└───────┼─────────────────────────────────┘
        │ TCP (Connection Pooler :6543)
        ▼
┌─────────────────────────────────────────┐
│         Supabase (PostgreSQL)           │
│                                         │
│   users       expenses                  │
│   ─────────   ──────────────────────    │
│   id (uuid)   id (uuid)                 │
│   name        user_id → users.id        │
│   email       title                     │
│   created_at  category                  │
│               amount (decimal)          │
│               expense_date              │
│               created_at                │
│               updated_at                │
│                                         │
│   Indexes: user_id, category,           │
│            expense_date                 │
└─────────────────────────────────────────┘
```

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, TypeScript, Vite        |
| Styling    | Tailwind CSS (custom design tokens)|
| State      | useReducer + Context API          |
| Backend    | Node.js, Express 4                |
| ORM        | Prisma 5                          |
| Database   | PostgreSQL (Supabase)             |
| Validation | Zod (server), custom (client)     |
| Hosting    | Vercel (frontend), Render (backend)|

---

## Project Structure
```
expense-tracker/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # Reusable UI primitives
│   │   │   ├── expenses/          # Feature components
│   │   │   └── layout/            # App shell and header
│   │   ├── context/               # React context provider
│   │   ├── hooks/                 # Custom hooks
│   │   ├── pages/                 # Dashboard page
│   │   ├── reducers/              # Expense reducer + action types
│   │   ├── services/              # Axios API layer
│   │   ├── types/                 # TypeScript interfaces
│   │   └── utils/                 # Formatters, validators, constants
│   ├── .env.example
│   └── package.json
│
├── server/                        # Express + Prisma backend
│   ├── src/
│   │   ├── controllers/           # HTTP request handlers
│   │   ├── lib/                   # Prisma client singleton
│   │   ├── middleware/            # Error handler, validator, logger
│   │   ├── routes/                # Express route definitions
│   │   ├── services/              # Business logic + Prisma calls
│   │   └── validations/           # Zod schemas
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.js                # Default user seed
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Local Development

### Prerequisites

- Node.js 18+
- Docker (for local PostgreSQL) or PostgreSQL 15 installed locally

### 1. Clone the repository
```bash
git clone https://github.com/jadhav-kunal/spendly.git
cd spendly
```

### 2. Start local PostgreSQL
```bash
docker run --name spendly-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=expense_tracker \
  -p 5432:5432 \
  -d postgres:15
```

### 3. Configure environment variables
```bash
# Backend
cp server/.env.example server/.env
```

Edit `server/.env` with your values — see sample below.
```bash
# Frontend
cp client/.env.example client/.env
```

Edit `client/.env` with your values — see sample below.

### 4. Install dependencies
```bash
# Install all workspaces from root
npm install
```

### 5. Run database migrations and seed
```bash
cd server
npx prisma migrate dev
npx prisma generate
npm run db:seed
```

The seed command prints a UUID — copy it into `server/.env` as `DEFAULT_USER_ID`.

### 6. Run the application

Open two terminals:
```bash
# Terminal 1 — backend (http://localhost:4000)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd client
npm run dev
```

---

## Environment Variables

### `server/.env`
```env
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expense_tracker"

# Required for Prisma migrations when using a connection pooler (Supabase)
DATABASE_URL_DIRECT="postgresql://postgres:postgres@localhost:5432/expense_tracker"

# Express server port
PORT=4000

# development | production
NODE_ENV=development

# UUID of the default user created by the seed script
DEFAULT_USER_ID=
```

### `client/.env`
```env
# Backend API base URL
# Local development — leave empty to use Vite proxy
VITE_API_URL=

# Production — point to your Render URL
# VITE_API_URL=https://spendly-api.onrender.com/api
```

---

## Sample `.env.example` Files

**`server/.env.example`**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/expense_tracker"
DATABASE_URL_DIRECT="postgresql://postgres:postgres@localhost:5432/expense_tracker"
PORT=4000
NODE_ENV=development
DEFAULT_USER_ID=
```

**`client/.env.example`**
```env
VITE_API_URL=
```

---

## Database Management
```bash
# Open Prisma visual studio
cd server && npx prisma studio

# Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>

# Deploy migrations to production
npx prisma migrate deploy

# Re-run seed
npm run db:seed
```

---

## API Endpoints

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | `/api/health`        | Health check           |
| GET    | `/api/expenses`      | Fetch all expenses     |
| POST   | `/api/expenses`      | Create a new expense   |
| PUT    | `/api/expenses/:id`  | Update an expense      |
| DELETE | `/api/expenses/:id`  | Delete an expense      |

### Request body — POST / PUT
```json
{
  "title": "Grocery run",
  "description": "Weekly groceries",
  "category": "food",
  "amount": 45.23,
  "expense_date": "2024-01-15"
}
```

### Valid categories

`food` · `transport` · `shopping` · `entertainment` · `health` · `utilities` · `education` · `travel` · `other`

---

## Deployment

| Service  | Purpose            | Free tier       |
|----------|--------------------|-----------------|
| Vercel   | Frontend hosting   | Unlimited, permanent |
| Render   | Backend hosting    | Free, sleeps after 15min inactivity |
| Supabase | PostgreSQL hosting | 500MB, permanent |

### Production environment variables

**Render (backend):**
```env
DATABASE_URL=postgresql://postgres.[ref]:[pwd]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
DATABASE_URL_DIRECT=postgresql://postgres:[pwd]@db.xxxx.supabase.co:5432/postgres
DEFAULT_USER_ID=<uuid-from-seed>
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Vercel (frontend):**
```env
VITE_API_URL=https://your-api.onrender.com/api
```

