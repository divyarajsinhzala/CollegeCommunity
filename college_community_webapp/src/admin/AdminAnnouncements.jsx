import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  // 1. Fetch All Announcements from MongoDB
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("https://collegecommunity-backend.onrender.com/api/announcements");
      const data = await res.json();
      // Ensure we always have an array even if database is empty
      setAnnouncements(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchAnnouncements(); 
  }, []);

  // 2. Create New Announcement (POST)
  const handleCreate = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    try {
      const res = await fetch("https://collegecommunity-backend.onrender.com/api/announcements", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` 
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (res.ok) {
        setShowModal(false);
        setNewAnnouncement({ title: "", content: "" });
        fetchAnnouncements(); // Refresh list immediately after posting
      } else {
        alert("Failed to post. Check if backend route /api/announcements exists.");
      }
    } catch (err) { 
      console.error("Create error:", err);
      alert("Server connection failed.");
    }
  };

  // 3. Delete Announcement (DELETE)
  const deleteAnnouncement = async (id) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (window.confirm("Are you sure you want to delete this broadcast?")) {
      try {
        const res = await fetch(`https://collegecommunity-backend.onrender.com/api/announcements/${id}`, { 
          method: "DELETE",
          headers: { 
            "Authorization": `Bearer ${user.token}` 
          }
        });
        
        if (res.ok) {
            fetchAnnouncements();
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="relative min-h-screen">
        {/* BACKGROUND PATTERN PRESERVED */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]" 
          style={{ backgroundImage: "url('/pattern.png')", backgroundSize: "400px" }} 
        />

        <div className="relative z-10">
          {/* HEADER SECTION */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tighter italic">Announcements</h1>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Broadcast Hub & Global Alerts</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#1a1a1a] text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-95 transition-all shadow-lg active:scale-90"
            >
              + Create New
            </button>
          </div>

          {/* DATA TABLE SECTION */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-gray-100">
                <tr className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  <th className="p-6">Broadcast Title & Preview</th>
                  <th className="p-6">Published Date</th>
                  <th className="p-6 text-right">Management</th>
                </tr>
              </thead>
              <tbody>
                {announcements.length > 0 ? (
                  announcements.map((a) => (
                    <tr key={a._id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="p-6">
                        <p className="font-bold text-[#1a1a1a] text-sm group-hover:text-black transition-colors">{a.title}</p>
                        <p className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">{a.content}</p>
                      </td>
                      <td className="p-6 text-xs font-bold text-slate-500 italic">
                        {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "Syncing..."}
                      </td>
                      <td className="p-6 text-right">
                        <button 
                          onClick={() => deleteAnnouncement(a._id)} 
                          className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline opacity-60 hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-24 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-300 italic text-sm">
                          {loading ? "Establishing Database Connection..." : "No announcements found in the cluster."}
                        </p>
                        {loading && <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1a1a1a] rounded-full animate-spin"></div>}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* CREATE MODAL - MATTE BLACK THEME */}
          {showModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
                <header className="mb-8">
                  <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight">New Broadcast</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Official Campus Update</p>
                </header>
                
                <form onSubmit={handleCreate} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Heading Title</label>
                    <input 
                      placeholder="e.g. Exam Schedule Revised" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:border-[#1a1a1a] outline-none font-medium transition-all"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Detailed Content Body</label>
                    <textarea 
                      placeholder="Write the full announcement here..." 
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-transparent focus:border-[#1a1a1a] outline-none font-medium min-h-[140px] transition-all resize-none"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setShowModal(false)} 
                      className="flex-1 py-4 rounded-2xl border border-gray-200 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition active:scale-95"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-4 rounded-2xl bg-[#1a1a1a] text-white font-black text-[10px] uppercase tracking-widest hover:bg-black shadow-lg transition active:scale-95"
                    >
                      Post Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAnnouncements;