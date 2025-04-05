import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
const Home = () => {
    return (
        <>
        <div className="pt-20">
        {/* Carousel Section */}
        <section className="w-full">
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            <div>
              <img src="https://www.farmley.com/cdn/shop/files/Farmley_Cranberry_Apricots_2000x.png?v=1715062209" alt="Banner 1" className="rounded-lg" />
            </div>
            <div>
              <img src="https://www.farmley.com/cdn/shop/files/Artboard_1_copy_5-100_2000x.jpg?v=1715062384" alt="Banner 2" className="rounded-lg" />
            </div>
            <div>
              <img src="https://www.farmley.com/cdn/shop/files/Artboard_1_copy_17-100_2000x.jpg?v=1715062545" alt="Banner 3" className="rounded-lg" />
            </div>
          </Carousel>
        </section>
      </div>
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold">Welcome to Farmley</h1>
        <p className="mt-4 text-lg"> your one-stop destination for premium quality dry fruits. Our products are sourced from the finest farms to ensure freshness and nutrition in every bite. Experience the goodness of nature with every snack!
        .</p>
        <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded">Shop Now</button>
      </div>
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">About Farmley</h1>
        <p className="text-center text-gray-600 mt-2 max-w-3xl mx-auto">
          At Farmley, we are passionate about bringing you the finest dry fruits directly from trusted farmers.
          Our commitment to quality and authenticity ensures that every product meets the highest standards.
          Whether it’s almonds, cashews, raisins, or dates, we deliver wholesome goodness to your doorstep.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">100% Natural and Fresh</h2>
            <p className="text-gray-600 mt-2">Our products are free from additives and preservatives, ensuring pure goodness.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">Ethically Sourced</h2>
            <p className="text-gray-600 mt-2">We partner with trusted farmers to bring you sustainably sourced dry fruits.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">Quality Assured</h2>
            <p className="text-gray-600 mt-2">Each batch is carefully inspected to meet the highest quality standards.</p>
          </div>
        </div>
      </div>
       {/* Customer Testimonials Section */}
       <div className="container mx-auto  px-4 mt-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Customer Testimonials</h1>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={4000}
          className="max-w-2xl mx-auto mt-6"
        >
          <div className="p-6 bg-green-200  shadow-md rounded-lg text-center">
            <p className="text-gray-700 italic">"Absolutely love the freshness of Farmley’s almonds. Highly recommend!"</p>
            <h3 className="mt-2 font-semibold">— Priya S.</h3>
          </div>
          <div className="p-6 bg-green-200 shadow-md rounded-lg text-center">
            <p className="text-gray-700 italic">"The best dry fruits I've ever had. Great taste and quality!"</p>
            <h3 className="mt-2 font-semibold">— Rahul K.</h3>
          </div>
          <div className="p-6 bg-green-200  shadow-md rounded-lg text-center">
            <p className="text-gray-700 italic">"Perfect for gifting! The packaging was elegant and premium."</p>
            <h3 className="mt-2 font-semibold">— Ananya M.</h3>
          </div>
        </Carousel>
      </div>
      </>
    );
  };
  
  export default Home;
  