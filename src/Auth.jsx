import { useState } from "react";
import { motion } from "framer-motion";
import api from "./api";

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth", {
        action: isLogin ? "login" : "register",
        email: form.email,
        password: form.password,
        fullName: form.fullName,
      });
      if (res.data.status === "success") {
        const userData = res.data.user || { email: form.email, fullName: form.fullName, id: res.data.userId };
        localStorage.setItem("user", JSON.stringify(userData));
        onLoginSuccess(userData);
      } else { setError(res.data.message); }
    } catch (err) { setError("Server error. Try again later."); }
  };

  const inputClasses = "w-full px-6 py-4 rounded-[1.5rem] bg-white/5 border-2 border-white/10 text-white placeholder-gray-500 outline-none focus:border-red-600/50 focus:ring-4 focus:ring-red-600/10 transition-all duration-300 font-medium";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-950/30 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="text-5xl mb-4">❤️</motion.div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              {isLogin ? "Hello" : "Join"} <span className="text-red-600 font-['Pacifico'] font-normal text-3xl italic">Luv</span>
            </h2>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">Midnight Boutique</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && <input name="fullName" placeholder="Your Name" onChange={handleChange} className={inputClasses} required />}
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className={inputClasses} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className={inputClasses} required />
            {!isLogin && <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className={inputClasses} required />}
            {error && <p className="text-red-500 text-xs font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20 italic"> {error} </p>}
            <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-[1.5rem] font-extrabold text-lg hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all active:scale-95 mt-4 uppercase">
              {isLogin ? "Log In ✨" : "Start Now 🎀"}
            </button>
          </form>

          <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-8 text-white/40 font-bold text-sm hover:text-red-500 transition-colors uppercase tracking-widest text-[10px]">
            {isLogin ? "Create an account" : "Back to login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}