# 🚀 WorkWave – Professional Talent Marketplace & Recruitment Platform

**Live Demo:** https://www.workwave.in

WorkWave is a full-stack talent marketplace and workforce collaboration platform that connects recruiters, businesses, and skilled professionals in a secure and efficient digital ecosystem.

Unlike traditional freelancing platforms, WorkWave introduces a controlled communication workflow where recruiters and professionals can initially exchange limited messages before payment. Once a project is approved and payment is completed, both parties gain unrestricted access to real-time communication and collaboration tools. This approach helps protect users, reduce spam, and ensure genuine project engagements.

The platform acts as a trusted intermediary, where all project transactions are managed through the platform, providing accountability, transparency, and secure payment handling for both recruiters and professionals.

---

## ✨ Key Features

### 🔐 Authentication & Security

* Secure User Registration & Login
* JWT-Based Authentication
* Role-Based Authorization
* Protected Routes
* Password Reset via Email
* Secure Session Management

### 👤 User Profiles

* Recruiter Profiles
* Professional Profiles
* Portfolio Showcase
* Skills Management
* Profile Editing & Updates

### 💼 Opportunity & Project Management

* Create Opportunities
* Publish Projects
* Edit Existing Listings
* Browse Available Opportunities
* Advanced Search & Filtering
* Featured Opportunities

### 💬 Smart Communication System

* Real-Time Messaging with Socket.io
* Recruiter–Professional Conversations
* Instant Message Delivery
* Conversation History
* Secure Communication Channels

### 🛡 Controlled Contact Access

One of WorkWave's most distinctive features is its communication protection system:

* Recruiters and professionals can communicate through limited messaging before payment.
* Direct contact information remains protected during the initial discussion phase.
* Once payment is successfully completed, unrestricted communication becomes available.
* Both parties can collaborate freely throughout the project lifecycle.
* Helps prevent spam, fake inquiries, and off-platform transactions.

### 💳 Secure Payment Workflow

* Platform-Mediated Transactions
* Project Payment Management
* Payment Verification
* Order Tracking
* Transaction Transparency

WorkWave serves as the trusted intermediary responsible for managing project transactions, creating a safer environment for both recruiters and professionals.

### ⭐ Review & Reputation System

* Professional Reviews
* Recruiter Feedback
* Rating System
* Reputation Building
* Trust Indicators

### 📧 Email Services

* Password Recovery Emails
* User Notifications
* Project Updates
* Account Communication

### 📱 Responsive User Experience

* Fully Responsive Design
* Mobile-Friendly Interface
* Modern User Experience
* Fast Navigation
* Optimized Performance

---

## ⚡ Real-Time Technology

WorkWave utilizes **Socket.io** to power its real-time communication infrastructure.

Features include:

* Instant Messaging
* Live Conversation Updates
* Real-Time User Interactions
* Fast Event Synchronization
* Improved User Engagement

This architecture provides a seamless communication experience similar to modern collaboration platforms.

---

## 🛠 Technology Stack

### Frontend

* React.js
* Vite
* Redux
* Axios
* SCSS
* Tailwind CSS
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Nodemailer
* Socket.io

### Database

* MongoDB Atlas

### 📁 Project Structure

```bash
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
│   │
│   ├── middleware
│   │   └── jwt.js
│   │
│   ├── models
│   │   ├── user.model.js
│   │   ├── gig.model.js
│   │   ├── order.model.js
│   │   ├── review.model.js
│   │   ├── conversation.model.js
│   │   └── message.model.js
│   │
│   ├── routes
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── gig.route.js
│   │   ├── order.route.js
│   │   ├── review.route.js
│   │   ├── conversation.route.js
│   │   └── message.route.js
│   │
│   ├── utils
│   │   ├── createError.js
│   │   └── sendEmail.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── client
│   ├── public
│   │   └── img
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── navbar
│   │   │   ├── footer
│   │   │   ├── featured
│   │   │   ├── gigCard
│   │   │   ├── projectCard
│   │   │   ├── review
│   │   │   ├── reviews
│   │   │   ├── slide
│   │   │   ├── trustedBy
│   │   │   ├── checkoutForm
│   │   │   └── ProtectedRoutes
│   │   │
│   │   ├── pages
│   │   │   ├── home
│   │   │   ├── gigs
│   │   │   ├── gig
│   │   │   ├── add
│   │   │   ├── editGig
│   │   │   ├── login
│   │   │   ├── register
│   │   │   ├── profile
│   │   │   ├── orders
│   │   │   ├── messages
│   │   │   ├── message
│   │   │   ├── myGigs
│   │   │   ├── pay
│   │   │   ├── success
│   │   │   ├── forgotPassword
│   │   │   └── resetPassword
│   │   │
│   │   ├── reducers
│   │   ├── hooks
│   │   ├── utils
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
### Architecture Overview

- Frontend: React + Vite + Redux + Socket.io Client
- Backend: Node.js + Express.js + JWT Authentication
- Database: MongoDB Atlas
- Real-Time Communication: Socket.io
- Email Service: Nodemailer
- Deployment: Vercel + MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📌 Core Modules

### Authentication

* User Registration
* Login & Logout
* Password Recovery
* Email Verification

### User Management

* Recruiter Dashboard
* Professional Dashboard
* Profile Management

### Project Management

* Create Projects
* Manage Opportunities
* Browse Opportunities

### Messaging System

* Real-Time Chat
* Conversations
* Message Management

### Reviews & Ratings

* Feedback System
* Reputation Management

### Payment Workflow

* Project Transactions
* Payment Verification
* Order Management

---

## 🎯 Project Goals

* Create a trusted digital hiring ecosystem.
* Simplify recruiter-professional collaboration.
* Provide secure communication channels.
* Enable transparent project transactions.
* Deliver a real-time and responsive user experience.

---

## 👨‍💻 Developed By

**Aryan Singh**

Full Stack MERN Developer

### Skills Demonstrated

* Full-Stack Development
* REST API Development
* Authentication & Authorization
* Real-Time Systems with Socket.io
* MongoDB Database Design
* Payment Workflow Implementation
* Responsive UI/UX Design
* State Management
* Secure Web Application Architecture

---

## 🌐 Live Project

https://www.workwave.in

If you find this project interesting, consider giving it a ⭐ on GitHub.
