import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const adminData = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        headers: { "Authorization": `Bearer ${adminData.token}` }
      });
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    const adminData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!window.confirm("Permanent Deletion of User. Proceed?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${adminData.token}` }
      });
      if (res.ok) fetchUsers();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div className="relative min-h-screen">
        <header className="mb-10 relative z-10">
          <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tighter italic">Directory</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 italic">Authorized Personnel Access Only</p>
        </header>
        
        <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl relative z-10">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                <th className="p-6">User Identity</th>
                <th className="p-6">Email Address</th>
                <th className="p-6">Academic Dept</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="p-20 text-center text-slate-300 italic">Accessing database...</td></tr>
              ) : users.map((u) => (
                <tr key={u._id} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-sm text-[#1a1a1a]">{u.firstName} {u.lastName}</td>
                  <td className="p-6 text-xs text-slate-500 font-medium">{u.email}</td>
                  <td className="p-6 text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">{u.department || "N/A"}</td>
                  <td className="p-6 text-right">
                    <button onClick={() => deleteUser(u._id)} className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline">Revoke Access</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;