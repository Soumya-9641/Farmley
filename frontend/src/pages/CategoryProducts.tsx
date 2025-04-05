
import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate, useParams  } from "react-router-dom";
import { useCart } from "../CartContext";
export interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
 
  shelfLife: string;
  images: string[]; // array of image URLs
  price: {
    mrp: number;
    offerPrice: number;
  }; // <- array of price objects
 
}
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ProductsPage = () => {
  const navigate = useNavigate();
   const { dispatch } = useCart();
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formattedCategory = capitalizeFirstLetter(category || "");
        console.log(formattedCategory)
        const response = await axios.get(`${baseUrl}/api/products/category/${formattedCategory}`);
        console.log(response.data)
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category]);

  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
 
  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 capitalize">{category} Products</h1>

      {/* Search Bar */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-1/2"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product, index) => {
            const savings = product.price.mrp - product.price.offerPrice;

            return (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg text-center w-full relative border hover:shadow-lg transition">
                {/* Discount Badge */}
                {savings > 0 && (
                  <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-sm shadow-sm">
                    Save ₹{savings.toFixed(2)}
                  </div>
                )}

                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="w-40 h-40 object-cover mx-auto rounded-lg shadow-md"
                />

                <h2 className="text-lg font-bold mt-4">{product.name}</h2>

                <div className="mt-3">
                  <span className="text-sm line-through text-gray-500">MRP: ₹{product.price.mrp}</span>
                  <span className="text-green-600 text-lg font-semibold block">
                    Offer: ₹{product.price.offerPrice}
                  </span>
                </div>

                <div className="mt-4 flex justify-center">
                  <button className="px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700"
                   onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: { ...product, quantity: 1 }, // default quantity
                    });
                    dispatch({ type: 'TOGGLE_CART' }); // Optional: open cart on adding
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className={`px-4 py-2 border rounded-md ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            className={`px-4 py-2 border rounded-md ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>

  );
};

export default ProductsPage;
