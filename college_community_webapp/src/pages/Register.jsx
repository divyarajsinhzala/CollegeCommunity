import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", studentId: "",
    department: "", branch: "", year: "", phone: "",
    email: "", password: "", confirm: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return alert("Passwords do not match");

    try {
      const response = await fetch("https://collegecommunity-backend.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Server connection failed.");
    }
  };

  return (
    <div className="min-h-screen relative bg-[#fdf4ec] text-black overflow-hidden flex items-center justify-center py-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/pattern.png')",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          opacity: 0.35
        }}
      />

      <form onSubmit={handleSubmit} className="relative z-10 bg-[#fff7ef] border border-[#ead7c9] p-8 rounded-[2rem] w-[460px] space-y-3 shadow-xl">
        <h2 className="text-2xl font-black text-center mb-2 italic tracking-tighter text-[#1a1a1a]">Create Account</h2>
        
        {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center bg-red-50 p-2 rounded">{error}</p>}

        <div className="flex gap-3">
          <input name="firstName" placeholder="First Name" onChange={handleChange} required className="w-1/2 p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="w-1/2 p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
        </div>

        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-[9px] font-bold uppercase text-gray-400 ml-2">DOB</label>
            <input name="dob" type="date" onChange={handleChange} required className="w-full p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
          </div>
          <div className="w-1/2">
            <label className="text-[9px] font-bold uppercase text-gray-400 ml-2">Phone</label>
            <input name="phone" placeholder="9876543210" onChange={handleChange} required className="w-full p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
          </div>
        </div>

        <input name="studentId" placeholder="Student ID / Roll No" onChange={handleChange} required className="w-full p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />

        <div className="flex gap-3">
          <select name="department" onChange={handleChange} required className="w-1/2 p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none font-medium text-sm">
            <option value="">Department</option>
            <option>Computer Engineering</option>
            <option>Mechanical</option>
            <option>Civil</option>
          </select>
          <input name="branch" placeholder="Branch (AI/ML)" onChange={handleChange} required className="w-1/2 p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
        </div>

        <select name="year" onChange={handleChange} required className="w-full p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none font-medium text-sm">
          <option value="">Current Year</option>
          <option>1st Year</option><option>2nd Year</option>
          <option>3rd Year</option><option>4th Year</option>
        </select>

        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
        
        <div className="flex gap-3">
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-1/2 p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
          <input name="confirm" type="password" placeholder="Confirm" onChange={handleChange} required className="w-1/2 p-3 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a]" />
        </div>

        <button type="submit" className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl hover:opacity-90 font-black uppercase tracking-[0.2em] text-[11px] shadow-lg active:scale-95 transition-all mt-2">
          Register Student
        </button>

        <p className="text-[11px] font-bold text-center text-gray-500 uppercase tracking-wider">
          Already a member? <Link to="/login" className="text-[#1a1a1a] underline">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;