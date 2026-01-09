let accessToken = localStorage.getItem("access_token");
let refreshToken = localStorage.getItem("refresh_token");

export function setTokens(access, refresh) {
  if (access) {
    accessToken = access;
    localStorage.setItem("access_token", access);
  }
  if (refresh) {
    refreshToken = refresh;
    localStorage.setItem("refresh_token", refresh);
  }
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function fetchWithAuth(url, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let res = await fetch(url, { ...options, headers });

  // try refresh once
  if (res.status === 401 && refreshToken && !options._retry) {
    const r = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (r.ok) {
      const data = await r.json();
      setTokens(data.access_token, null);
      return fetchWithAuth(url, { ...options, _retry: true });
    } else {
      clearTokens();
    }
  }

  return res;
}

export async function post(url, body) {
  const res = await fetchWithAuth(url, { method: "POST", body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}

export async function get(url) {
  const res = await fetchWithAuth(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}