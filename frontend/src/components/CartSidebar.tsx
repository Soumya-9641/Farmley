import { useCart } from '../CartContext';
import { X } from 'lucide-react';
import { FaShoppingCart } from 'react-icons/fa';

const CartSidebar = () => {
  const { state, dispatch } = useCart();
  const { items, isOpen } = state;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price.offerPrice * item.quantity,
    0
  );
  // Handle toggle logic
  const handleCartClick = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <>
      {/* 🛒 Cart Icon */}
      {!isOpen && (
        <button
          className="fixed top-4 right-4 z-50 bg-white border rounded-full p-3 shadow-md hover:bg-gray-100 transition"
          
        >
          <div className="relative">
            <FaShoppingCart onClick={handleCartClick} className="text-gray-700 text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </button>
        
      )}

      {/* 🧾 Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 w-80 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={handleClose}>
            <X />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price.offerPrice} × {item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
  <div className="p-4 border-t">
    <div className="flex justify-between font-semibold text-lg">
      <span>Subtotal:</span>
      <span>₹{subtotal}</span>
    </div>
    <button className="w-full mt-4 bg-blue-900 text-white py-2 rounded">
      Checkout
    </button>
  </div>
)}
      </div>
      
    </>
  );
};

export default CartSidebar;
