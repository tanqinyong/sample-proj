import { useState } from "react";
import { post, setTokens } from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await post("/api/auth/login", { email, password });
      setTokens(data.access_token, data.refresh_token);
      window.location.href = "/profile"; // simple redirect
    } catch (e) {
      setError(e.error || "login failed");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>

      <form onSubmit={onLogin} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        <button type="submit">Login</button>
      </form>

      {error && <p>❌ {error}</p>}
      <p>
        No account? <a href="/register">Register</a>
      </p>
    </div>
  );
}