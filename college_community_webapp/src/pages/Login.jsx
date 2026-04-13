import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://collegecommunity-backend.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      const userToStore = {
        id: data.id || data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        token: data.token,
        phone: data.phone,
        department: data.department,
        branch: data.branch,
        year: data.year,
        dob: data.dob
      };

      localStorage.setItem("user", JSON.stringify(userToStore));

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen relative bg-[#fdf4ec] text-black overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/pattern.png')",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          opacity: 0.35
        }}
      />

      <form onSubmit={handleSubmit} className="relative z-10 bg-[#fff7ef] border border-[#ead7c9] p-10 rounded-2xl w-96 space-y-4 shadow-sm">
        <h2 className="text-2xl font-black text-center mb-4 tracking-tighter italic text-[#1a1a1a]">Log In</h2>
        
        {error && (
          <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded border border-red-100 font-bold uppercase tracking-widest">
            {error}
          </p>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">University Email</label>
          <input
            type="email"
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a] transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-xl border border-[#e2d1c4] bg-white outline-none focus:border-[#1a1a1a] transition-all"
          />
        </div>

        <button className="w-full p-4 rounded-xl bg-[#1a1a1a] text-white hover:opacity-90 transition font-black uppercase tracking-[0.2em] text-xs shadow-lg active:scale-95 mt-2">
          Sign In
        </button>

        <p className="text-sm text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold hover:underline text-[#1a1a1a]">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;