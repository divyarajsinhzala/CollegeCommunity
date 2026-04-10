import React from 'react';

function UserProfileCard({ user }) {
  // Uses email as a seed so the face doesn't change randomly
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "student"}`;

  return (
    <div className="bg-white p-8 rounded-2xl border border-[#ead7c9] shadow-sm text-center max-w-sm mx-auto">
      <img 
        src={avatarUrl} 
        alt="Profile" 
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#fdf4ec]" 
      />
      <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
      <p className="text-gray-400 text-sm mb-6">{user?.email}</p>
      
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#fcf3ed]">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase">Dept</p>
          <p className="font-bold text-xs">{user?.department || "N/A"}</p>
        </div>
        <div className="border-l border-[#fcf3ed]">
          <p className="text-[10px] font-black text-gray-400 uppercase">Year</p>
          <p className="font-bold text-xs">{user?.year || "N/A"}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          ID: {user?.studentId || "PENDING"}
        </p>
      </div>
    </div>
  );
}

export default UserProfileCard;