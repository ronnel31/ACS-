# ACS – Academic Profiling System

**IT and CS Academic Profiling System** for the College of Computing Studies.  
Manages student profiles, faculty records, class schedules, events, research, and curriculum.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React.js** | 18.x | UI component library |
| **Vite** | 5.x | Build tool & dev server |
| **React DOM** | 18.x | DOM rendering |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.x | REST API framework |
| **Sequelize** | 6.x | ORM (Object-Relational Mapper) |
| **bcryptjs** | 2.x | Password hashing |
| **jsonwebtoken** | 9.x | JWT authentication |
| **express-validator** | 7.x | Request validation |
| **cors** | 2.x | Cross-Origin Resource Sharing |
| **dotenv** | 16.x | Environment variable management |

### Database
| Technology | Purpose |
|---|---|
| **MySQL 8.x** | Primary relational database |
| **Sequelize ORM** | Schema definition, migrations, queries |

### Dev Tools
| Tool | Purpose |
|---|---|
| **nodemon** | Auto-restart backend on file changes |
| **Vite** | Hot Module Replacement for frontend |

---

## Project Structure

```
ACS-/
├── src/                        # React frontend source
│   ├── components/             # Reusable UI components
│   ├── pages/                  # Page-level components
│   ├── constants/              # App config & static/mock data
│   ├── services/               # API service layer (frontend → backend)
│   │   ├── api.js              # Base fetch wrapper with JWT auth
│   │   ├── auth.js             # Login API calls
│   │   ├── students.js         # Students CRUD API calls
│   │   ├── faculty.js          # Faculty CRUD API calls
│   │   ├── events.js           # Events CRUD API calls
│   │   ├── schedules.js        # Schedules CRUD API calls
│   │   ├── research.js         # Research CRUD API calls
│   │   └── curriculum.js       # Curriculum CRUD API calls
│   └── utils/                  # Helper utilities
│
├── backend/                    # Node.js + Express backend
│   ├── config/
│   │   └── database.js         # Sequelize + MySQL connection
│   ├── models/                 # Sequelize data models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Faculty.js
│   │   ├── Event.js
│   │   ├── Schedule.js
│   │   ├── Research.js
│   │   └── Curriculum.js
│   ├── routes/                 # Express route handlers
│   │   ├── auth.js             # POST /api/auth/login
│   │   ├── students.js         # CRUD /api/students
│   │   ├── faculty.js          # CRUD /api/faculty
│   │   ├── events.js           # CRUD /api/events
│   │   ├── schedules.js        # CRUD /api/schedules
│   │   ├── research.js         # CRUD /api/research
│   │   └── curriculum.js       # CRUD /api/curriculum
│   ├── middleware/
│   │   └── auth.js             # JWT authentication & role-based authorization
│   ├── seeders/
│   │   └── seed.js             # Seed database with sample data
│   ├── server.js               # Express app entry point
│   ├── package.json
│   └── .env.example            # Environment variables template
│
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Frontend dependencies
└── .env.example                # Frontend environment variables template
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ✗ | Login and receive JWT token |
| GET | `/api/students` | ✓ | List all students (with optional filters) |
| GET | `/api/students/:id` | ✓ | Get a single student |
| POST | `/api/students` | Admin | Create a student |
| PUT | `/api/students/:id` | Admin | Update a student |
| DELETE | `/api/students/:id` | Admin | Delete a student |
| GET | `/api/faculty` | ✓ | List all faculty members |
| GET | `/api/faculty/:id` | ✓ | Get a single faculty member |
| POST | `/api/faculty` | Admin | Create a faculty member |
| PUT | `/api/faculty/:id` | Admin | Update a faculty member |
| DELETE | `/api/faculty/:id` | Admin | Delete a faculty member |
| GET | `/api/events` | ✓ | List all events |
| POST | `/api/events` | Admin/Faculty | Create an event |
| PUT | `/api/events/:id` | Admin/Faculty | Update an event |
| DELETE | `/api/events/:id` | Admin | Delete an event |
| GET | `/api/schedules` | ✓ | List all schedules |
| POST | `/api/schedules` | Admin | Create a schedule |
| PUT | `/api/schedules/:id` | Admin | Update a schedule |
| DELETE | `/api/schedules/:id` | Admin | Delete a schedule |
| GET | `/api/research` | ✓ | List all research records |
| POST | `/api/research` | Admin/Faculty | Add research |
| PUT | `/api/research/:id` | Admin/Faculty | Update research |
| DELETE | `/api/research/:id` | Admin | Delete research |
| GET | `/api/curriculum` | ✓ | List curricula |
| POST | `/api/curriculum` | Admin | Create curriculum |
| PUT | `/api/curriculum/:id` | Admin | Update curriculum |
| DELETE | `/api/curriculum/:id` | Admin | Delete curriculum |
| GET | `/api/health` | ✗ | Backend health check |

---

## Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MySQL** 8.x running locally (or a remote MySQL server)
- **npm** v9 or higher

---

### 1. Set Up the Database

1. Start your MySQL server.
2. Create the database:
   ```sql
   CREATE DATABASE acs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

### 2. Configure the Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your MySQL credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=acs_db
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=24h
CLIENT_ORIGIN=http://localhost:5173
```

Install backend dependencies:
```bash
npm install
```

Seed the database with sample data:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev      # development (auto-restart with nodemon)
# or
npm start        # production
```

The API will be available at **http://localhost:5000**

---

### 3. Configure the Frontend

```bash
# from the root of the project
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

Install frontend dependencies:
```bash
npm install
```

Start the development server:
```bash
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

> ⚠️ **Change these credentials immediately in any production deployment.**

---

## Role-Based Access

| Feature | Admin | Faculty | Student |
|---|---|---|---|
| Dashboard | ✓ | ✓ | ✓ |
| Student Profiles | ✓ (full CRUD) | ✗ | ✗ |
| Faculty Profiles | ✓ (full CRUD) | ✓ (view own) | ✗ |
| Events | ✓ (full CRUD) | ✓ (create/edit) | ✓ (view) |
| Class Scheduling | ✓ (full CRUD) | ✓ (view) | ✓ (view) |
| Research | ✓ (full CRUD) | ✓ (create/edit) | ✓ (view) |
| Curriculum | ✓ (full CRUD) | ✓ (view) | ✓ (view) |
| Search | ✓ | ✗ | ✗ |
| Reports | ✓ | ✗ | ✗ |

---

## Using the API Service Layer

The `src/services/` directory provides a clean abstraction over the REST API.  
Each page can import the relevant service instead of writing raw `fetch` calls:

```js
import { studentsService } from "../services";

// Fetch all students
const students = await studentsService.getAll();

// Filter by course
const bsitStudents = await studentsService.getAll({ course: "BSIT" });

// Create a new student (admin only)
const newStudent = await studentsService.create({ studentNumber: "2025-00001", fullName: "Juan dela Cruz", course: "BSIT" });
```

Authentication tokens are stored in `localStorage` under `acs_token` and attached automatically to every request.

---

## License

For academic and educational use only.
