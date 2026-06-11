# WorkWave — Talent Marketplace

**Live Demo:** [workwave.in](https://www.workwave.in)

WorkWave is a full-stack talent marketplace that connects recruiters and skilled professionals through a secure, payment-gated communication workflow, real-time messaging, and transparent project management.

Unlike traditional freelancing platforms, WorkWave introduces a **controlled contact system** — recruiters and professionals can exchange limited messages before payment. Once a project is approved and payment is completed, both parties unlock unrestricted real-time communication and collaboration. This protects users, eliminates spam, and ensures genuine project engagements.

---

## ✨ Features

### Authentication & Security
- Secure registration and login
- JWT-based authentication
- Role-based authorization and protected routes
- Password reset via email
- Secure session management

### User Profiles
- Recruiter and professional profiles
- Portfolio showcase and skills management
- Profile editing and updates

### Opportunity & Project Management
- Create, publish, and edit opportunities
- Browse and filter available listings
- Featured opportunity placements
- Advanced search functionality

### Smart Communication System
- Real-time messaging powered by Socket.io
- Instant message delivery and conversation history
- Secure, channel-based communication

### Controlled Contact Access
One of WorkWave's most distinctive features:
- Limited messaging is available before payment
- Direct contact details remain protected during the initial phase
- Full communication unlocks after successful payment
- Prevents spam, fake inquiries, and off-platform transactions

### Secure Payment Workflow
- Platform-mediated project transactions
- Payment verification and order tracking
- Full transaction transparency
- WorkWave acts as a trusted intermediary

### Reviews & Reputation
- Post-project ratings and written reviews
- Trust indicators and reputation scores for both roles

### Email Notifications
- Password recovery
- Project updates and account alerts

### Responsive Design
- Fully responsive, mobile-friendly interface
- Optimized performance and fast navigation

---

## 🛠 Technology Stack

### Frontend
- React.js + Vite
- Redux
- Tailwind CSS + SCSS
- Axios
- Socket.io Client

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Bcrypt
- Nodemailer
- Socket.io

### Infrastructure
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 📁 Project Structure

```
WORKWAVE-MAIN
│
├── api
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
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── client
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
| Email | Nodemailer |
| Deployment | Vercel + Render + MongoDB Atlas |

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
- Full-stack web development
- REST API design and implementation
- Authentication and authorization systems
- Real-time communication with Socket.io
- MongoDB schema design
- Payment workflow implementation
- Responsive UI/UX design
- State management with Redux
- Secure web application architecture

---

## 🌐 Live Project

[https://www.workwave.in](https://www.workwave.in)

If you find this project useful, consider giving it a ⭐ on GitHub.
