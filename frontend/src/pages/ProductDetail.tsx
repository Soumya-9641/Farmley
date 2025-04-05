import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext";
interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  ingredients: string[];
  shelfLife: string;
  images: string[];
  stock: number;
  price: {
    mrp: number;
    offerPrice: number;
  };
  processedBy: {
    company: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ProductDetails = () => {
  const { dispatch } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  //const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products/${id}`);
        console.log(res.data)
        setProduct(res.data);
        const relatedRes = await axios.get(
          `${baseUrl}/api/products/${id}/suggestions`
        );
        const filteredProducts = relatedRes.data.filter(
          (item: Product) => item._id !== res.data._id
        );
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-32 text-center text-xl text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-32 text-center text-red-600 text-xl">
        Product not found.
      </div>
    );
  }

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (!product) return <div className="text-center mt-20 text-xl">Product not found</div>;
  // Mock product details (replace with API call)
  // const product = {
  //   id,
  //   name: "Peri Peri Snack Mix",
  //   price: 459.0,
  //   mrp: 549.0,
  //   size: "405 g",
  //   composition: [
  //     "Black Raisins",
  //     "Pumpkin Seeds",
  //     "Peanuts",
  //     "Almonds",
  //     "Cashews",
  //     "Sunflower Seeds",
  //   ],
  //   description:
  //     "Farmley's Peri Peri Snack Mix is sprinkled with a widely loved peri peri seasoning and carries 23% protein content.",
  //   origin: "India",
  //   shelfLife: "6 Months",
  //   ingredients:
  //     "Almonds, Cashews, Pumpkin Seeds, Sunflower Seeds, Peanuts, Black Raisins, Olive Oil, Seasoning",
  //   manufacturer:
  //     "Connedit Business Solutions Pvt. Ltd., Indore, Madhya Pradesh - 452001",
  //   image: "/path-to-image.png", // Replace with actual image URL
  // };
  const handleIncrement = () => {
    if (quantity < product.stock) setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-80 h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-green-600 font-semibold mt-2">
            Save Rs. {product.price.mrp - product.price.offerPrice}
          </p>

          <div className="mt-4">
            <p className="text-lg font-medium">Brand: {product.brand}</p>
            <p className="text-base text-gray-600">Category: {product.category}</p>
          </div>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-gray-500 line-through">M.R.P: Rs. {product.price.mrp}</p>
            <p className="text-xl font-bold text-green-600">
              Offer Price: Rs. {product.price.offerPrice} (incl. of all taxes)
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center">
            <span className="mr-4">Quantity:</span>
            <button className="px-3 py-1 border" onClick={handleDecrement}
              disabled={quantity === 1}>-</button>
            <span className="mx-2">{quantity}</span>
            <button className="px-3 py-1 border" onClick={handleIncrement}
              disabled={quantity >= product.stock}>+</button>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-900 text-white px-6 py-2 rounded" onClick={() => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: quantity }, // default quantity
    });
    dispatch({ type: 'TOGGLE_CART' }); // Optional: open cart on adding
  }}>Add to cart</button>
            <button className="bg-blue-900 text-white px-6 py-2 rounded">Buy It Now</button>
          </div>
        </div>
      </div>

      {/* Description & More Info */}
      <div className="mt-12 flex justify-center">
        <div className="bg-slate-200 shadow-xl rounded-2xl p-8 max-w-4xl w-full space-y-10 border border-gray-200">
          {/* Description */}
          <section>
            <h2 className="text-3xl font-extrabold text-center text-green-700 mb-3 relative">
              Description
              <span className="block w-20 h-1 bg-orange-400 mx-auto mt-1 rounded-full" />
            </h2>
            <p className="text-gray-700 text-lg text-center leading-relaxed">
              {product.description}
            </p>
          </section>

          {/* Ingredients */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-2 text-center">Ingredients</h3>
            <ul className="list-disc pl-6 text-gray-800 text-base">
              {product.ingredients.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))}
            </ul>
          </section>

          {/* Shelf Life */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-2 text-center">Shelf Life</h3>
            <p className="text-gray-700 text-base text-center">{product.shelfLife}</p>
          </section>

          {/* Country of Origin */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-2 text-center">Country of Origin</h3>
            <p className="text-gray-700 text-base text-center">India</p>
          </section>

          {/* Manufacturer */}
          <section>
            <h3 className="text-2xl font-semibold text-green-600 mb-2 text-center">
              Processed, Packed & Marketed by
            </h3>
            <p className="text-gray-700 text-base text-center">
              {product.processedBy.company}, {product.processedBy.address}
            </p>
          </section>
        </div>
      </div>
      <section className="mt-16">
  <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
    You May Also Like
  </h2>
  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-2">
    {relatedProducts.map((item) => (
      <div key={item._id} className="bg-white rounded-lg shadow p-2 text-center">
        <img
          src={item.images[0]}
          alt={item.name}
          onClick={() => navigate(`/product/${product._id}`)}
          className="h-28 w-full object-contain mb-2 rounded"
        />
        <h3 className="text-sm font-semibold line-clamp-2">{item.name}</h3>
        <p className="text-xs text-gray-600">{item.brand}</p>
        <p className="text-xs text-gray-600">{item.category}</p>
        <div className="text-green-700 font-semibold text-sm">
          ₹{item.price.offerPrice}
          <span className="line-through text-gray-400 text-xs ml-1">
            ₹{item.price.mrp}
          </span>
        </div>
        <a
          href={`/product/${item._id}`}
          className="inline-block mt-2 bg-blue-900 text-white text-xs px-3 py-1 rounded hover:bg-blue-800 transition"
        >
          View
        </a>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};

export default ProductDetails;
