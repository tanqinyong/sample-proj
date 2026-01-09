import { useState } from "react";
import { post } from "./api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onRegister(e) {
    e.preventDefault();
    setError("");
    try {
      await post("/api/auth/register", { email, password });
      setDone(true);
    } catch (e) {
      setError(e.error || "register failed");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Register</h1>

      {done ? (
        <>
          <p>✅ Registered! Now you can log in.</p>
          <a href="/login">Go to login</a>
        </>
      ) : (
        <form onSubmit={onRegister} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
          <button type="submit">Register</button>
        </form>
      )}

      {error && <p>❌ {error}</p>}
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}