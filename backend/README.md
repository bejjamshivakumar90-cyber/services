# Home Service Booking API

A TypeScript / Express / MongoDB backend for a home-service booking platform.
Supports customer users, technicians, admins, service listings, bookings, and reviews.

## Stack
- Node.js + Express 4 + TypeScript
- MongoDB + Mongoose
- JWT authentication (role-based: `user`, `technician`, `admin`)
- Multer for file uploads (avatars, service images)
- Centralized error handling & consistent JSON response envelope

## Project structure
```
src/
├── app.ts               # Express app, middleware & route wiring
├── server.ts             # Entry point — connects DB & starts HTTP server
├── config/
│   ├── db.ts              # Mongoose connection
│   └── env.ts             # Typed, validated environment variables
├── controllers/           # Route handlers (business logic)
├── middleware/
│   ├── auth.ts             # JWT verification (`protect`)
│   ├── admin.ts             # Role guards (`adminOnly`, `allowRoles`)
│   ├── upload.ts            # Multer config for image uploads
│   └── erros.ts             # 404 handler + centralized error handler
├── models/                # Mongoose schemas (User, Technician, Service, Booking, Review)
├── routes/                # Express routers, one per resource
├── uploads/                # Uploaded files served at /uploads
└── utils/
    ├── jwt.ts               # sign/verify helpers
    ├── response.ts           # success / failure / paginated response helpers
    └── helpers.ts             # asyncHandler, AppError, pagination, etc.
```

## Getting started

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment — copy `.env` and adjust as needed (Mongo URI, JWT secret, etc.)
3. Run in development (auto-reload)
   ```bash
   npm run dev
   ```
4. Build & run in production
   ```bash
   npm run build
   npm start
   ```

## Auth & roles
Every user has a `role`: `user` (customer), `technician`, or `admin`.
Registering with `role: "technician"` also creates a linked `Technician` profile (pending admin verification).
Send the JWT as `Authorization: Bearer <token>` on protected routes.

## API overview

| Resource     | Base path             | Notes |
|--------------|------------------------|-------|
| Auth         | `/api/auth`             | register, login, me, logout |
| Users        | `/api/users`             | profile, change password, deactivate |
| Services     | `/api/services`          | public listing; admin-only create/update/delete |
| Technicians  | `/api/technicians`        | public listing/detail; technician self-profile |
| Bookings     | `/api/bookings`           | create/list/cancel (user); status updates (technician/admin) |
| Reviews      | `/api/reviews`            | create after completed booking; per-technician listing |
| Admin        | `/api/admin`              | dashboard stats, user management, technician verification |
| Uploads      | `POST /api/upload`        | generic authenticated file upload (multipart `file` field) |

All responses follow the shape:
```json
{ "success": true, "message": "...", "data": { ... } }
```
Paginated list endpoints add a `pagination` object (`page`, `limit`, `total`, `totalPages`).

## Health check
`GET /health` → `{ success: true, data: { status: "ok" } }`
