# ACS – Academic Profiling System

**IT and CS Academic Profiling System** for the College of Computing Studies (CCS).  
Manages student profiles, faculty records, class schedules, campus events, research, and curriculum data through a full-stack web application.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Project Structure](#project-structure)
5. [API Reference](#api-reference)
6. [Getting Started](#getting-started)
7. [Authentication & Security](#authentication--security)
8. [Role-Based Access Control](#role-based-access-control)
9. [Frontend Service Layer](#frontend-service-layer)
10. [Database Design](#database-design)
11. [License](#license)

---

## System Overview

ACS is a single-page web application that gives the College of Computing Studies a centralised place to:

- **Track students** — store and search profiles, GPA, enrollment status, year level, section, and scholarship information.
- **Manage faculty** — record teaching loads, specialisations, and contact details.
- **Schedule classes** — assign rooms, time slots, and faculty to courses for each academic term.
- **Organise events** — create, view, and manage seminars, hackathons, thesis defences, and other campus activities.
- **Archive research** — maintain a repository of ongoing and completed research projects with associated faculty and student members.
- **Version curricula** — keep each program's required courses per year level and semester in sync with the current academic plan.

Three roles interact with the system — **Admin (Registrar)**, **Faculty**, and **Student** — each seeing only the features relevant to their function (see [Role-Based Access Control](#role-based-access-control)).

---

## Tech Stack

### Why This Stack?

The choices below are driven by the system's requirements: a moderate-sized institutional web app with structured relational data, role-based access control, and a team likely familiar with JavaScript across the stack.

| Layer | Technology | Reason |
|---|---|---|
| **Frontend UI** | React 18 | Component model keeps complex pages (schedules, curriculum) maintainable; large ecosystem; hooks API reduces boilerplate |
| **Frontend routing** | React Router DOM 7 | URL-based navigation so users can bookmark pages, share deep links, and use the browser's back/forward buttons |
| **HTTP client** | Axios 1.13 | Interceptors handle JWT attachment and error normalisation in one place; automatic JSON serialisation; cleaner than raw `fetch` for a multi-service app |
| **Frontend build** | Vite 5 | Sub-second HMR during development; optimised ES-module bundling for production |
| **Backend runtime** | Node.js 18 | Same language as the frontend reduces context switching; strong async I/O for concurrent API requests |
| **Backend framework** | Express 4 | Minimal, unopinionated HTTP framework; rich middleware ecosystem; easy to reason about request/response lifecycle |
| **ORM** | Sequelize 6 | Parameterised queries by default (SQL-injection prevention); model definitions serve as living documentation; handles connection pooling |
| **Database** | MySQL 8 | Mature relational database with strong ACID guarantees; well-suited for structured academic data with FK relationships |
| **Authentication** | JWT + bcryptjs | Stateless tokens eliminate server-side session storage; bcrypt's adaptive cost factor keeps password hashing secure as hardware improves |
| **Security headers** | Helmet 7 | Single middleware that sets a robust set of HTTP security headers (CSP, HSTS, X-Frame-Options, etc.) with sensible defaults |
| **Rate limiting** | express-rate-limit 7 | Protects against brute-force login attempts and API abuse without requiring external infrastructure |
| **Validation** | express-validator 7 | Declarative, colocated request validation rules; prevents malformed data from reaching the database layer |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (React SPA)                                        │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Pages       │ ←→ │  Services    │ ←→ │  Axios       │  │
│  │  (React      │    │  (api.js +   │    │  (HTTP       │  │
│  │  components) │    │  domain      │    │  client with │  │
│  └──────────────┘    │  helpers)    │    │  JWT header) │  │
│                      └──────────────┘    └──────┬───────┘  │
└─────────────────────────────────────────────────┼──────────┘
                                                  │ HTTPS
                                                  ▼
┌─────────────────────────────────────────────────────────────┐
│  Express API Server  (port 5000)                            │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Helmet   │  │  CORS    │  │   Rate   │  │  Body    │   │
│  │ (headers)│  │          │  │  Limiter │  │  Parser  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes  (/api/auth, /api/students, /api/faculty…)   │  │
│  │                                                      │  │
│  │  ┌────────────┐    ┌──────────────────────────────┐  │  │
│  │  │ authenticate│→  │ authorize(role) → Handler    │  │  │
│  │  │ (JWT check) │   │ (Sequelize query → JSON)     │  │  │
│  │  └────────────┘    └──────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
              ┌───────────────────────────┐
              │  MySQL 8  (port 3306)     │
              │  Database: ccs / acs_db   │
              │  ~23 Sequelize models     │
              └───────────────────────────┘
```

### Request Lifecycle

1. The user performs an action in the browser (e.g. clicks "View Students").
2. React Router updates the URL to `/students` and renders `StudentsPage`.
3. `StudentsPage` calls `studentsService.getAll()` from the service layer.
4. Axios attaches the stored JWT as `Authorization: Bearer <token>` via the request interceptor and sends `GET /api/students` to the backend.
5. Express routes the request through the `authenticate` middleware, which verifies the JWT signature and expiry.
6. The route handler queries MySQL via Sequelize and returns a JSON array.
7. The Axios response interceptor unwraps the envelope so the service receives the data directly.
8. React re-renders the table with the new data.

---

## Project Structure

```
ACS-/
├── src/                            # React frontend source
│   ├── App.jsx                     # Root component — auth guard + route tree
│   ├── main.jsx                    # React DOM entry; mounts BrowserRouter
│   ├── index.css                   # Global base styles + reusable CSS classes
│   │
│   ├── components/                 # Reusable UI building blocks
│   │   ├── Sidebar.jsx             # Navigation sidebar (uses NavLink for active state)
│   │   ├── Modal.jsx               # Generic modal overlay
│   │   ├── StatCard.jsx            # KPI metric card
│   │   ├── SHdr.jsx                # Section header with optional action button
│   │   ├── Lbar.jsx                # Progress/load bar
│   │   ├── Av.jsx                  # Avatar (initials-based)
│   │   ├── Bdg.jsx                 # Role/status badge
│   │   ├── Fl.jsx                  # Inline flex layout helper
│   │   ├── Fv.jsx                  # Vertical flex layout helper
│   │   └── index.js                # Barrel export
│   │
│   ├── pages/                      # Full-page views (one per route)
│   │   ├── LoginPage.jsx           # /login — public; verifies credentials
│   │   ├── Dashboard.jsx           # /dashboard — summary stats + quick nav
│   │   ├── StudentsPage.jsx        # /students — list, search, create/edit/delete
│   │   ├── FacultyPage.jsx         # /faculty
│   │   ├── EventsPage.jsx          # /events
│   │   ├── SchedulingPage.jsx      # /scheduling
│   │   ├── ResearchPage.jsx        # /research
│   │   ├── CurriculumPage.jsx      # /curriculum
│   │   ├── SearchPage.jsx          # /search — admin-only global search
│   │   ├── ReportsPage.jsx         # /reports — admin-only reports
│   │   └── index.js
│   │
│   ├── services/                   # API abstraction layer
│   │   ├── api.js                  # Axios instance + request/response interceptors
│   │   ├── auth.js                 # login()
│   │   ├── students.js             # CRUD helpers for /api/students
│   │   ├── faculty.js              # CRUD helpers for /api/faculty
│   │   ├── events.js               # CRUD helpers for /api/events
│   │   ├── schedules.js            # CRUD helpers for /api/schedules
│   │   ├── research.js             # CRUD helpers for /api/research
│   │   ├── curriculum.js           # CRUD helpers for /api/curriculum
│   │   └── index.js                # Barrel export
│   │
│   ├── constants/                  # Static configuration
│   │   ├── theme.js                # Design tokens (colours, spacing)
│   │   ├── config.js               # Page titles, event types, calendar labels
│   │   ├── auth.js                 # Nav items + per-role allowed pages + demo creds
│   │   └── data/                   # Offline mock/seed data (used while backend is down)
│   │       ├── students.js
│   │       ├── faculty.js
│   │       ├── events.js
│   │       ├── schedules.js
│   │       ├── curriculum.js
│   │       ├── research.js
│   │       └── index.js
│   │
│   └── utils/
│       └── helpers.js              # General-purpose utility functions
│
├── backend/                        # Node.js + Express REST API
│   ├── server.js                   # App bootstrap: middleware, routes, DB sync
│   ├── package.json
│   ├── .env.example                # Environment variable template
│   │
│   ├── config/
│   │   └── database.js             # Sequelize instance + connection pool config
│   │
│   ├── middleware/
│   │   └── auth.js                 # authenticate() + authorize(...roles)
│   │
│   ├── models/                     # Sequelize model definitions (schema as code)
│   │   ├── Member.js               # Core user table (students, faculty, admins)
│   │   ├── FacultyRecord.js        # Faculty-specific extended details
│   │   ├── Department.js
│   │   ├── Program.js              # BSCS, BSIT, BSIS, BSEMC…
│   │   ├── AcademicTerm.js         # Semester + academic year records
│   │   ├── Course.js
│   │   ├── Curriculum.js
│   │   ├── CurriculumCourse.js     # Junction: Curriculum ↔ Course
│   │   ├── Schedule.js
│   │   ├── StudentSchedule.js      # Junction: Student ↔ Schedule (enrollment)
│   │   ├── Room.js
│   │   ├── Syllabus.js
│   │   ├── SyllabusTopic.js
│   │   ├── StudentLeave.js
│   │   ├── StudentMedical.js
│   │   ├── StudentOrganization.js
│   │   ├── FailedCourse.js
│   │   ├── ResearchProject.js
│   │   ├── ResearchMember.js       # Junction: ResearchProject ↔ Member
│   │   ├── Extracurricular.js
│   │   ├── Event.js
│   │   ├── EventParticipant.js     # Junction: Event ↔ Member
│   │   └── Certification.js
│   │
│   ├── routes/                     # Express route handlers (controller layer)
│   │   ├── auth.js                 # POST /api/auth/login
│   │   ├── students.js             # CRUD /api/students
│   │   ├── faculty.js              # CRUD /api/faculty
│   │   ├── events.js               # CRUD /api/events
│   │   ├── schedules.js            # CRUD /api/schedules
│   │   ├── research.js             # CRUD /api/research
│   │   ├── curriculum.js           # CRUD /api/curriculum
│   │   ├── academic-terms.js       # CRUD /api/academic-terms
│   │   ├── departments.js          # CRUD /api/departments
│   │   ├── programs.js             # CRUD /api/programs
│   │   ├── rooms.js                # CRUD /api/rooms
│   │   └── courses.js              # CRUD /api/courses
│   │
│   └── seeders/
│       └── seed.js                 # Populates the database with sample data
│
├── public/                         # Static assets served by Vite
├── index.html                      # HTML shell (Vite entry point)
├── vite.config.js                  # Vite build configuration
├── package.json                    # Frontend dependencies
├── .env.example                    # Frontend env variable template
└── ccs.sql                         # Full database schema + seed data (SQL dump)
```

---

## API Reference

All endpoints are prefixed with `/api`.  
Authentication uses `Authorization: Bearer <token>` headers.

### Auth

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/auth/login` | ✗ | Authenticate and receive a signed JWT |

**Login request body:**
```json
{ "username": "admin", "password": "admin123" }
```

**Success response (200):**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "username": "admin", "role": "admin", "name": "..." }
}
```

### Students

| Method | Endpoint | Min Role | Description |
|---|---|---|---|
| GET | `/students` | Any | List all students; supports `?course=`, `?yearLevel=`, `?section=` filters |
| GET | `/students/:id` | Any | Get a single student record |
| POST | `/students` | Admin | Create a new student |
| PUT | `/students/:id` | Admin | Update a student's information |
| DELETE | `/students/:id` | Admin | Permanently delete a student |

### Faculty

| Method | Endpoint | Min Role | Description |
|---|---|---|---|
| GET | `/faculty` | Any | List all faculty members |
| GET | `/faculty/:id` | Any | Get a single faculty member with their schedule details |
| POST | `/faculty` | Admin | Create a faculty record |
| PUT | `/faculty/:id` | Admin | Update faculty information |
| DELETE | `/faculty/:id` | Admin | Delete a faculty record |

### Events

| Method | Endpoint | Min Role | Description |
|---|---|---|---|
| GET | `/events` | Any | List all events |
| POST | `/events` | Faculty/Admin | Create a new event |
| PUT | `/events/:id` | Faculty/Admin | Update an event |
| DELETE | `/events/:id` | Admin | Delete an event |

### Schedules

| Method | Endpoint | Min Role | Description |
|---|---|---|---|
| GET | `/schedules` | Any | List all class schedules (with room and faculty details) |
| POST | `/schedules` | Admin | Create a schedule entry |
| PUT | `/schedules/:id` | Admin | Update a schedule |
| DELETE | `/schedules/:id` | Admin | Delete a schedule |

### Research

| Method | Endpoint | Min Role | Description |
|---|---|---|---|
| GET | `/research` | Any | List all research projects |
| POST | `/research` | Faculty/Admin | Add a research record |
| PUT | `/research/:id` | Faculty/Admin | Update a research record |
| DELETE | `/research/:id` | Admin | Delete a research record |

### Curriculum

| Method | Endpoint | Min Role | Description |
|---|---|---|---|
| GET | `/curriculum` | Any | List curricula (with course lists per program) |
| POST | `/curriculum` | Admin | Create a curriculum version |
| PUT | `/curriculum/:id` | Admin | Update a curriculum |
| DELETE | `/curriculum/:id` | Admin | Delete a curriculum |

### Supporting Resources

| Endpoint | Description |
|---|---|
| GET `/academic-terms` | List academic years and semesters |
| GET `/departments` | List CCS departments |
| GET `/programs` | List degree programs (BSCS, BSIT, etc.) |
| GET `/rooms` | List classrooms/labs |
| GET `/courses` | List course catalogue |
| GET `/health` | Backend liveness check — no auth required |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MySQL** 8.x (running locally or on a reachable server)
- **npm** v9 or higher

---

### 1. Set Up the Database

Start your MySQL server and create the application database:

```sql
CREATE DATABASE acs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Optionally, you can import the full schema and seed data from the included SQL dump:

```bash
mysql -u root -p acs_db < ccs.sql
```

---

### 2. Configure and Start the Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and fill in your credentials:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=acs_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=replace_this_with_a_long_random_string
JWT_EXPIRES_IN=24h

CLIENT_ORIGIN=http://localhost:5173
```

> ⚠️ **JWT_SECRET** must be a long, randomly-generated string in any non-development environment.  
> You can generate one with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

Install dependencies and start:

```bash
npm install

# (Optional) Populate sample data if you did not import ccs.sql
npm run seed

# Development — auto-restarts on file changes via nodemon
npm run dev

# Production
npm start
```

The API will be available at **http://localhost:5000**

---

### 3. Configure and Start the Frontend

```bash
# From the repository root
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

Install dependencies and start:

```bash
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

---

### Default Login Credentials (after seeding)

| Role | Username | Password |
|---|---|---|
| Admin / Registrar | `admin` | `admin123` |
| Faculty | `faculty` | `faculty123` |
| Student | `student` | `student123` |

> ⚠️ Change all default credentials before deploying to any shared or production environment.

---

## Authentication & Security

### How Authentication Works

1. The client sends a `POST /api/auth/login` request with username and password.
2. The backend looks up the user, verifies the password with `bcryptjs.compare`, and — if valid — signs a JWT containing `{ id, username, role }` using `JWT_SECRET`.
3. The token is returned to the client, which stores it in `localStorage` under the key `acs_token`.
4. Subsequent requests include the token in the `Authorization: Bearer <token>` header.  This is attached automatically by the Axios request interceptor in `src/services/api.js`.
5. Every protected route runs the `authenticate` middleware, which verifies the token's signature and expiry.  If valid, `req.user` is populated for downstream handlers.

### Security Measures

| Measure | Implementation | Why |
|---|---|---|
| Password hashing | bcryptjs (cost factor 10) | Passwords are never stored in plain text; bcrypt is slow by design to resist brute-force |
| Stateless auth | JWT | No server-side session storage required; scales horizontally |
| HTTP security headers | Helmet 7 | Prevents clickjacking, MIME sniffing, and cross-site scripting via CSP, X-Frame-Options, etc. |
| Rate limiting | express-rate-limit | Auth route capped at 20 req/15 min; other routes at 300 req/15 min — limits brute-force and DDoS |
| Input validation | express-validator | Rejects malformed or oversized input before it reaches the database |
| Parameterised queries | Sequelize ORM | All SQL is parameterised by default; raw SQL is avoided to prevent injection |
| CORS | Configurable origin | API only accepts requests from the configured `CLIENT_ORIGIN` |

---

## Role-Based Access Control

Access to pages and API operations is enforced at two levels:

1. **Frontend** — the Sidebar only renders navigation items the user's role is allowed to see (defined in `src/constants/auth.js` → `ALLOWED`).
2. **Backend** — route handlers call `authorize("admin")` or `authorize("admin", "faculty")` after `authenticate` to enforce server-side role checks.

| Feature | Admin | Faculty | Student |
|---|---|---|---|
| Dashboard | ✓ | ✓ | ✓ |
| Student Profiles | ✓ full CRUD | ✗ | ✗ |
| Faculty Profiles | ✓ full CRUD | ✓ view own | ✗ |
| Events | ✓ full CRUD | ✓ create/edit | ✓ view |
| Class Scheduling | ✓ full CRUD | ✓ view | ✓ view |
| Research | ✓ full CRUD | ✓ create/edit | ✓ view |
| Curriculum | ✓ full CRUD | ✓ view | ✓ view |
| Search | ✓ | ✗ | ✗ |
| Reports | ✓ | ✗ | ✗ |

---

## Frontend Service Layer

The `src/services/` directory provides a clean separation between UI components and network calls.  Pages import domain-specific service objects rather than writing Axios calls directly, which keeps components readable and makes it trivial to swap the API base URL or mock the services in tests.

### How the Axios client is set up (`src/services/api.js`)

```js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

// Attach JWT automatically to every outgoing request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("acs_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Unwrap the response envelope and normalise errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(new Error(error.response?.data?.message || error.message))
);
```

### Using a service in a component

```js
import { studentsService } from "../services";

// Fetch all students
const students = await studentsService.getAll();

// Filter by course
const bsitStudents = await studentsService.getAll({ course: "BSIT" });

// Create a student (admin only)
await studentsService.create({
  studentNumber: "2025-00001",
  fullName: "Juan dela Cruz",
  course: "BSIT",
  yearLevel: 1,
});

// Update
await studentsService.update("2025-00001", { yearLevel: 2 });

// Delete
await studentsService.remove("2025-00001");
```

---

## Database Design

The database is built around the `member` table, which stores all users (students, faculty, admins) with a `role` discriminator column.  Role-specific data lives in separate tables (`faculty_records`, `student_leave`, etc.) linked via foreign keys to keep the core table lean.

### Key Relationships

```
department ──< program ──< member (students/faculty)
                               │
                    ┌──────────┼──────────────────┐
                    ▼          ▼                  ▼
             schedule    research_project      event
                │              │                 │
         student_schedule  research_member  event_participant
                               
academic_term ──< schedule ──< student_schedule
course ──< curriculum_course >── curriculum ──< program
room ──< schedule
```

### Primary Models

| Model | Table | Description |
|---|---|---|
| Member | `member` | All users; role field = `admin` / `faculty` / `student` |
| Department | `department` | CCS sub-departments |
| Program | `program` | Degree programs (BSCS, BSIT, BSIS, BSEMC) |
| AcademicTerm | `academic_term` | Semester instances with start/end dates |
| Course | `course` | Course catalogue with units and type |
| Curriculum | `curriculum` | A versioned set of required courses for a program |
| Schedule | `schedule` | A class section: course + faculty + room + time + term |
| ResearchProject | `research_project` | Research with status, type, and date range |
| Event | `event` | Campus events with type, date, and location |

---

## License

For academic and educational use only.

