# 🔗 LinkPulse

LinkPulse is a full-stack URL shortener and link analytics platform that allows users to create, manage, and track shortened URLs with click analytics.

The project uses a modern frontend and backend architecture with PostgreSQL for persistent data storage, Redis for caching, and Docker for containerized services.

---

## 🚀 Features

- 🔗 Create short URLs from long URLs
- ✏️ Create custom short codes
- 📊 Track link click analytics
- 🔄 Redirect users through shortened links
- 🗑️ Delete shortened links
- ⚡ Redis-based caching
- 🗄️ PostgreSQL database
- 🚦 API rate limiting
- 📦 Background click processing using queues
- 🐳 Docker support
- 🌐 REST API architecture

---

## 🛠️ Tech Stack

### Frontend
- React / Next.js
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- Sequelize ORM
- REST APIs

### Database & Services
- PostgreSQL
- Redis
- BullMQ

### DevOps & Tools
- Docker
- Git & GitHub
- Postman
- VS Code

---

## 📁 Project Structure

```text
LinkPulse/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── server.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── docker-compose.yml
├── .gitignore
└── README.md