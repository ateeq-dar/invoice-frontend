# Invoice Fullstack

A full-stack invoice management application with user authentication, invoice CRUD, payment tracking, and PDF invoice export.

## Overview

This repository contains two apps:

- `invoice-frontend`: React + Vite + Tailwind CSS client
- `invoice-backend`: Node.js + Express + Prisma + PostgreSQL API

Core capabilities:

- User sign up/sign in with JWT authentication
- Create, edit, list, and view invoices
- Track payments and outstanding balances
- Archive and restore invoices
- Generate downloadable PDF invoices
- Multi-user isolation (each user sees only their own invoices)

## Tech Stack

Frontend:

- React 18
- Vite 5
- React Router 6
- Axios
- Tailwind CSS 3

Backend:

- Node.js 18+
- Express 4
- Prisma ORM
- PostgreSQL
- JWT (`jsonwebtoken`)
- `pdfkit`

## Project Structure

```text
invoicefullstack/
  invoice-frontend/
    src/
  invoice-backend/
    prisma/
    src/
```

## Prerequisites

Install before running locally:

- Node.js `>=18`
- npm
- PostgreSQL database (local or hosted)

## Environment Variables

Create these files:

### `invoice-backend/.env`

```env
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<db>?sslmode=require
JWT_SECRET=<strong-random-secret>
```

### `invoice-frontend/.env`

```env
VITE_API_BASE=http://localhost:4000
```

Notes:

- `DATABASE_URL` must point to a reachable PostgreSQL instance.
- Use a strong `JWT_SECRET` in production.

## Local Development

Run backend:

```bash
cd invoice-backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Run frontend in a second terminal:

```bash
cd invoice-frontend
npm install
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Database

Prisma schema location:

- `invoice-backend/prisma/schema.prisma`

Useful commands:

```bash
cd invoice-backend
npm run prisma:generate
npm run prisma:migrate
```

## API Summary

Base URL: `http://localhost:4000`

Auth:

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/me`

Invoices:

- `GET /api/invoices`
- `POST /api/invoices`
- `PUT /api/invoices/:id`
- `GET /api/invoices/by-number/:number`
- `GET /api/invoices/:id`
- `POST /api/invoices/:id/payments`
- `POST /api/invoices/:id/archive`
- `POST /api/invoices/:id/restore`
- `GET /api/invoices/:id/pdf`

Protected routes require:

```http
Authorization: Bearer <token>
```

## Build for Production

Frontend:

```bash
cd invoice-frontend
npm install
npm run build
npm run preview
```

Backend:

```bash
cd invoice-backend
npm install
npm run prisma:generate
npm run start
```

## Make It Live (Deployment Guide)

Recommended split deployment:

1. Deploy `invoice-backend` to a Node host (Render, Railway, Fly.io, VPS, etc.)
2. Deploy `invoice-frontend` static build to Vercel/Netlify
3. Use a managed PostgreSQL database (Neon/Supabase/RDS/etc.)

### 1) Deploy backend

Set backend environment variables on your host:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`

Then run:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start
```

After deploy, note the public backend URL, for example:

```text
https://your-api.example.com
```

### 2) Configure CORS for production

Current CORS config allows only `http://localhost:5173` in `invoice-backend/src/app.js`.

Before production, update that origin list to include your deployed frontend domain.

Example:

```js
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.example.com'],
  credentials: true
}))
```

### 3) Deploy frontend

Set frontend environment variable:

```env
VITE_API_BASE=https://your-api.example.com
```

Build and deploy `invoice-frontend/dist` (or let Vercel/Netlify build automatically).

### 4) Verify live flow

- Sign up a user
- Create an invoice
- Add payment
- Download invoice PDF
- Confirm invoice list is user-specific

## Troubleshooting

- `Unauthorized` errors:
  - Ensure JWT token exists in browser local storage and API calls include `Authorization` header.
- Prisma connection errors:
  - Re-check `DATABASE_URL` and DB network access.
- CORS errors in browser:
  - Add your frontend domain to backend CORS allowlist.
- Migration issues:
  - Re-run `npm run prisma:generate` and `npm run prisma:migrate` from `invoice-backend`.

## Current Limitations

- No automated tests are configured yet.
- CORS origin is hardcoded for local development by default.
- No Docker setup is included yet.

## License

No license file is currently defined in this repository.
