CollegeCommunity
A full-stack, real-time community platform designed for college students and faculty. This application features a modern Matte Black UI and allows for seamless communication, announcement tracking, and event management.

🚀 Features
Real-time Chat: Instant messaging powered by Socket.io with room-based communication.

Role-Based Access (RBAC): Separate permissions for Students and Administrators.

Announcement Feed: A centralized place for faculty to post important updates.

Event Management: View and track upcoming college events and workshops.

Secure Authentication: User login and registration with JWT (JSON Web Tokens) and Bcrypt password hashing.

🛠️ Tech Stack
Frontend
React.js: Component-based UI development.

Tailwind CSS: Custom "Matte Black" styling and responsive design.

Axios: Handling API requests to the backend.

Lucide React: Modern iconography.

Backend
Node.js & Express: Server-side logic and RESTful API endpoints.

MongoDB & Mongoose: NoSQL database for flexible data storage.

Socket.io: WebSockets for real-time, bi-directional communication.

Dotenv: Secure environment variable management.

📁 Project Structure
Plaintext
CollegeCommunity/
├── backend/            # Express server, Models, and API Routes
└── college_community_webapp/   # React Frontend (Vite)
⚙️ Installation & Setup
Clone the Repository:

Bash
git clone https://github.com/divyarajsinhzala/CollegeCommunity.git
Setup Backend:

Navigate to the backend folder.

Run npm install.

Create a .env file and add your MONGO_URI and JWT_SECRET.

Start the server: npm run dev.

Setup Frontend:

Navigate to the college_community_webapp folder.

Run npm install.

Start the development server: npm run dev.

🔒 Security Features
Password Salting: Uses Bcrypt to ensure passwords are never stored in plain text.

Protected Routes: Backend middleware ensures only authorized users can access sensitive API endpoints.

CORS Configuration: Restricts API access to authorized origins for production security.

🌐 Live Demo
You can view the live project here:

Frontend: https://collegecommunity.onrender.com

Backend API: https://collegecommunity-backend.onrender.com
