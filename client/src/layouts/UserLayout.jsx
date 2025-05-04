import { Outlet } from "react-router-dom";
// import Navbar from "@/components/common/Navbar";
// import Footer from "@/components/common/Footer";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
