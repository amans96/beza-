import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="flex gap-4 ">
        <Link to="/"></Link>
        <Link to="/About"></Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;