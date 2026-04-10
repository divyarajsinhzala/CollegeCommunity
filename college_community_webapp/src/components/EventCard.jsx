function EventCard({ event, onRegister, onUnregister, isRegistered }) {
  
  // DYNAMIC IMAGE LOGIC
  const getEventImage = (title) => {
    const t = title.toLowerCase();
    if (t.includes("gaming") || t.includes("esports") || t.includes("tournament")) {
      return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"; // Gaming Image
    }
    if (t.includes("hack") || t.includes("code") || t.includes("tech")) {
      return "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80"; // Hacker/Tech Image
    }
    if (t.includes("club") || t.includes("meet")) {
      return "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"; // Meeting Image
    }
    // Default image if no keywords match
    return "https://images.unsplash.com/photo-1523050335392-938511794211?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ead7c9] overflow-hidden hover:shadow-md transition-all group relative">
      <img 
        src={getEventImage(event.title)} 
        alt="Event" 
        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      
      <div className="p-5">
        <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">{event.title}</h2>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>

        <div className="space-y-1 text-[12px] font-bold text-gray-400 uppercase">
          <p>📅 {event.date}</p>
          <p>📍 {event.location}</p>
        </div>

        {isRegistered ? (
          <button 
            onClick={() => onUnregister(event._id)}
            className="mt-6 w-full py-3 rounded-xl border border-red-500 text-red-500 font-bold hover:bg-red-50 transition"
          >
            Unregister
          </button>
        ) : (
          <button 
            onClick={() => onRegister(event._id)}
            className="mt-6 w-full py-3 rounded-xl bg-black text-white font-bold hover:opacity-80 transition"
          >
            Register Now
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCard;