import { useEffect, useState } from "react";
import { get, clearTokens } from "./api";

export default function Profile() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/api/me");
        setMe(data.user);
      } catch {
        window.location.href = "/login";
      }
    })();
  }, []);

  function logout() {
    clearTokens();
    window.location.href = "/login";
  }

  if (!me) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Profile</h1>
      <p>Logged in as <b>{me.email}</b></p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}