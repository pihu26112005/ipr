# Full Stack User Management System

A full-stack web application to manage users in a social-like system.
---
- https://ipr-6vvo.onrender.com --> backend deployed url 
- https://ipr-sigma.vercel.app  --> frontend deployed url 

---

## Tech Stack

### Frontend
- **React + Vite**
- **TailwindCSS**
- **Lucide Icons**
- **Appwrite Storage** (for Image upload)
- **Context API + Hooks**

### Backend
- **Node.js + Express**
- **PostgreSQL (via Supabase)**
- **CORS & JSON Middleware**

---

## Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/pihu26112005/ipr-dashboard.git
cd pihu26112005-ipr
```

### 2️⃣ Backend Setup

- Add .env with PostgreSql credentials:
```
DATABASE_URL=""
```
- Install dependencies:

```bash
cd backend
npm install
node server.js
```

### 3️⃣ Frontend Setup

- Add .env with Appwrite credentials:

```
VITE_APPWRITE_ENDPOINT=your_endpoint=""
VITE_APPWRITE_PROJECT_ID=your_project_id=""
VITE_APPWRITE_BUCKET_ID=your_bucket_id=""
```
- Install dependencies:

```bash
cd frontend
npm install
npm run dev
```
