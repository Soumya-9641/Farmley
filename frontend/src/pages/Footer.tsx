import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#dadce0] text-black mt-20 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-700">Home</a></li>
            <li><a href="/products" className="hover:text-gray-700">Products</a></li>
            <li><a href="/about" className="hover:text-gray-700">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-700">Contact Us</a></li>
            <li><a href="/blog" className="hover:text-gray-700">Blog</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li><a href="/faqs" className="hover:text-gray-700">FAQs</a></li>
            <li><a href="/return-policy" className="hover:text-gray-700">Return Policy</a></li>
            <li><a href="/shipping-policy" className="hover:text-gray-700">Shipping Policy</a></li>
            <li><a href="/support" className="hover:text-gray-700">Contact Support</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} className="hover:text-gray-700 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="hover:text-gray-700 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="hover:text-gray-700 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="hover:text-gray-700 transition" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Stay updated with our latest offers and products.</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-700 mt-6 border-t border-gray-500 pt-4">
        © {new Date().getFullYear()} Farmley. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
