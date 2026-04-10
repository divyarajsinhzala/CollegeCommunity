import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", description: "" });

  // Get user data safely
  const getUser = () => JSON.parse(localStorage.getItem("user") || "{}");

  const fetchEvents = async () => {
    const user = getUser();
    if (!user.token) return;
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) setEvents(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const user = getUser(); // Refresh user data right before sending

    if (!user.token || user.token === "undefined") {
      alert("Error: Your session has expired. Please log out and log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` 
        },
        body: JSON.stringify(newEvent),
      });

      if (res.ok) {
        await fetchEvents();
        setShowModal(false);
        setNewEvent({ title: "", date: "", location: "", description: "" });
      } else {
        const errData = await res.json();
        alert(`Server error: ${errData.message}`);
      }
    } catch (err) {
      alert("Network Error: Is the server running?");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <button onClick={() => setShowModal(true)} className="bg-black text-white px-6 py-2 rounded-xl font-bold">
            + New Event
          </button>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-bold">Event Name</th>
                <th className="p-4 font-bold">Location</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="text-center py-10">Loading events...</td></tr>
              ) : events.map((e) => (
                <tr key={e._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold">{e.title}</td>
                  <td className="p-4 text-gray-600">{e.location}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={async () => {
                        const user = getUser();
                        if (window.confirm("Delete this event?")) {
                          await fetch(`http://localhost:5000/api/events/${e._id}`, {
                            method: "DELETE",
                            headers: { "Authorization": `Bearer ${user.token}` }
                          });
                          fetchEvents();
                        }
                      }}
                      className="text-red-500 font-bold text-xs"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">Create Event</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input required placeholder="Title" className="w-full border p-3 rounded-xl" onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
              <input required type="date" className="w-full border p-3 rounded-xl" onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
              <input required placeholder="Location" className="w-full border p-3 rounded-xl" onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
              <textarea required placeholder="Description" className="w-full border p-3 rounded-xl h-24" onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-black text-white rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminEvents;