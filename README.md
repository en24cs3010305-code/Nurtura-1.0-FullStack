# 🌿 NURTURA 3.0 — AI-Powered Newborn & Infant Healthcare Platform

> **Tagline:** A Smarter Way to Care for Your Little One.  
> **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Node.js, Express.js, MongoDB / Mongoose, Recharts, and Framer Motion.  
> **Architecture:** Full-Stack Pediatric Care SaaS Monorepo (Frontend + Backend).

---

## 🌟 Overview & Key Features

Nurtura 3.0 is a comprehensive newborn and infant healthcare management system that bridges daily home baby care with clinical pediatric oversight.

### Key Portals & Modules:
1. **Public Website:** Interactive landing page, feature highlights, WHO growth curve previews, and FAQ knowledge base.
2. **Parent Portal:**
   - **Daily Tracking:** Feeding (breast/formula/expressed), Sleep (nap/night), Diaper (wet/dirty/mixed), and Growth.
   - **Interactive WHO Charts:** Longitudinal percentile curves (97th, 85th, 50th median, 15th, 3rd) via Recharts.
   - **Medical Care:** Immunization schedule, medication reminders, milestone timeline, and appointment booking.
   - **Nurtura AI:** Pediatric educational assistant with emergency red-flag triaging and clinical disclaimers.
3. **Doctor / Pediatrician Portal:**
   - Patient roster, appointment requests, longitudinal growth analytics.
   - Clinical SOAP Documentation (Subjective, Objective, Assessment, Plan) and Digital Prescriptions.
4. **Administrator Console:**
   - User account management, doctor credential verification queue, platform metrics, and audit logging.
5. **Node.js & Express Backend:**
   - RESTful APIs with JWT authentication and role-based guards.
   - Hybrid MongoDB Atlas + resilient persistent JSON database engine (`server/data/db.json`).

---

## 🚀 Quick Start Guide (Run Locally)

### Prerequisites:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

---

### Step 1: Install Dependencies
Open a terminal in the project root directory and run:

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd server
npm install
cd ..
```

---

### Step 2: Configure Environment Variables

1. **Frontend:** Already preconfigured in `src/api/client.ts` to connect to `http://localhost:5000/api`. (Can be overridden via `.env` with `VITE_API_BASE_URL`).
2. **Backend:** Check `server/.env`. By default, it runs with local persistent storage.  
   To connect to **MongoDB Atlas Cloud**, simply set your URI in `server/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=nurtura_super_secure_jwt_secret_key_2026_pediatric
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nurtura?retryWrites=true&w=majority
   ```
   *(If MongoDB Atlas is not yet configured, the system automatically uses the zero-crash local JSON engine at `server/data/db.json`!)*

---

### Step 3: Start the Application

You can start both servers from the project root:

#### Terminal 1 — Start Backend Server (Port 5000):
```bash
npm run server
```
*Backend Health Check:* [`http://localhost:5000/api/health`](http://localhost:5000/api/health)

#### Terminal 2 — Start Frontend Dev Server (Port 5173):
```bash
npm run dev
```
*Frontend Application:* [`http://localhost:5173`](http://localhost:5173)

---

## 🔑 One-Click Demo Accounts

| Role | Demo Email | Password | Default Landing Page |
|---|---|---|---|
| **Parent / Guardian** | `sarah.jenkins@example.com` | `password123` | `/parent` |
| **Doctor / Pediatrician** | `dr.ananya@nurturacare.com` | `password123` | `/doctor` |
| **Platform Administrator**| `admin@nurtura.app` | `password123` | `/admin` |

*(On the Login screen, click any of the 1-click role buttons to sign in instantly!)*

---

## 🧪 Automated Testing & Verification

Run the full end-to-end verification suite:
```bash
# Verify backend APIs, auth, role permissions, and tracking
node scripts/e2e_verification.js

# Verify TypeScript type checks
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 📁 Project Structure

```
Nurtura-Frontend/
├── server/                           # Node.js & Express Backend
│   ├── src/
│   │   ├── config/db.js              # Hybrid MongoDB & Local Storage connector
│   │   ├── models/                   # Mongoose Schemas (User, Baby, Tracking, etc.)
│   │   ├── middleware/auth.js        # JWT & Role authorization guards
│   │   ├── routes/                   # RESTful API endpoints
│   │   └── index.js                  # Backend Entry Point (:5000)
│   ├── .env.example                  # Safe environment template
│   └── package.json                  # Express, Mongoose, JWT, bcryptjs
│
├── src/                              # React & TypeScript Frontend
│   ├── api/client.ts                 # Axios-style API client with JWT interceptor
│   ├── components/                   # Shared UI, form, layout & chart components
│   ├── contexts/                     # Auth, Baby, Theme, and Language Contexts
│   ├── layouts/                      # Role-specific layouts (Parent, Doctor, Admin)
│   ├── pages/                        # Public, Parent, Doctor, and Admin screens
│   ├── routes/AppRoutes.tsx          # Protected role-based routing
│   └── services/                     # Frontend data services calling backend APIs
│
├── scripts/
│   └── e2e_verification.js           # Automated end-to-end test suite
├── .gitignore                        # Protects credentials, logs, and node_modules
├── README.md                         # Complete project documentation
└── package.json                      # Monorepo scripts (dev, server, build)
```

---

## 🌐 Public Deployment Guide

- **Frontend:** Can be deployed freely on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Set environment variable `VITE_API_BASE_URL` to your deployed backend URL.
- **Backend:** Can be deployed freely on [Render](https://render.com/) or [Railway](https://railway.app/). Set environment variables `PORT=5000`, `JWT_SECRET`, and `MONGODB_URI`.
