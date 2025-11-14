# Fastify + Prisma + JWT Authentication (MVC Structure)

Project ini adalah boilerplate siap pakai menggunakan **Fastify**, **Prisma ORM**, **JWT Authentication**, dan struktur **MVC modular**.

Cocok untuk membuat API modern, scalable, dan mudah di-maintain.

---

# ⚙️ Features
- Fastify 
- Prisma ORM (MySQL)
- JWT Auth (Login & Register)
- Hash password (bcrypt)
- Modular MVC (Controller, Service, Route)
- Plugin-based architecture (Prisma & JWT Plugin)
- Protected Route dengan preHandler

---

# 📁 Struktur Folder
```
project/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── plugins/
│   │   ├── prisma.js
│   │   └── jwt.js
│   │
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.controller.js
│   │       ├── auth.service.js
│   │       └── auth.route.js
│   │
│   ├── modules/
│   │   └── user/
│   │       ├── user.controller.js
│   │       ├── user.service.js
│   │       └── user.route.js
│   │
│   ├── utils/
│   │   └── hash.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
└── package.json
```

---

# 🛠 Instalasi

### 1. Clone / Download Project
```
git clone <repo>
cd project
```

### 2. Install dependencies
```
npm install
```

### 3. Prisma Init (jika belum ada)
```
npx prisma init
```

---

# ⚙️ Konfigurasi Environment

Buat file `.env`:

```
DATABASE_URL="mysql://root:@localhost:3306/myapp"
JWT_SECRET="supersecretjwt"
```

> Sesuaikan username, password, dan nama database.

---

# 🗄 Prisma Schema (prisma/schema.prisma)
Model default:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

### Jalankan migrasi:
```
npx prisma migrate dev --name init
```

---

# 🚀 Menjalankan Server
```
npm run dev
```
Server berjalan di:
```
http://localhost:3000
```

---

# 📡 API Endpoint

## 1. **Register User**
### **POST /auth/register**
Body:
```json
{
  "name": "kerokero",
  "email": "email@test.com",
  "password": "123456"
}
```
Response:
```json
{
  "id": 1,
  "name": "kerokero",
  "email": "email@test.com",
  "password": "<hashed>",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

## 2. **Login User**
### **POST /auth/login**
Body:
```json
{
  "email": "email@test.com",
  "password": "123456"
}
```
Response:
```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "name": "kerokero",
    "email": "email@test.com"
  }
}
```

---

## 3. **Profile User (Protected)**
### **GET /user/profile**
Headers:
```
Authorization: Bearer <JWT_TOKEN>
```
Response:
```json
{
  "id": 1,
  "name": "kerokero",
  "email": "email@test.com",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

# 🔐 Cara Kerja Auth

1. Register → password di-hash dengan bcrypt
2. Login → diverifikasi, lalu JWT dibuat
3. Token dipakai untuk akses endpoint /user/profile
4. Middleware `authVerify` akan menolak request tanpa token

---

# 🧩 Struktur Modular (MVC)
- **Controller**: handle request/response
- **Service**: bisnis logic
- **Route**: daftar endpoint
- **Plugin**: prisma, jwt
- **Utils**: helper (hash password)

---