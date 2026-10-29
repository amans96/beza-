import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      <Outlet />
    </div>
  );
}