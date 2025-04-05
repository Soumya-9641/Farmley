import { Link } from "react-router-dom";

import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
//import { useCart } from "../CartContext";
//import { ShoppingCart } from "lucide-react";
import CartSidebar from "./CartSidebar";
const Navbar = () => {
  const auth = useContext(AuthContext);
  //const { state, dispatch } = useCart();

 // const navigate = useNavigate();
  //const [user, setUser] = useState<{ fullName: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  if (!auth) return null;
 
  //const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);


 // const totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
  // useEffect(() => {
   
  //   const token = localStorage.getItem("token"); // Check if user is logged in
  //   const storedUser = localStorage.getItem("user");

  //   if (token && storedUser) {
  //     setUser(JSON.parse(storedUser));
  //    // console.log(user) // Set user details
  //   }
  // }, []);
  
  // const handleLogout = () => {
  //   localStorage.removeItem("token"); // Remove token
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   setDropdownOpen(false);
  //   navigate("/auth");
  // };
  return (
    <nav className="bg-[#dadce0] shadow-md border-b border-gray-200 fixed top-0 w-full z-50">
    <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
        <span className="text-blue-900">Farm</span>
        <span className="text-green-600">ley</span>
      </Link>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg border border-gray-700 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 outline-none"
        />
        <button className="bg-gray-800 text-white px-4 py-2">
          <FaSearch />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/products" className="hover:text-green-600">Products</Link>
        <Link to="/about" className="hover:text-green-600">About Us</Link>

      
        <Link to="/contact" className="hover:text-green-600">Contact Us</Link>
      </div>

      {/* Account & Cart */}
      <div className="flex items-center space-x-4">
      {auth.user ? (
      
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
              <FaUserCircle className="text-3xl mr-15 mt-2 text-gray-700 hover:text-green-600 cursor-pointer" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2">
               
                <hr />
                <button
                  onClick={() => {
                    auth.logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="text-blue-600 hover:underline bg-white px-3 py-1 mr-20 rounded-md">
            Login / Signup
          </Link>
        )}
        {/* <Link to="/account" className="text-gray-700 hover:text-green-600">My account</Link> */}
        {/* <button
        className="relative"
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
      >
        <FaShoppingCart className="text-gray-700 text-xl" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button> */}
      {/* <div className="relative cursor-pointer" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
        <CartSidebar />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </div> */}
       <CartSidebar />
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
