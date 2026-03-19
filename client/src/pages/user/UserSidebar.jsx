import { Link, useNavigate, useLocation } from "react-router-dom";

function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/user/login");
  };

  const menu = [
    { name: "Dashboard", path: "/user/dashboard", icon: "🏠" },
    { name: "Add College", path: "/user/add-college", icon: "➕" },
    { name: "My Colleges", path: "/user/my-colleges", icon: "🎓" },
    { name: "My Blogs", path: "/user/blogs", icon: "📝" },
  ];

  return (
    <div className="h-full bg-white border-r flex flex-col">

      {/* LOGO */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-bold text-blue-600">Shiksha18</h2>
        <p className="text-xs text-gray-400">User Dashboard</p>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4 space-y-1">

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
            ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}

      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default UserSidebar;