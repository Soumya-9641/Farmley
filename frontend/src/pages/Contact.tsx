import { useState } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${baseUrl}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        alert("message sent successfully")
      } else {
        const data = await response.json();
        setStatus(`Failed to send: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="container mx-auto pt-20 px-6 py-12">
      {/* Get in Touch Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-blue-700">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or simply want to learn more about our products, feel free to reach out. Our team is here to assist you.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="mt-12 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 text-center">Contact Form</h2>
        <p className="text-center text-gray-600 mt-2">Fill out the form below, and we’ll get back to you as soon as possible.</p>

        <form className="mt-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {status && (
            <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
          )}
        </form>
      </section>

      {/* Contact Info Section */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-blue-700">Contact Info</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">📍 Address</h3>
            <p className="text-gray-600 mt-2">Farmley Office Address</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">📞 Phone</h3>
            <p className="text-gray-600 mt-2">+91-XXXXXXXXXX</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-blue-600">📧 Email</h3>
            <p className="text-gray-600 mt-2">support@farmley.com</p>
          </div>
        </div>
        <p className="mt-4 text-gray-600">Our customer support team is available <span className="font-semibold">Monday to Saturday, 9 AM to 6 PM</span>.</p>
      </section>

      {/* Google Maps Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-blue-700 text-center">Find Us on the Map</h2>
        <div className="mt-6 w-full h-80">
          <iframe
            title="Farmley Location"
            className="w-full h-full rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8386678269477!2d-122.41941528469263!3d37.77492927975967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzMwLjciTiAxMjLCsDI1JzA5LjYiVw!5e0!3m2!1sen!2sus!4v1644820895652!5m2!1sen!2sus"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="mt-12 bg-blue-100 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-blue-800">Connect With Us</h2>
        <p className="text-gray-700 mt-2">Stay updated with the latest from Farmley! Follow us on our social media channels.</p>

        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-blue-600 text-3xl hover:text-blue-800 transition duration-300">📘 Facebook</a>
          <a href="#" className="text-pink-600 text-3xl hover:text-pink-800 transition duration-300">📸 Instagram</a>
          <a href="#" className="text-blue-400 text-3xl hover:text-blue-600 transition duration-300">🐦 Twitter</a>
          <a href="#" className="text-blue-700 text-3xl hover:text-blue-900 transition duration-300">💼 LinkedIn</a>
        </div>
      </section>
    </div>
    );
  };
  
  export default Contact;