import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/user/Home";
import Packages from "./pages/user/Packages";
import PackageDetail from "./pages/user/PackageDetail";
import Contact from "./pages/user/Contact";
import Support from "./pages/user/Support";
import Dashboard from "./pages/admin/Dashboard";
import ManagePackages from "./pages/admin/ManagePackages";
import Queries from "./pages/admin/Queries";
import EditPackage from "./pages/admin/EditPackage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  // You can customize your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="packages" element={<Packages />} />
            <Route path="packages/:id" element={<PackageDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="support" element={<Support />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="packages" element={<ManagePackages />} />
            <Route path="packages/:id/edit" element={<EditPackage />} />
            <Route path="queries" element={<Queries />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
