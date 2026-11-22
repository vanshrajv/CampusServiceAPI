# CampusServiceAPI 🚀

**Campus Service Request & Issue Management System**

CampusServiceAPI is a backend REST API developed using Node.js, Express.js, and MongoDB. It helps students submit and manage campus-related complaints and allows administrators to manage and track complaints efficiently.

## 🚀 Features

- Student and Admin Authentication
- JWT-Based Authentication
- Role-Based Access Control (RBAC)
- Create New Complaints
- View All Complaints
- Update Complaint Details
- Delete Complaints
- Complaint Status Management
- Search and Filter Complaints
- Admin Dashboard Statistics
- Secure API Middleware

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend Runtime |
| Express.js | REST API Framework |
| MongoDB | Database |
| Mongoose | Database Modeling |
| JWT | Authentication |
| bcrypt | Password Hashing |
| dotenv | Environment Variables |
| Postman | API Testing |

## 📂 Project Structure

```text
CampusServiceAPI/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── Complaint.js
│
├── controllers/
│   ├── authController.js
│   └── complaintController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── complaintRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Installation and Setup

### 1. Clone Repository

```bash
git clone https://github.com/Vanshrajv/NextJS-Projects.git
```

### 2. Open Project Folder

```bash
cd NextJS-Projects/CampusServiceAPI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

### 5. Start Server

```bash
npm start
```

For development:

```bash
npm run dev
```

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

### Complaints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/complaints` | Create Complaint |
| GET | `/api/complaints` | Get Complaints |
| GET | `/api/complaints/:id` | Get Single Complaint |
| PUT | `/api/complaints/:id` | Update Complaint |
| DELETE | `/api/complaints/:id` | Delete Complaint |

*Note: Endpoints should match the actual routes implemented in the project.*

## 🧪 API Testing

API endpoints can be tested using **Postman**.

Testing includes:
- User Registration
- User Login
- JWT Authentication
- Complaint Creation
- Complaint Management
- Admin Authorization

## 🔐 Security

- Password Hashing
- JWT Authentication
- Role-Based Authorization
- Protected API Routes
- Environment Variable Configuration

## 👨‍💻 Developer

**Vansh Raj**

B.Tech – Computer Science and Engineering

GitHub: [Vanshrajv](https://github.com/Vanshrajv)

## 📄 License

This project is created for educational and academic purposes.
