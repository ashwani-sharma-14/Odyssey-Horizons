import { Outlet } from "react-router-dom";
// import AdminNav from "@/components/admin/AdminNav";
import AdminNav from "../components/admin/AdminNav";
const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <AdminNav />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
