import { useState, useEffect } from "react";
import UserLayout from "../layouts/UserLayout";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [formData, setFormData] = useState({ 
    firstName: "", lastName: "", department: "", 
    branch: "", year: "", phone: "", dob: "" 
  });
  const [status, setStatus] = useState({ msg: "", type: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        department: user.department || "",
        branch: user.branch || "",
        year: user.year || "",
        phone: user.phone || "",
        dob: user.dob || ""
      });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ msg: "Processing...", type: "" });
    try {
      const res = await fetch(`https://collegecommunity-backend.onrender.com/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // We merge old user data with new fields to keep the token alive
        const updatedUser = { ...user, ...data }; 
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setStatus({ msg: "✅ Profile Updated Successfully", type: "success" });
      } else {
        setStatus({ msg: `❌ ${data.message || "Update Failed"}`, type: "error" });
      }
    } catch (err) {
      setStatus({ msg: "❌ Server Unreachable", type: "error" });
    }
  };

  return (
    <UserLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url('/pattern.png')" }} />
          
          <header className="relative z-10 mb-10">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight italic">Settings</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 italic">Student Database Record</p>
          </header>
          
          {status.msg && (
            <div className={`relative z-10 mb-8 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest ${status.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
              {status.msg}
            </div>
          )}

          <form onSubmit={handleUpdate} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-1 ring-black font-medium transition-all" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-1 ring-black font-medium transition-all" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-1 ring-black font-medium transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Year</label>
                <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-1 ring-black font-medium" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                  <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-1 ring-black font-medium" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                  <option>Computer Engineering</option><option>Information Technology</option><option>Mechanical</option><option>Civil</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch/Spec</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-1 ring-black font-medium transition-all" value={formData.branch} onChange={e => setFormData({...formData, branch: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#1a1a1a] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl mt-4">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}

export default Profile;