import { useState, useEffect } from "react";
import UserLayout from "../layouts/UserLayout";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Safely get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://collegecommunity-backend.onrender.com/api/events", {
        headers: {
          "Authorization": `Bearer ${user?.token}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setEvents(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchEvents();
    }
  }, []);

  const handleRegister = async (eventId) => {
    if (!user.id) return alert("User ID not found. Please log in again.");
    
    try {
      const res = await fetch(`https://collegecommunity-backend.onrender.com/api/events/${eventId}/join`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` 
        },
        body: JSON.stringify({ userId: user.id })
      });
      
      if (res.ok) {
        fetchEvents(); // Refresh to show "Unregister" button
      } else {
        const err = await res.json();
        alert(err.message || "Failed to register");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnregister = async (eventId) => {
    if (!window.confirm("Do you want to unregister?")) return;
    try {
      const res = await fetch(`https://collegecommunity-backend.onrender.com/api/events/${eventId}/leave`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId: user.id })
      });
      if (res.ok) fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserLayout>
      <div className="relative min-h-screen p-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/pattern.png')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
            opacity: 0.1
          }}
        />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-8 text-[#2d2d2d]">Campus Events</h1>
          
          {loading ? (
            <p className="text-gray-400 italic">Loading events...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => {
                // Check if current user's ID is in the registered list
                const isRegistered = event.registeredStudents?.some(
                  (s) => (s._id || s) === user.id
                );

                return (
                  <div key={event._id} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-[#ead7c9] shadow-sm flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{event.title}</h2>
                      <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                      <div className="mt-4 text-xs font-bold text-gray-600">
                        <p>📅 {event.date}</p>
                        <p>📍 {event.location}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      {isRegistered ? (
                        <button 
                          onClick={() => handleUnregister(event._id)}
                          className="w-full py-2 rounded-xl border border-red-500 text-red-500 font-bold hover:bg-red-50 transition"
                        >
                          Unregister
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleRegister(event._id)}
                          className="w-full py-2 rounded-xl bg-black text-white font-bold hover:opacity-80 transition"
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default Events;