import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// User Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CommunityFeed from "./pages/CommunityFeed";
import Events from "./pages/Events";
import Clubs from "./pages/Clubs";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat"; // Import Chat

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminEvents from "./admin/AdminEvents";
import AdminPosts from "./admin/AdminPosts";
import AdminAnnouncements from "./admin/AdminAnnouncements";

// Student Guard: Prevents logged-out users from accessing dashboard
const StudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Guard: Prevents students from accessing admin routes
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Student/User Routes */}
        <Route path="/dashboard" element={<StudentRoute><Dashboard /></StudentRoute>} />
        <Route path="/community" element={<StudentRoute><CommunityFeed /></StudentRoute>} />
        <Route path="/events" element={<StudentRoute><Events /></StudentRoute>} />
        <Route path="/clubs" element={<StudentRoute><Clubs /></StudentRoute>} />
        <Route path="/announcements" element={<StudentRoute><Announcements /></StudentRoute>} />
        <Route path="/profile" element={<StudentRoute><Profile /></StudentRoute>} />
        <Route path="/chat" element={<StudentRoute><Chat /></StudentRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/events" element={<AdminRoute><AdminEvents /></AdminRoute>} />
        <Route path="/admin/posts" element={<AdminRoute><AdminPosts /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><AdminAnnouncements /></AdminRoute>} />
        
        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;