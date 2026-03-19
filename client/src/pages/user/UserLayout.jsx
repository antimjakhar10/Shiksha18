import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { useState } from "react";

function UserLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`
${open ? "translate-x-0" : "-translate-x-full"}
fixed lg:sticky top-0 left-0 h-screen z-40
lg:translate-x-0 transition-transform duration-300
w-64 flex-shrink-0
`}
      >
        <UserSidebar />
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-xl"
            >
              ☰
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              Welcome 👋
            </div>
          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default UserLayout;