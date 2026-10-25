import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main>
      <h1>Beza School Admin</h1>
      <p>Welcome, {user?.name}.</p>

      <h2>Website Management</h2>
      <ul>
        <li>Manage achievers</li>
        <li>Manage clubs</li>
        <li>Manage events</li>
        <li>Manage gallery</li>
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}