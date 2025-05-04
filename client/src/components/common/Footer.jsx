const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p>Your trusted travel partner since 2024</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>Email: info@travelagency.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            {/* Add social media links */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
