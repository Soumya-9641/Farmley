import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp ? `${baseUrl}/api/auth/signup` : `${baseUrl}/api/auth/login`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isSignUp
            ? {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
              }
            : {
                email: formData.email,
                password: formData.password,
              }
        ),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      
      auth?.login(data.email, data.token);
      navigate("/"); // Save token for authentication
      alert(isSignUp ? "Sign Up Successful!" : "Sign In Successful!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      setError(error.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
    {/* Background Image */}
    <div className="absolute inset-0 bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230718/pngtree-3d-rendered-login-page-templates-with-a-modern-realistic-twist-image_3904125.jpg')] bg-cover bg-center opacity-60"></div>

    {/* Auth Form */}
    <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
      {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

        {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
              />
            </div>
          )}
         <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
      </form>

      <p className="text-center mt-4">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-blue-600 font-semibold hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  </div>

  );
};

export default AuthForm;
