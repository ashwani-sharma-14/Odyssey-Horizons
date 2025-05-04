import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">
            Odyssey Horizons
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link to="/packages" className="hover:text-blue-600">
              Packages
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <Link to="/support" className="hover:text-blue-600">
              Support
            </Link>
            <Link
              to="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
