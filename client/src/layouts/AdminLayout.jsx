import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:block shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10">
            <AdminSidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar onMenuToggle={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
