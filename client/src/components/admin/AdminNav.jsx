import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
// import { HomeIcon } from "@mui/icons-material";

const AdminNav = () => {
  const location = useLocation();
  const navItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/packages", label: "Manage Packages" },
    { path: "/admin/queries", label: "Customer Queries" },
  ];

  return (
    <nav className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "block px-4 py-2 rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-800"
            )}
          >
            {item.label}
          </Link>
        ))}

        {/* Back to Home button */}
        <Link
          to="/"
          className={cn(
            "block px-4 py-2 rounded-lg transition-colors mt-8",
            "bg-green-600 hover:bg-green-700"
          )}
        >
          <div className="flex items-center gap-2">
            {/* <HomeIcon fontSize="small" /> */}
            <span>Back to Home</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNav;
