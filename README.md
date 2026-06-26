# Backend Internship Assignment

## Overview

This project is a backend service built using **Fastify**, **TypeScript**, **Prisma ORM**, and **SQLite**. It manages quote requests, integrates with a mock FastAPI AI analysis service, stores analysis results, and exposes REST APIs for quote management.

The project follows a layered backend architecture with Controllers, Services, Repositories, Middleware, and Prisma ORM.

---

# Tech Stack

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* SQLite
* Zod
* Swagger (OpenAPI)
* Postman

---

# Features

* Create Quote Request
* Get All Quotes
* Get Quote By ID
* Analyze Quote (Mock FastAPI Integration)
* Update Quote Status
* Input Validation using Zod
* Global Error Handling
* Logging Middleware
* Swagger API Documentation
* Prisma ORM Integration

---

# Project Structure

```
backend-intern-assignment
│
├── prisma
│   ├── schema.prisma
│   └── dev.db
│
├── src
│   ├── clients
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── plugins
│   ├── repositories
│   ├── routes
│   ├── schemas
│   ├── services
│   ├── types
│   ├── utils
│   ├── websocket
│   ├── app.ts
│   └── server.ts
│
├── tests
├── package.json
├── tsconfig.json
└── README.md
```

---

# Database

Two tables are maintained:

## QuoteRequest

* id
* customer
* project
* estimatedValue
* status
* createdDate

## AnalysisResult

* quoteId
* risk
* confidence
* missingItems
* analyzedAt

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE_URL="file:./dev.db"
PORT=3000
```

---

# Prisma Setup

Generate Prisma Client.

```bash
npx prisma generate
```

Create the database.

```bash
npx prisma migrate dev --name init
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

# API Documentation

Swagger UI

```
http://localhost:3000/docs
```

---

# API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | /quotes              | Get all quotes      |
| GET    | /quotes/{id}         | Get quote by ID     |
| POST   | /quotes              | Create a quote      |
| POST   | /quotes/{id}/analyze | Analyze quote       |
| PATCH  | /quotes/{id}/status  | Update quote status |

---

# Validation

The application validates:

* Customer name
* Project name
* Estimated value must be positive
* Valid quote status

---

# Error Handling

The application handles:

* Invalid requests
* Validation failures
* Quote not found
* Duplicate analysis requests
* Database errors
* Internal server errors

---

# Logging

Custom logging middleware records:

* Request Method
* Request URL
* Request Time
* Response Status
* Response Time

Fastify's built-in logger is also enabled.

---

# Postman

The project includes:

* Postman Collection
* Postman Environment

for testing all endpoints.

## Postman Collection

The Postman collection and environment are available in the `postman/` folder.

Import both files into Postman before testing the APIs.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `base_url` | `http://localhost:3000` |
| `quoteId` | UUID of an existing quote |

### Note

After calling `POST /quotes`, copy the `id` returned in the response and set it as the `quoteId` environment variable before testing:

- `GET /quotes/{{quoteId}}`
- `POST /quotes/{{quoteId}}/analyze`
- `PATCH /quotes/{{quoteId}}/status`

---

# Design Highlights

* Layered architecture (Controller → Service → Repository)
* Prisma ORM for database abstraction
* Fastify hooks for logging
* Zod for request validation
* Swagger for API documentation
* Modular folder structure for maintainability

---

# Author

Yash Shukla
