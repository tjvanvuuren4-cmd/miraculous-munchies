import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    if (password === "MMadmin2026!") {
      localStorage.setItem("mm_admin", "true");
      onLogin();
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#160617" }}
    >
      <form
        onSubmit={login}
        className="rounded-[2rem] p-8 max-w-md w-full"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,215,90,0.14)",
          backdropFilter: "blur(18px)",
        }}
      >
        <h1 className="text-3xl font-black text-yellow-300 mb-6">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 rounded-xl px-4 mb-5 text-white placeholder:text-white/40"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,215,90,0.14)",
          }}
        />

        <button
          type="submit"
          className="w-full h-12 rounded-full font-bold"
          style={{
            background: "linear-gradient(135deg,#f7c948,#c69214)",
            color: "#1a1203",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}