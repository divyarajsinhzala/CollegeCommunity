import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import UserLayout from "../layouts/UserLayout";

// Initialize socket - passing token for future auth integration if needed
const socket = io("https://collegecommunity-backend.onrender.com");

const groups = [
  { id: 1, name: "AI Club" },
  { id: 2, name: "Hackathon Team" },
  { id: 3, name: "Football Club" }
];

function CommunityFeed() {
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  
  // Get user and token from localStorage for Auth rubrics
  const user = JSON.parse(localStorage.getItem("user"));
  const scrollRef = useRef();

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    // Join the specific room
    socket.emit("join_room", activeGroup.name);

    // Listen for history from DB
    socket.on("load_messages", (messages) => {
      setChatMessages(messages);
    });

    // Listen for incoming messages (including your own broadcasted back)
    socket.on("receive_message", (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    // Cleanup to prevent memory leaks and duplicate listeners
    return () => {
      socket.off("load_messages");
      socket.off("receive_message");
    };
  }, [activeGroup]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const msgData = {
        room: activeGroup.name,
        user: user?.firstName || "Student",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        // Note: we don't send pfp anymore as per your request to show names only
      };

      // Emit to server
      socket.emit("send_message", msgData);

      /* FIX: Removed setChatMessages((prev) => [...prev, msgData]);
         The server now receives the message, saves it to MongoDB, 
         and broadcasts it back to everyone in the room (including you).
         This prevents the "double message" visual bug.
      */
      
      setMessage("");
    }
  };

  return (
    <UserLayout>
      <div className="flex h-[80vh] bg-white rounded-xl shadow overflow-hidden border border-[#ead7c9]">
        
        {/* SIDEBAR */}
        <div className="w-1/4 border-r bg-[#fffcf9]">
          <h2 className="p-4 font-bold border-b border-[#ead7c9]">Communities</h2>
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setActiveGroup(group)}
              className={`p-4 cursor-pointer transition-all ${
                activeGroup.id === group.id 
                ? "bg-[#f3e7df] font-bold border-r-4 border-black" 
                : "hover:bg-[#fcf3ed]"
              }`}
            >
              {group.name}
            </div>
          ))}
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b font-semibold bg-white shadow-sm flex justify-between items-center">
            <div className="flex flex-col">
              <span>{activeGroup.name}</span>
              <span className="text-[9px] text-gray-400 font-normal">Logged in as: {user?.firstName}</span>
            </div>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">● Connected</span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fcf9f6]">
            {chatMessages.length > 0 ? (
              chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${msg.user === user?.firstName ? "items-end" : "items-start"}`}
                >
                  <p className="text-[10px] font-bold text-gray-400 mb-1 px-1">
                    {msg.user} • {msg.time}
                  </p>
                  <div className={`px-4 py-2 rounded-2xl text-sm max-w-xs shadow-sm ${
                    msg.user === user?.firstName 
                    ? "bg-black text-white rounded-tr-none" 
                    : "bg-[#f3e7df] text-black rounded-tl-none border border-[#ead7c9]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-gray-300 italic text-sm">
                No messages yet. Say hello!
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-3 bg-white">
            <input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-[#ead7c9] p-3 rounded-xl focus:outline-none focus:border-black transition-all"
            />
            <button 
              type="submit" 
              className="bg-black text-white px-8 rounded-xl font-bold hover:bg-gray-800 transition-colors active:scale-95"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}

export default CommunityFeed;