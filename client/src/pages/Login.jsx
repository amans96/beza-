import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p>Checking session...</p>;

  if (user) {
    return (
      <Navigate
        to={user.role === "ADMIN" ? "/admin" : "/"}
        replace
      />
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role !== "ADMIN") {
        setError("This account does not have administrator access.");
        return;
      }

      navigate(location.state?.from?.pathname || "/admin", {
        replace: true,
      });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Admin Login</h1>
        <p>Sign in to manage the Beza School website.</p>

        {error && <p role="alert">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}