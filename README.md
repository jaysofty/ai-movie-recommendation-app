# 🎬 PopChoice — AI Movie Recommendation App

PopChoice is an AI-powered movie recommendation app that helps users discover movies based on their preferences, interests, and viewing mood.

## ✨ Features

* 🎯 Personalized movie recommendations
* 🤖 AI-powered recommendation engine
* 🔎 Movie preference-based search
* 🧠 Semantic/vector search for better recommendations
* ⚡ Fast React + Vite frontend
* 🔐 Secure backend API
* ☁️ Supabase database and vector storage
* 🚀 Vercel frontend + Render backend deployment

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* JavaScript
* Tailwind CSS

**Backend**

* Node.js
* Express.js
* OpenAI-compatible AI API
* Hugging Face Transformers

**Database & Infrastructure**

* Supabase PostgreSQL
* pgvector
* Vercel
* Render

## 📁 Project Structure

```text
ai-movie-recommendation-app/
├── web/                 # React/Vite frontend
├── src/                
├── package.json
└── README.md

├── api/               
├── src/                 # Express backend
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jaysofty/ai-movie-recommendation-app.git
cd ai-movie-recommendation-app
```

### 2. Install dependencies

```bash
npm install
```

For the frontend:

```bash
cd web
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your required API, Supabase, and AI credentials.

### 4. Run the app

Start the backend:

```bash
cd api
npm run dev
```

Start the frontend:

```bash
cd web
npm run dev
```

## 🎯 Goal

PopChoice demonstrates how AI, embeddings, vector search, and modern web technologies can be combined to build a personalized movie discovery experience.

## 📄 License

This project is for learning and development purposes.
