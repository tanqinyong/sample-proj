import { useEffect, useState } from "react";
import { post, get, setTokens, clearTokens } from "./api";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  async function loadMe() {
    try {
      const data = await get("/api/me");
      setMe(data.user);
    } catch {
      setMe(null);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  async function onRegister() {
    setError("");
    try {
      await post("/api/auth/register", { email, password });
      alert("Registered! Now login.");
    } catch (e) {
      setError(e.error || "register failed");
    }
  }

  async function onLogin() {
    setError("");
    try {
      const data = await post("/api/auth/login", { email, password });
      setTokens(data.access_token, data.refresh_token);
      await loadMe();
    } catch (e) {
      setError(e.error || "login failed");
    }
  }

  function onLogout() {
    clearTokens();
    setMe(null);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Auth + Profile</h1>

      {me ? (
        <>
          <p>Logged in as <b>{me.email}</b></p>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button onClick={onRegister}>Register</button>
            <button onClick={onLogin}>Login</button>
          </div>
          {error && <p>❌ {error}</p>}
        </>
      )}
    </div>
  );
}