import { useState, useEffect } from "react";
import UserLayout from "../layouts/UserLayout";
import AnnouncementCard from "../components/AnnouncementCard";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("https://collegecommunity-backend.onrender.com/api/announcements");
        const data = await response.json();
        // Ensure data is sorted newest first
        const sortedData = Array.isArray(data) ? data.reverse() : [];
        setAnnouncements(sortedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <UserLayout>
      <div className="relative min-h-screen p-8">
        {/* BACKGROUND PATTERN PRESERVED */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5" 
          style={{ backgroundImage: "url('/pattern.png')", backgroundSize: "400px" }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <header className="mb-10 border-b border-gray-100 pb-6">
            <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Campus Announcements</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Latest Updates & Notices</p>
          </header>

          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 w-full bg-gray-100 animate-pulse rounded-[2rem]" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {announcements.length > 0 ? (
                announcements.map((a) => (
                  <AnnouncementCard key={a._id} announcement={a} />
                ))
              ) : (
                <div className="p-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                  <p className="text-slate-400 font-medium italic">No new announcements at this time.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default Announcements;