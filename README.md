<<<<<<< HEAD
# HARINOVA AI

HARINOVA AI is an ultra-premium, futuristic personal productivity platform and AI workspace. Designed with a cinematic glassmorphic aesthetic, it helps users manage tasks, track progress, and organize their workflow through an elegant, fluid interface.

## 🌟 Key Features

=======
# TaskManager
HARINOVA AI is an ultra-premium, futuristic personal productivity platform and AI workspace. Designed with a cinematic glassmorphic aesthetic, it helps users manage tasks, track progress, and organize their workflow through an elegant, fluid interface.
## 🌟 Key Features
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
* **Cinematic Interface:** A stunning, highly polished UI featuring deep glassmorphism, animated aurora backgrounds, and subtle neon glows.
* **Intelligent Dashboard:** View your weekly overview, task completion rates, and active AI-tracked productivity insights at a glance.
* **Fluid Task Board (Kanban):** Effortlessly organize your workflow with a buttery-smooth drag-and-drop task board. Move tasks between *Pending*, *In Progress*, and *Completed* lanes.
* **Dark & Light Mode:** Toggle seamlessly between a high-contrast futuristic dark mode and a remarkably crisp, luxurious light mode.
* **Detailed Task Management:** Set task priorities, visual anchor colors, and strict deadlines.
* **Interactive Animations:** Powered by Framer Motion, every interaction—from page transitions to hover states—feels premium and responsive.
<<<<<<< HEAD

## 🛠️ Tech Stack

=======
## 🛠️ Tech Stack
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
### Frontend
* **React 18** (via Vite)
* **Tailwind CSS** (for utility-first, rapid styling)
* **Framer Motion** (for fluid, complex animations)
* **Redux Toolkit** (for robust state management)
* **Lucide React** (for beautiful, consistent iconography)
* **@hello-pangea/dnd** (for accessible drag-and-drop mechanics)
<<<<<<< HEAD

=======
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
### Backend
* **Node.js & Express** (RESTful API architecture)
* **MongoDB & Mongoose** (NoSQL Database for flexible data modeling)
* **JSON Web Tokens (JWT)** (Secure user authentication)
* **Bcrypt.js** (Password hashing)
<<<<<<< HEAD

## 🚀 Getting Started

Follow these steps to set up HARINOVA AI on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/harinova-ai.git
cd harinova-ai
```

### 2. Install Dependencies
You will need to install dependencies for both the frontend (client) and the backend (server).

=======
## 🚀 Getting Started
Follow these steps to set up HARINOVA AI on your local machine.
### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.
### 1. Clone the repository
```bash
git clone https://github.com/HarinathSasikumar/harinova-ai.git
cd harinova-ai
```
### 2. Install Dependencies
You will need to install dependencies for both the frontend (client) and the backend (server).
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
**Install Server Dependencies:**
```bash
cd server
npm install
```
<<<<<<< HEAD

=======
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
**Install Client Dependencies:**
```bash
cd ../client
npm install
```
<<<<<<< HEAD

### 3. Environment Variables
Create a `.env` file inside the `server/` directory and add your configurations:

=======
### 3. Environment Variables
Create a `.env` file inside the `server/` directory and add your configurations:
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```
<<<<<<< HEAD

Create a `.env` file inside the `client/` directory and add your backend URL:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the Application

=======
Create a `.env` file inside the `client/` directory and add your backend URL:
```env
VITE_API_URL=http://localhost:5000/api
```
### 4. Run the Application
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
**Start the Backend Server:**
```bash
# From the /server directory
npm run dev
```
<<<<<<< HEAD

=======
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
**Start the Frontend Development Server:**
```bash
# From the /client directory
npm run dev
```
<<<<<<< HEAD

The application should now be running on `http://localhost:5173`.

## 🎨 Design Philosophy
HARINOVA AI was built to escape the boring, flat look of traditional productivity apps. By utilizing layered shadows, CSS mix-blend modes, and dynamic gradients, the platform feels more like a cinematic sci-fi interface than a standard web app, ensuring that organizing your life feels less like a chore and more like an experience.

=======
The application should now be running on `http://localhost:5173`.
## 🎨 Design Philosophy
HARINOVA AI was built to escape the boring, flat look of traditional productivity apps. By utilizing layered shadows, CSS mix-blend modes, and dynamic gradients, the platform feels more like a cinematic sci-fi interface than a standard web app, ensuring that organizing your life feels less like a chore and more like an experience.
>>>>>>> ab3409d12bb3da54355747677a2901d4f7030cd0
## 📄 License
This project is licensed under the MIT License.
