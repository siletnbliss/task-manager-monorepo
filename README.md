# sales-dashboard-monorepo

A full-stack Task Manager application built with **Next.js 16**, **Express**, and **PostgreSQL**. The project uses a modular Docker architecture to manage the frontend, backend, and database services.

## 🚀 Features

- **User Authentication:** Register and Login (JWT/Session based).
- **Task Management:** Create, Read, Update, and Delete (CRUD) tasks.
- **API Documentation:** Full Swagger/OpenAPI documentation.
- **Modern UI:** Built with Mantine UI v8 and Next.js 16.
- **Containerized:** Fully Dockerized using Docker Compose `include` strategy.

## 🛠 Tech Stack

### Frontend (`/web`)

- **Framework:** Next.js 16 (App Router) & React 19
- **Language:** TypeScript
- **UI Library:** Mantine v8 (@mantine/core, @mantine/hooks)
- **State/Data:** TanStack Query
- **Runtime:** Node v24 (Alpine)

### Backend (`/api`)

- **Framework:** Express.js
- **Database:** PostgreSQL 15
- **Documentation:** Swagger UI
- **ORM/Query:** TypeORM

---

## 📋 Prerequisites

To run this project efficiently, ensure you have the following installed:

1.  **Docker Desktop** (Version 4.22+ recommended)
    - _Note:_ You must have **Docker Compose v2.20.0+** to support the `include` feature used in this project.
2.  **Git**

---

## ⚙️ Environment Setup

This project consists of two distinct applications (Web and API). You need to configure environment variables for both.

### 1. Backend Configuration

Create a `.env` file in the `api/` directory (you can simply copy from `.env.template`):

```bash
cp api/.env.template api/.env
```

### 2. Frontend Configuration

Create a `.env` file in the `web/` directory (you can simply copy from `.env.template`):

```bash
cp api/.env.template api/.env
```

### 3. Run project

```bash
npm run docker
```

## View application

You can use the default user, with credentials `admin` and `password`. Or use the register functionality.

### 1. View frontend

Defined by .env, by default it's `http://localhost:3000`

### 2. View backend docs

Defined by .env, by default it's `http://localhost:8080/api-docs`
