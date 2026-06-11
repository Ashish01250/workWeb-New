# WorkWave — Talent Marketplace

**Live Demo:** [workwave.in](https://www.workwave.in) &nbsp;|&nbsp; **Repository:** [github.com/Ashish01250/workWeb-New](https://github.com/Ashish01250/workWeb-New)

WorkWave is a full-stack talent marketplace that connects recruiters and skilled professionals through a secure, payment-gated communication workflow, real-time messaging, and transparent project management.

Unlike traditional freelancing platforms, WorkWave introduces a **controlled contact system** — recruiters and professionals can exchange limited messages before payment. Once a project is approved and payment is completed, both parties unlock unrestricted real-time communication and collaboration. This protects users, eliminates spam, and ensures genuine project engagements.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Architecture Overview](#-architecture-overview)
- [Project Goals](#-project-goals)
- [Developed By](#-developed-by)

---

## ✨ Features

### 🔐 Authentication & Security
- Secure registration and login
- JWT-based authentication
- Role-based authorization and protected routes
- Password reset via email
- Secure session management

### 👤 User Profiles
- Recruiter and professional profiles
- Portfolio showcase and skills management
- Profile editing and updates

### 💼 Opportunity & Project Management
- Create, publish, and edit opportunities
- Browse and filter available listings
- Featured opportunity placements
- Advanced search and filtering

### 💬 Smart Communication System
- Real-time messaging powered by Socket.io
- Instant message delivery and conversation history
- Secure, channel-based communication
- Live conversation updates and fast event synchronization

### 🛡 Controlled Contact Access
One of WorkWave's most distinctive features:
- Limited messaging available before payment
- Direct contact details remain protected during the initial phase
- Full, unrestricted communication unlocks after successful payment
- Both parties can collaborate freely throughout the project lifecycle
- Prevents spam, fake inquiries, and off-platform transactions

### 💳 Secure Payment Workflow
- Platform-mediated project transactions
- Payment verification and order tracking
- Full transaction transparency
- WorkWave acts as a trusted intermediary for all payments

### ⭐ Reviews & Reputation
- Post-project ratings and written reviews
- Trust indicators and reputation scores for both recruiters and professionals
- Reputation building over time

### 📧 Email Notifications
- Password recovery emails
- Project update alerts
- Account communication via SendGrid

### 📱 Responsive Design
- Fully responsive, mobile-friendly interface
- Modern UI/UX built with Tailwind CSS and SCSS
- Optimized performance and fast navigation

---

## 🛠 Technology Stack

### Frontend
- React.js + Vite
- Redux (state management)
- Tailwind CSS + SCSS
- Axios
- Socket.io Client

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Bcrypt
- Nodemailer / SendGrid
- Cloudinary (media uploads)
- Socket.io

### Infrastructure
| Service | Provider |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
| Email | SendGrid |

---

## 🚀 Getting Started

Follow these steps to run WorkWave locally on your machine.

### Prerequisites

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- A [Cloudinary](https://cloudinary.com/) account (free tier works)
- A [Stripe](https://stripe.com/) account for payment keys
- A [SendGrid](https://sendgrid.com/) account for email services

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Ashish01250/workWeb-New.git
cd workWeb-New
```

### Step 2 — Install Backend Dependencies

```bash
cd api
npm install
```

### Step 3 — Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## 🔑 Environment Variables

### Backend — create a `.env` file inside the `api` folder

```bash
cd api
touch .env
```

Add the following variables to `api/.env`:

```env
# Server
PORT=8800

# MongoDB
MONGO_URI=your_mongodb_atlas_connection_string

# JWT
JWT_KEY=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_verified_sender_email@example.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend — create a `.env` file inside the `client` folder

```bash
cd client
touch .env
```

Add the following to `client/.env`:

```env
VITE_API_URL=http://localhost:8800/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> ⚠️ Never commit your `.env` files to GitHub. Make sure `.env` is listed in your `.gitignore`.

---

## ▶ Running the Project

You need **two terminals** — one for the backend and one for the frontend.

### Terminal 1 — Start the Backend

```bash
cd api
npm start
```

The backend will run at: `http://localhost:8800`

### Terminal 2 — Start the Frontend

```bash
cd client
npm run dev
```

The frontend will run at: `http://localhost:5173`

Open your browser and visit **http://localhost:5173** to use WorkWave locally.

---

## 📁 Project Structure

```
workWeb-New
│
├── api                         # Backend (Node.js + Express)
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── conversation.controller.js
│   │   ├── gig.controller.js
│   │   ├── message.controller.js
│   │   ├── order.controller.js
│   │   ├── review.controller.js
│   │   └── user.controller.js
│   ├── middleware
│   │   └── jwt.js
│   ├── models
│   │   ├── user.model.js
│   │   ├── gig.model.js
│   │   ├── order.model.js
│   │   ├── review.model.js
│   │   ├── conversation.model.js
│   │   └── message.model.js
│   ├── routes
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── gig.route.js
│   │   ├── order.route.js
│   │   ├── review.route.js
│   │   ├── conversation.route.js
│   │   └── message.route.js
│   ├── utils
│   │   ├── createError.js
│   │   └── sendEmail.js
│   ├── .env                    # Backend environment variables (not committed)
│   ├── package.json
│   └── server.js
│
└── client                      # Frontend (React + Vite)
    ├── public
    │   └── img
    └── src
        ├── components
        │   ├── navbar
        │   ├── footer
        │   ├── featured
        │   ├── gigCard
        │   ├── projectCard
        │   ├── review
        │   ├── reviews
        │   ├── slide
        │   ├── trustedBy
        │   ├── checkoutForm
        │   └── ProtectedRoutes
        ├── pages
        │   ├── home
        │   ├── gigs
        │   ├── gig
        │   ├── add
        │   ├── editGig
        │   ├── login
        │   ├── register
        │   ├── profile
        │   ├── orders
        │   ├── messages
        │   ├── message
        │   ├── myGigs
        │   ├── pay
        │   ├── success
        │   ├── forgotPassword
        │   └── resetPassword
        ├── reducers
        ├── hooks
        ├── utils
        ├── socket.js
        ├── App.jsx
        └── main.jsx
```

---

## 🏗 Architecture Overview

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Redux + Socket.io Client |
| Backend | Node.js + Express.js + JWT Authentication |
| Database | MongoDB Atlas |
| Real-time | Socket.io |
| Media Uploads | Cloudinary |
| Email | SendGrid / Nodemailer |
| Payments | Stripe |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🎯 Project Goals

- Build a trusted digital hiring ecosystem
- Simplify recruiter–professional collaboration
- Protect communication until genuine project intent is confirmed
- Enable transparent, platform-managed transactions
- Deliver a real-time, responsive user experience

---

## 👨‍💻 Developed By

**Aryan Singh** — Full-Stack MERN Developer

**Skills demonstrated:**
- Full-stack web development (MERN)
- REST API design and implementation
- Authentication and authorization systems
- Real-time communication with Socket.io
- MongoDB schema design
- Payment workflow implementation with Stripe
- Media management with Cloudinary
- Email service integration with SendGrid
- Responsive UI/UX design
- State management with Redux
- Secure web application architecture

---

## 🌐 Live Project

[https://www.workwave.in](https://www.workwave.in)

If you find this project useful, consider giving it a ⭐ on GitHub.
