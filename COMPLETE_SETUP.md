# 🎉 Complete Waterlily Project Setup

Your full-stack application with React frontend and Node.js backend is ready!

## Project Overview

This is a complete full-stack application template with:

### Frontend (React + TypeScript + Tailwind CSS + shadcn/ui)
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Responsive design** with dark mode support

### Backend (Node.js + Express + TypeScript + PostgreSQL)
- **Express.js** with TypeScript
- **PostgreSQL** database
- **JWT Authentication**
- **Security middleware** (Helmet, CORS, Rate Limiting)
- **Docker Compose** for database

## Quick Start

### 1. Start the Database

```bash
# From the backend npm run db:up
docker-compose up -d postgres pgadmin
```

This starts:
- PostgreSQL on port 5432
- pgAdmin on port 5050 (admin@waterlily.com / admin123)

### 2. Set Up Backend

```bash
cd Backend
cp env.example .env
npm install
npm run dev (this also runs the db command)
```

Backend will be available at `http://localhost:3001`

### 3. Set Up Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

```

## Environment Configuration

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=waterlily_db
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173
```

## Tradeoffs

JWT tokens VS other auth -> easy to develop and doesnt depend on 3rd party like Auth0, good for horizontal scaling of services since it doesnt
require session to be stored in the server.
Normalized schema vs Denormalized schema -> Easier to maintain relationships, and consistency. Denorm would've been easier to populate the sruvey with questions in one call but difficult to update all places where the data is repeated.
Cache vs no Cache: Could've implemented a better way of caching responses and questions in the FE and in the end submit and save the data on the BE, but I think the user expects the data to be persisted after they hit next and comeback later to continue. Leveraging something like Redis could help because it's fast although we're not completely saving the answers, but could maybe run a periodic job to save the answers or leverage a queue to save later, which could create some eventual consistency but I think it doesn't matter to this specific case.

## Improvements
UI design for better user experience.
Leverage the session table to correctly revoke and renew access tokens
Correctly use the options table and support the different question types
Clearly define the machine learning algorithms to predict based on users answers
Handle logout




