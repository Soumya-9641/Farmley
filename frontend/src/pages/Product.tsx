
//import { useRouter } from 'next/router';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
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


type GroupedProducts = {
  [category: string]: Product[];
};
const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(baseUrl)
// const products = {
  
//     Almonds: [
//       { name: "Premium Almonds", image: "https://www.farmley.com/cdn/shop/files/CranberryandApricots_300x.jpg?v=1715068505" },
//       { name: "Organic Almonds", image: "https://www.farmley.com/cdn/shop/products/organic_almonds.jpg" },
//       { name: "Organic Almonds", image: "https://www.farmley.com/cdn/shop/products/organic_almonds.jpg" }
//     ],
//     Cashews: [
//       { name: "Whole Cashews", image: "https://www.farmley.com/cdn/shop/products/cashews.jpg" },
//       { name: "Roasted Cashews", image: "https://www.farmley.com/cdn/shop/products/roasted_cashews.jpg" },
//       { name: "Organic Almonds", image: "https://www.farmley.com/cdn/shop/products/organic_almonds.jpg" }
//     ],
//     Raisins: [
//       { name: "Golden Raisins", image: "https://www.farmley.com/cdn/shop/products/raisins.jpg" },
//       { name: "Black Raisins", image: "https://www.farmley.com/cdn/shop/products/black_raisins.jpg" },
//       { name: "Organic Almonds", image: "https://www.farmley.com/cdn/shop/products/organic_almonds.jpg" }
//     ],
//     Dates: [
//       { name: "Medjool Dates", image: "https://www.farmley.com/cdn/shop/products/dates.jpg" },
//       { name: "Dry Dates", image: "https://www.farmley.com/cdn/shop/products/dry_dates.jpg" },
//       { name: "Organic Almonds", image: "https://www.farmley.com/cdn/shop/products/organic_almonds.jpg" }
//     ]
//   };
const Products = () => {
  
  const { dispatch } = useCart();
   // const router = useRouter();
   const navigate = useNavigate();
   //const router = useRouter();
   const [searchTerm, setSearchTerm] = useState("");
   const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products/group/grouped`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        const data = await response.json();
        const grouped: GroupedProducts = {};
        data.data.forEach((group: { category: string; products: Product[] }) => {
          grouped[group.category] = group.products;
        });

        setGroupedProducts(grouped);
       
      } catch (error) {
        console.error("Error fetching grouped products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredCategories = Object.keys(groupedProducts).filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //  const filteredCategories = Object.keys(products).filter(category => 
  //   category.toLowerCase().includes(searchTerm.toLowerCase())
  // ) as (keyof typeof products)[];
    return (
      <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Our Premium Dry Fruits</h1>
    
      <div className="flex justify-center my-4">
        <input 
          type="text" 
          placeholder="Search categories..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-1/2"
        />
      </div>
    
      {filteredCategories.map(category => (
  <div key={category} className="mt-8 relative">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-green-600">{category}</h2>
      <button 
        className="text-blue-600 font-semibold hover:underline cursor-pointer"
        onClick={() => navigate(`/products/${category.toLowerCase()}`)}
      >
        View All →
      </button>
    </div>

    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {groupedProducts[category]?.slice(0, 4).map((product, index) => {
        const priceObj = product.price || { offerPrice: 0, mrp: 0 };
        const { offerPrice, mrp } = priceObj;
        const savings = mrp - offerPrice;

        return (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg text-center w-full relative border hover:shadow-lg transition">
            {/* Discount badge */}
            {savings > 0 && (
              <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-sm shadow-sm">
                Save Rs. {savings.toFixed(2)}
              </div>
            )}

            {/* Product image */}
            <img
              src={product.images[0]}
              alt={product.name}
              onClick={() => navigate(`/product/${product._id}`)}
              className="w-full h-40 object-contain mb-2 rounded-lg"
            />

            {/* Product brand and name */}
            <div className="mt-2">
              <p className="text-sm text-gray-500 font-medium">{product.brand || "Farmley"}</p>
              <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
            </div>

            {/* Pricing */}
            <div className="mt-2">
              <span className="text-green-600 font-bold text-lg">Rs. {offerPrice}</span>
              {savings > 0 && (
                <span className="text-gray-400 line-through ml-2 text-sm">
                  Rs. {mrp}
                </span>
              )}
            </div>

            {/* Add to Cart button */}
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { ...product, quantity: 1 }, // default quantity
                });
                dispatch({ type: 'TOGGLE_CART' }); // Optional: open cart on adding
              }}
              className="mt-4 bg-blue-900 text-white w-full py-2 rounded hover:bg-blue-800"
            >
              Add to cart
            </button>
          </div>
        );
      })}
    </div>
  </div>
))}

    </div>
  
    
    
    );
  };
  
  export default Products;