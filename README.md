# Personal Portfolio — Full Stack

A full stack developer portfolio: a React + Tailwind + TypeScript frontend
backed by an Express + PostgreSQL (Prisma) + TypeScript API, with a Firebase
Authentication + JWT protected admin dashboard for managing your projects
and reading contact messages — no need to touch the database by hand to
add a new project.

```
Frontend (React/Vite/Tailwind) ──axios──▶ Backend (Express/Prisma) ──▶ PostgreSQL
        ▲                                        ▲
        └── Firebase Auth (admin login) ─────────┘ (verified via firebase-admin,
                                                      then a backend JWT is issued)
```

## Tech stack

| Layer      | Tech |
|------------|------|
| Frontend   | React 19, TypeScript, React Router, Tailwind CSS v4, Axios, Vite |
| Backend    | Node.js, Express, TypeScript, Zod (validation), JWT |
| Database   | PostgreSQL + Prisma ORM (types generated automatically) |
| Auth       | Firebase Authentication (admin login) + JWT (API sessions) |
| Tooling    | Postman (API testing), Beekeeper Studio (DB browsing) |

## Project structure

```
portfolio-project/
├── client/                      # React + Vite + Tailwind + TypeScript frontend
│   ├── public/                  # Static assets — put resume.pdf and images/profile.jpg here
│   └── src/
│       ├── components/
│       │   ├── layout/          # Navbar, Footer, MainLayout, AdminLayout
│       │   ├── common/          # Button, Container, Loader, Avatar, ProtectedRoute…
│       │   └── sections/        # Hero, About, Skills, Education, Experience, Projects, Contact
│       ├── pages/                # Home, ProjectDetails, NotFound, admin/*
│       ├── data/                 # ← Edit these files with YOUR real content
│       ├── services/             # Axios calls to the backend API
│       ├── context/ & hooks/     # Firebase + JWT auth state
│       ├── routes/               # React Router route table
│       └── types/                # Shared TypeScript interfaces (Project, PersonalInfo…)
│
└── server/                      # Express + Prisma + TypeScript REST API
    ├── prisma/
    │   ├── schema.prisma         # Project & ContactMessage models
    │   └── seed.ts               # Seeds 3 placeholder projects
    └── src/
        ├── config/                # Prisma client, Firebase Admin SDK
        ├── controllers/           # Route handlers
        ├── middlewares/           # JWT auth guard, validation, error handling
        ├── routes/                # /api/projects, /api/contact, /api/auth
        ├── validators/            # Zod schemas (also exported as TS types)
        ├── types/                 # Express Request augmentation (req.admin)
        └── utils/                 # ApiError, ApiResponse, asyncHandler
```

Both sides are strict-mode TypeScript. The backend's model types
(`Project`, `ContactMessage`) come straight from Prisma's generated
client — edit `schema.prisma` and every controller that uses `prisma.project.*`
is type-checked against the new shape automatically.

## How the admin flow works

This is the part that ties Firebase Auth, JWT, PostgreSQL and Prisma
together, so it's worth explaining once:

1. You sign in at `/admin/login` with an email/password you create in
   **Firebase Authentication**.
2. The client gets a Firebase ID token and sends it to `POST /api/auth/login`.
3. The backend verifies that token with the **Firebase Admin SDK**, checks
   the email matches `ADMIN_EMAIL` in `server/.env`, and — only then —
   signs its **own JWT**.
4. That JWT is stored in the browser and sent as `Authorization: Bearer …`
   on every admin request (creating/editing/deleting projects, reading
   contact messages). The backend never talks to Firebase again after
   login — it just verifies your JWT.

Visitors to the public site never touch Firebase or the JWT at all.

## 1. Local setup

