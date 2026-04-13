import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

function Dashboard() {
  const navigate = useNavigate();
  const [activity, setActivity] = useState({ joined: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  
  // 1. We wrap user retrieval in a state or a direct call to ensure it's fresh
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

  const fetchDashboardData = useCallback(async () => {
    if (!user?.token) return;

    try {
      const res = await fetch("https://collegecommunity-backend.onrender.com/api/events", {
        headers: { 
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json" 
        }
      });

      // If the token is invalid (expired), force logout to break the loop
      if (res.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const events = await res.json();
      
      if (Array.isArray(events)) {
        // Correctly filter events where student ID matches user.id
        const joined = events.filter(e => 
          e.registeredStudents?.some(studentId => 
            (typeof studentId === 'object' ? studentId._id : studentId) === user.id
          )
        ).length;
        
        setActivity({ joined, total: events.length });
      }
      setLoading(false);
    } catch (err) {
      console.error("Client Dash Error:", err);
      setLoading(false);
    }
  }, [user.id, user.token, navigate]);

  useEffect(() => {
    // 2. Refresh user data whenever dashboard is visited
    const freshUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(freshUser);

    if (freshUser.token) {
      fetchDashboardData();
    } else {
      navigate("/login");
    }
  }, [fetchDashboardData, navigate]);

  return (
    <UserLayout>
      <div className="relative min-h-screen p-8 overflow-hidden bg-[#fcfcfc]">
        {/* BACKGROUND PATTERN PRESERVED */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: "url('/pattern.png')", 
            backgroundSize: "400px", 
            backgroundRepeat: "repeat", 
            opacity: 0.06 
          }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* PROFILE HERO - USING REFINED MATTE BLACK (#1a1a1a) */}
          <div className="bg-[#1a1a1a] p-12 rounded-[3rem] shadow-xl mb-8 border border-white/5 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Authenticated Student</span>
                <h1 className="text-5xl font-extrabold text-white mt-1 tracking-tight">
                  {user.firstName} <span className="font-light text-slate-400">{user.lastName}</span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-widest">
                  {user.department || "Engineering"} — UID: {user.id?.slice(-6).toUpperCase() || "N/A"}
                </p>
              </div>
              <button 
                onClick={() => navigate("/events")}
                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-95 active:scale-90 transition-all"
              >
                Join New Events
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STAT CARD */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Registration Status</span>
              <p className="text-5xl font-black mt-3 text-[#1a1a1a]">
                {loading ? "..." : activity.joined}
              </p>
              <p className="text-slate-400 text-[10px] font-bold mt-2 uppercase tracking-widest">
                Events Active out of {activity.total} total
              </p>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Account Access</span>
                <div className="mt-6 space-y-2">
                  <button 
                    onClick={() => navigate("/profile")}
                    className="w-full text-left p-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-xs text-[#1a1a1a] flex justify-between items-center hover:bg-slate-100 transition-all"
                  >
                    Edit Profile <span>→</span>
                  </button>
                  <button 
                    onClick={() => navigate("/chat")}
                    className="w-full text-left p-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-xs text-[#1a1a1a] flex justify-between items-center hover:bg-slate-100 transition-all"
                  >
                    Community Chat <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Dashboard;