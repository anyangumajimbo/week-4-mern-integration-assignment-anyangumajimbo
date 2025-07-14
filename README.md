✅ Great — let's revise your `README.md` to reflect the **actual project you’ve built**, while keeping a professional and submission-ready tone.

Here's the **edited and improved version** of your `README.md`:

---

```markdown
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19922070&assignment_repo_type=AssignmentRepo)

# 📰 MERN Blog Application – Full Stack Integration Assignment

This project is a full-stack **MERN blog application** built as part of the PLP Academy Week 4 assignment. It demonstrates full integration between MongoDB, Express.js, React.js, and Node.js, along with user authentication and core blog features.

---

## 🚀 Features Implemented

- ✅ Create, Read, Update, and Delete (CRUD) blog posts
- ✅ Category management
- ✅ User authentication (Register & Login)
- ✅ Frontend with React + Tailwind CSS v4
- ✅ Backend API with Express & Mongoose
- ✅ MongoDB Atlas integration
- ✅ Clean project structure for both client & server

---

## 📁 Project Structure

```

mern-blog/
├── client/                 # React + Vite front-end
│   ├── src/
│   │   ├── pages/          # Posts, Create, Edit views
│   │   ├── services/       # Axios API calls
│   │   └── App.jsx         # App routing
│   └── .env.example        # Client env sample
├── server/                 # Express + MongoDB back-end
│   ├── models/             # Mongoose models (User, Post, Category)
│   ├── routes/             # API routes (auth, posts, categories)
│   ├── server.js           # App entry point
│   └── .env.example        # Server env sample
└── README.md               # Project documentation

````

---

## ⚙️ Technologies Used

- **Frontend**: React, Tailwind CSS v4, Axios, React Router
- **Backend**: Express.js, Node.js, MongoDB Atlas, Mongoose
- **Auth**: JWT-based authentication
- **Tools**: Vite, pnpm, Git, GitHub Classroom

---

## 🛠️ Setup Instructions

### 🔌 Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git + terminal
- pnpm or npm

---

### 📦 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
````

---

### 🔧 2. Set Up the Server

```bash
cd server
cp .env.example .env      # Set your MongoDB URI & JWT secrets
pnpm install
pnpm run dev              # Starts backend on http://localhost:5000
```

---

### 🌐 3. Set Up the Client

```bash
cd ../client
cp .env.example .env      # (Optional: Set VITE_API_URL)
pnpm install
pnpm run dev              # Starts frontend on http://localhost:3000
```

---

## 📖 API Documentation

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/posts`         | Get all blog posts    |
| GET    | `/api/posts/:id`     | Get a single post     |
| POST   | `/api/posts`         | Create a new post     |
| PUT    | `/api/posts/:id`     | Update a post         |
| DELETE | `/api/posts/:id`     | Delete a post         |
| GET    | `/api/categories`    | Get all categories    |
| POST   | `/api/categories`    | Create a category     |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and get a token |

---

## 🖼️ Screenshots

> Add screenshots here by dragging them into the repo or using Markdown:

```
![Home Page](screenshots/home.png)
![Create Post](screenshots/create.png)
```

---

## ✅ Assignment Completion Status

| Task                                    | Status         |
| --------------------------------------- | -------------- |
| Project structure & setup               | ✅ Done         |
| MongoDB + Express + React + Node.js     | ✅ Done         |
| CRUD operations (Posts)                 | ✅ Done         |
| Category endpoints                      | ✅ Done         |
| User authentication                     | ✅ Done         |
| Front-end forms + routing               | ✅ Done         |
| Delete/Edit buttons in post list        | ✅ Done         |
| `.env.example` files                    | ✅ Done         |
| README with setup instructions          | ✅ Done         |
| Optional: Pagination, Comments, Uploads | ❌ Not required |

---

## 📚 Resources

* [MongoDB Docs](https://docs.mongodb.com/)
* [Express.js Docs](https://expressjs.com/)
* [React Docs](https://react.dev/)
* [Node.js Docs](https://nodejs.org/en/docs/)
* [Mongoose Docs](https://mongoosejs.com/docs/)

---

## 👨‍💻 Author

Built with ❤️ by **Majimbo Anyangu** – Week 4 PLP MERN Integration

---
