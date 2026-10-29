import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.jpg";

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-400/30 border-t-blue-400" />
          <p className="text-sm text-slate-300">Checking your session...</p>
        </div>
      </main>
    );
  }

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
      const loggedInUser = await login(email.trim(), password);

      if (loggedInUser.role !== "ADMIN") {
        setError("This account does not have administrator access.");
        return;
      }

      navigate(location.state?.from?.pathname || "/admin", {
        replace: true,
      });
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_55%)]" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-4 px-2"
        >
          <ArrowLeft size={15} />
          <span>Return to Public Website</span>
        </Link>

        <section className="relative w-full rounded-3xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/40 sm:p-10">
          {/* School branding */}
          <div className="mb-8 flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl overflow-hidden ring-2 ring-emerald-500/30 flex-shrink-0 shadow-md">
              <img
                src={Logo}
                alt="Beza School Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-[0.1em] text-slate-900 font-heading">
                BEZA <span className="text-emerald-600">SCHOOL</span>
              </p>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                Administrator Portal
              </p>
            </div>
          </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Administrator portal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in to manage your school website and keep everything running smoothly.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                !
              </span>
              <p>{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <span className="text-xs text-slate-400">
                Admin access only
              </span>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing you in...
              </>
            ) : (
              <>
                Sign in to dashboard
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-xs text-slate-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 text-emerald-600"
            aria-hidden="true"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          Secure administrator sign-in
        </div>
      </section>
      </div>

      <footer className="absolute bottom-4 left-4 right-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Beza School. All rights reserved.
      </footer>
    </main>
  );
}
