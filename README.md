# Services

A modern and responsive service booking platform that connects customers with professional technicians for home repair and maintenance services.

Services is designed with a simple, maintainable architecture that provides a smooth experience across mobile phones, tablets, laptops, and desktops.

---

## 🚀 Project Overview

Services is a full-stack web platform where customers can:

* Browse available services
* Book repair and maintenance services
* Track service requests
* Register as technicians
* Manage services through an admin portal

The project is built with a clean separation between frontend, backend, and admin systems to make future updates and maintenance easier.

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* TypeScript (TSX)
* Tailwind CSS
* Responsive UI design

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT Authentication

## Admin Portal

* Next.js
* TypeScript
* Tailwind CSS

## Database

* MongoDB Atlas

---

# 📂 Project Structure

```text
services/

│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── data/
│   │   ├── lib/
│   │   ├── styles/
│   │   └── types/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
│
├── admin/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── README.md
├── package.json
└── .gitignore
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/bejjamshivakumar90-cyber/services.git
```

Go into the project folder:

```bash
cd services
```

---

# Backend Setup

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

---

# Admin Portal Setup

Open another terminal:

```bash
cd admin
```

Install dependencies:

```bash
npm install
```

Start admin portal:

```bash
npm run dev
```

---

# 🔐 Environment Variables

Never upload sensitive information to GitHub.

Required environment variables:

| Variable    | Purpose                           |
| ----------- | --------------------------------- |
| MONGODB_URI | MongoDB Atlas database connection |
| JWT_SECRET  | Authentication security           |
| PORT        | Backend server port               |

---

# ✨ Main Features

## Customer Features

* Service browsing
* Service booking
* Booking tracking
* User profile management

## Technician Features

* Technician registration
* Technician profile
* Service availability management

## Admin Features

* Manage users
* Manage technicians
* Manage services
* Manage bookings

---

# 🎯 Development Principles

This project focuses on:

* Simple and maintainable code structure
* Clean separation of frontend, backend, and admin
* Responsive design for all screen sizes
* Premium and user-friendly interface
* Scalable backend architecture

---

# 🔮 Future Improvements

Planned improvements:

* Online payment integration
* Real-time booking status updates
* Customer reviews and ratings
* Notifications
* Mobile application
* Advanced analytics dashboard

---

# 📌 Current Status

The project is under active development.

Current development focus:

* Backend API completion
* Frontend and backend integration
* Admin dashboard improvements
* User and technician workflows

---

# 👨‍💻 Project

**Services**

Built using Next.js, Node.js, Express.js, and MongoDB Atlas.
