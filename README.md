# erps - demo ERP starter (React + Tailwind front, Express + Prisma (Postgres) back)

This ZIP contains a ready-to-run demo project scaffold:
- client/  -> React (Vite) + Tailwind
- server/  -> Express + Prisma (PostgreSQL)

## Quick start (local)

### 1) PostgreSQL
Create a local PostgreSQL database named `erps` and ensure you can connect with user `postgres` and password `postgres` on localhost:5432.
You can create DB quickly with psql:
```
createdb erps
```

Or run Postgres in Docker:
```
docker run --name erps-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=erps -p 5432:5432 -d postgres
```

### 2) Backend (server)
```bash
cd server
npm install
# generate prisma client & run migration
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```
Server default: http://localhost:5000

### 3) Frontend (client)
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Open: http://localhost:5173

Frontend expects backend API at http://localhost:5000/api (change client/.env.example VITE_API_BASE if needed).

---
Enjoy! If kamu mau, aku bisa:
- tambahin script `dev:all` untuk start dua-duanya sekaligus
- bikin flow CRUD penuh (Inventory create/update/delete)
- tambah auth (JWT)
