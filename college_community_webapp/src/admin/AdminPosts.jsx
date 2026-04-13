import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get user from localStorage to access the token
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://collegecommunity-backend.onrender.com/api/messages", {
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      });
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleVisibility = async (id) => {
    try {
      const response = await fetch(`https://collegecommunity-backend.onrender.com/api/messages/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        // Update state locally for the specific post only
        setPosts((prev) => 
          prev.map((p) => (p._id === id ? { ...p, status: updatedPost.status } : p))
        );
      } else {
        alert("Access Denied: Admins Only");
      }
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const removePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post permanently?")) return;
    try {
      const response = await fetch(`https://collegecommunity-backend.onrender.com/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      });
      if (response.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Post Management</h1>
        <div className="text-sm text-gray-500">Admin: {user?.firstName}</div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#ead7c9]">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="py-4 px-4 font-bold text-gray-600">User</th>
              <th className="py-4 font-bold text-gray-600">Message Content</th>
              <th className="py-4 font-bold text-gray-600">Status</th>
              <th className="py-4 font-bold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-20 italic">Loading database...</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-800">{post.user}</td>
                  <td className="py-4 text-sm text-gray-600 pr-10">{post.text}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      post.status === "Hidden" 
                      ? "bg-red-100 text-red-600" 
                      : "bg-green-100 text-green-600"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-4 flex gap-2">
                    <button
                      onClick={() => toggleVisibility(post._id)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        post.status === "Hidden" 
                        ? "bg-black text-white hover:bg-gray-800" 
                        : "border border-black text-black hover:bg-gray-100"
                      }`}
                    >
                      {post.status === "Hidden" ? "Restore" : "Hide Post"}
                    </button>
                    <button
                      onClick={() => removePost(post._id)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold px-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminPosts;