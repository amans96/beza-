const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers || {});

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }

  return data;
}

const api = {
  get: (path) => request(path),

  post: (path, body) =>
    request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: (path, body) =>
    request(path, {
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: (path) =>
    request(path, { method: "DELETE" }),
};

export default api;