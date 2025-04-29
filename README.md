# Wishlist Frontend (React + Vite + TypeScript)

A frontend application for the **Wishlist Service**, built using **React**, **Vite**, **TypeScript**, and **Docker**.

Provides user authentication (login/register) and wishlist management (create, edit, delete, complete tasks).

---

## Features

- ⚡ Built with **Vite** for fast development
- 🎨 **React + TypeScript** architecture
- 🐳 Fully containerized with **Docker**
- 🔥 Proxy setup to communicate with backend API
- 📦 Environment variables support (`.env`)
- 🖥️ Deployment-ready static frontend (served by **Nginx**)

---

## Prerequisites

- Node.js (only if you want to run locally without Docker)
- Docker + Docker Compose

---

## Environment Variables

Create `.env` file:

```bash
  cp .env.example .env
```

| Variable         | Description                          | Default                      |
|------------------|--------------------------------------|-------------------------------|
| `VITE_API_URL`   | Backend API base URL                 | `http://localhost:8080/api`   |
| `VITE_APP_TITLE` | App title shown in browser tab       | `Wishlist App`                |

Example `.env`:

```
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=Wishlist App
```

---

## Local Development (Vite dev server)

# Install dependencies
```bash
  npm install

# Start local dev server
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

> ⚠️ Make sure your backend is running on `http://localhost:8080`.

---

## Running with Docker (Production build)

To build and run the production version via Docker:

# Build and start
```bash
  docker compose -f docker-compose.frontend.yml up -d --build
```

Access the app at: [http://localhost:3000](http://localhost:3000)

### To stop and remove containers:

```bash
  docker compose -f docker-compose.frontend.yml down -v
```

---

## Project Structure

```
/src
  /pages
    LoginPage.tsx
    RegisterPage.tsx
    WishlistPage.tsx
  /routes
    PrivateRoute.tsx
  /components
    (optional: reusable components)
  /styles
    (optional: CSS files)
  App.tsx
  main.tsx
public/
vite.config.ts
Dockerfile
docker-compose.frontend.yml
nginx.conf
.env.example
```

---

## Notes

- Proxy for API requests is configured in `nginx.conf` when running production build with Docker.
- During development (`npm run dev`), Vite proxy (`vite.config.ts`) automatically redirects `/api` requests to backend.
- CORS settings are handled on the backend.

---

## TODO (Future Improvements)

- Responsive design enhancements (Mobile/tablets)
- User profile management
- Frontend error boundaries and better UX for failed requests
- CI/CD pipeline for automatic deployment
- PWA support for offline functionality

---

## Helpful Commands

```bash
  # Build production files locally
npm run build

# Preview production build locally
npm run preview

# Format code
npm run format

# Lint code
npm run lint
```

---