### Prerequisites
- Node.js 18+
- A PostgreSQL database — local, or a free one from [Neon](https://neon.tech) or [Supabase](https://supabase.com)
- A free [Firebase](https://console.firebase.google.com) project

### Backend

```bash
cd server
npm install
cp .env.example .env      # then fill in the values (see below)
npx prisma generate         # generates the typed Prisma Client from schema.prisma
npx prisma migrate dev --name init
npm run seed               # adds 3 placeholder projects so the UI isn't empty
npm run dev                 # http://localhost:5000 (tsx watch — restarts on save)
```

`npm run typecheck` runs `tsc --noEmit`; `npm run build` compiles to `dist/`
for production (`npm start` then runs the compiled output).

### Frontend

```bash
cd client
npm install
cp .env.example .env       # then fill in your Firebase web config
npm run dev                  # http://localhost:5173
```

`npm run typecheck` runs `tsc -b --noEmit`; `npm run build` type-checks
then produces the production build in `dist/`.

Open `http://localhost:5173` — the public site works immediately. The
Projects section pulls live from the API you just started.

## 2. Setting up Firebase (for the admin dashboard)

1. Create a project at the [Firebase Console](https://console.firebase.google.com).
2. **Authentication → Sign-in method** → enable **Email/Password**.
3. **Authentication → Users** → add yourself as a user (this is the account
   you'll log in with at `/admin/login`).
4. **Project settings → General → Your apps** → add a Web app → copy the
   `firebaseConfig` values into `client/.env` (`VITE_FIREBASE_*`).
5. **Project settings → Service accounts** → Generate new private key →
   open the downloaded JSON and copy `project_id`, `client_email`, and
   `private_key` into `server/.env` (`FIREBASE_*`). Keep the `\n`
   characters in the private key exactly as they appear, wrapped in quotes.
6. Set `ADMIN_EMAIL` in `server/.env` to the email you added in step 3.

Until this is done, the public portfolio still works fine — only
`/admin/login` will show a "Firebase isn't configured yet" notice instead
of crashing.

## 3. Personalizing your content

Everything is centralized so you're not hunting through components:

| What | Edit |
|------|------|
| Name, tagline, bio, contact info | `client/src/data/personalInfo.js` |
| Skills matrix | `client/src/data/skills.js` |
| Education | `client/src/data/education.js` |
| Experience | `client/src/data/experience.js` (leave `[]` to hide the section) |
| Social links | `client/src/data/socialLinks.js` |
| Profile photo | Add `client/public/images/profile.jpg` |
| Resume PDF | Add `client/public/resume.pdf` (Hero button downloads this) |
| Projects | Use the **admin dashboard** at `/admin/login`, or edit `server/prisma/seed.js` and re-run `npm run seed` |

The Hero photo and resume button already work — they just show a graceful
placeholder (your initials / a disabled-feeling link) until those two
files exist.

## 4. Deploying (for your live submission link)

Three pieces to deploy: the database, the API, and the frontend.

### A. Database — Neon (free)
1. Create a project at [neon.tech](https://neon.tech).
2. Copy the connection string it gives you into `DATABASE_URL`.

### B. Backend — Render (free)
1. Push this repo to GitHub.
2. [Render](https://render.com) → New → Web Service → point at the repo,
   set **Root Directory** to `server`.
3. Build command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   Start command: `npm start` (runs the compiled `dist/server.js`)
4. Add all the variables from `server/.env.example` in the Render
   dashboard (including your Neon `DATABASE_URL` and Firebase Admin creds).
5. Once it's live, run the seed once from your local machine pointed at
   the production `DATABASE_URL`, or trigger it from Render's shell tab:
   `npm run seed`.
6. Note the deployed URL, e.g. `https://your-api.onrender.com`.

### C. Frontend — Vercel (free)
1. [Vercel](https://vercel.com) → New Project → same repo, set **Root
   Directory** to `client`.
2. Framework preset: Vite. Build command `npm run build`, output `dist`.
3. Add the `VITE_*` env vars from `client/.env.example`, with
   `VITE_API_BASE_URL=https://your-api.onrender.com/api`.
4. Deploy. `client/vercel.json` is already set up to route
   `/projects/:slug` and `/admin/*` correctly on refresh (also see
   `public/_redirects` if you use Netlify instead).
5. Back on Render, update `CLIENT_URL` to your new Vercel URL so CORS
   allows it, and redeploy the backend.

That's it — visit your Vercel URL for the live link to submit.

## 5. API reference

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET    | `/api/projects` | Public | List projects (`?featured=true` optional) |
| GET    | `/api/projects/:idOrSlug` | Public | Single project by slug or id |
| POST   | `/api/projects` | JWT | Create a project |
| PUT    | `/api/projects/:id` | JWT | Update a project |
| DELETE | `/api/projects/:id` | JWT | Delete a project |
| POST   | `/api/contact` | Public | Submit the contact form |
| GET    | `/api/contact` | JWT | List submitted messages |
| POST   | `/api/auth/login` | Public | Exchange a Firebase ID token for a JWT |
| GET    | `/api/auth/me` | JWT | Current admin profile |

Import these into **Postman** for quick manual testing, and use
**Beekeeper Studio** to browse the Postgres tables directly while you
develop.

## 6. Troubleshooting

- **Projects section says "Couldn't reach the API"** — the backend isn't
  running, or `VITE_API_BASE_URL` doesn't match where it's running.
- **"Firebase isn't configured yet" on `/admin/login`** — finish section 2.
- **CORS errors in the browser console** — make sure `CLIENT_URL` in
  `server/.env` exactly matches the origin your frontend is served from.
- **`prisma migrate dev` can't connect** — double check `DATABASE_URL`,
  and that your Postgres instance allows connections from your IP.
- **TypeScript errors mentioning `Prisma.PrismaClientKnownRequestError`
  or missing `Project`/`ContactMessage` types** — run `npx prisma generate`
  in `server/` first. Prisma generates your model types from
  `schema.prisma`, so a fresh clone has no types until that runs once.

## Requirements checklist

- [x] Responsive navbar linking to every section
- [x] Designation + intro + photo in the hero
- [x] Resume download button (wired up, just add the PDF)
- [x] Social links (GitHub, LinkedIn, Twitter, Facebook)
- [x] About Me — journey, interests, personality
- [x] Skills, categorized and visual
- [x] Education
- [x] Experience (auto-hides if empty)
- [x] 3+ projects in cards, each with a details page (stack, description,
      live link, GitHub client repo, challenges, future plans)
- [x] Contact: form + email + phone + WhatsApp
- [x] Footer
- [x] Fully responsive, single coherent color system throughout
