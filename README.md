# Region

A web app for exploring cities and places — browse interesting spots, save favorites, and mark visited places.

## Stack

**Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS, Zustand, React Query, Three.js  
**Backend** — NestJS 11, TypeScript, Prisma ORM, PostgreSQL  
**Auth** — JWT (access + refresh tokens in httpOnly cookies)

## Project structure

```
region/
├── frontend/   # Next.js app
└── backend/    # NestJS API
```

## Quick start

### 1. Database

```bash
cd backend
docker-compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env   # set DATABASE_URL
npm install
npx prisma migrate deploy
npx prisma db seed
npm run start:dev      # runs on http://localhost:3001
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:3001
npm install
npm run dev                   # runs on http://localhost:3000
```

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register |
| POST | `/auth/login` | Login |
| POST | `/auth/logout` | Logout |
| POST | `/auth/refresh` | Refresh tokens |
| GET | `/auth/me` | Current user |
| GET | `/places` | List all places |
| GET | `/places/:id` | Get place by ID |
| GET | `/places/categories` | List categories |
| PATCH | `/places/:id/save` | Toggle saved |
| PATCH | `/places/:id/visit` | Toggle visited |
| GET | `/cities` | List all cities |
| GET | `/cities/:slug` | Get city by slug |

## Environment variables

**backend/.env**
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/region?schema=public"
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
