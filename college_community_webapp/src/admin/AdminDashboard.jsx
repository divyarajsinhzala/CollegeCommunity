import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ events: 0, users: 0, clubs: 0 });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.token) return;

    try {
      const headers = { 
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      };

      // Fetch Events and Users in parallel
      const [eventRes, userRes] = await Promise.all([
        fetch("https://collegecommunity-backend.onrender.com/api/events", { headers }),
        fetch("https://collegecommunity-backend.onrender.com/api/users", { headers })
      ]);

      const events = eventRes.ok ? await eventRes.json() : [];
      const users = userRes.ok ? await userRes.json() : [];

      setStats({
        events: events.length,
        users: users.length,
        clubs: 4 // Keep static if no club model exists, otherwise fetch
      });
      
      // Get only the last 3 created events for the "Recent Activity" feed
      setRecentEvents(events.slice(-3).reverse());
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Data Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // FUNCTIONAL BUTTON: Export Data as CSV
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8,Type,Count\nEvents," + stats.events + "\nUsers," + stats.users;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "admin_stats.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <header className="mb-10 flex justify-between items-end border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-[#1a1a1a] tracking-tight">System Console</h1>
            <p className="text-slate-500 font-semibold text-xs mt-1 uppercase tracking-[0.2em]">Management & Performance Metrics</p>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="text-[10px] font-bold border border-gray-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition"
          >
            REFRESH DATA
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Events", value: stats.events, path: "/admin/events" },
            { label: "Active Users", value: stats.users, path: "/admin/users" },
            { label: "Active Clubs", value: stats.clubs, path: "/admin/clubs" },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => navigate(item.path)}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-gray-400 cursor-pointer transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 group-hover:text-[#1a1a1a] transition-colors">{item.label}</span>
              <p className="text-5xl font-black mt-3 text-[#1a1a1a]">{loading ? "..." : item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LIVE ACTIVITY FEED */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black mb-6 uppercase tracking-wider text-[#1a1a1a]">Recent Activity</h3>
            <div className="space-y-4">
              {recentEvents.length > 0 ? recentEvents.map((ev, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{ev.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Added to Database</p>
                  </div>
                  <span className="text-[10px] font-black text-slate-400">{ev.date}</span>
                </div>
              )) : <p className="text-slate-400 italic text-sm">No recent updates.</p>}
            </div>
          </div>

          {/* FUNCTIONAL ACTION CARD */}
          <div className="bg-[#1a1a1a] p-8 rounded-[2rem] text-white flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black mb-2 uppercase tracking-wider text-slate-400">Quick Actions</h3>
              <p className="text-xs text-slate-500 mb-6">Execute administrative tasks immediately.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate("/admin/events")}
                className="bg-white text-black p-4 rounded-2xl font-bold text-xs hover:bg-slate-200 transition"
              >
                Create Event
              </button>
              <button 
                onClick={handleExport}
                className="bg-white/10 border border-white/10 text-white p-4 rounded-2xl font-bold text-xs hover:bg-white/20 transition"
              >
                Export Stats
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;