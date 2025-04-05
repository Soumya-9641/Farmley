const About = () => {
    return (
        <div className="container mx-auto pt-20 px-6 py-12">
        {/* Our Story Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700">Our Story</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to <span className="text-green-600 font-semibold">Farmley</span>, where quality meets tradition. Our journey began with a simple goal — to bring the finest dry fruits from trusted farmers directly to your home. With a focus on purity and freshness, we ensure every bite is packed with nutrition and taste.
          </p>
        </section>
  
        {/* Heritage & Innovation Section */}
        <section className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-green-700 text-center">Heritage & Innovation</h2>
          <p className="mt-4 text-gray-700 text-lg text-center">
            At Farmley, we celebrate the rich heritage of dry fruits while embracing innovation to meet modern tastes. From carefully selecting premium nuts to delivering them with care, our passion drives everything we do.
          </p>
        </section>
  
        {/* Sustainability Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-green-700 text-center">Sustainability</h2>
          <p className="mt-4 text-gray-600 text-lg text-center">
            We believe in responsible sourcing and supporting local farming communities. Our partnerships with ethical farmers ensure that every product is grown using sustainable practices.
          </p>
  
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold text-green-600">🌱 Eco-Friendly Practices</h3>
              <p className="text-gray-600 mt-2">Minimizing carbon footprints and reducing waste.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold text-green-600">🤝 Fair Trade Partnerships</h3>
              <p className="text-gray-600 mt-2">Empowering farmers with fair wages and better opportunities.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold text-green-600">♻️ Sustainable Packaging</h3>
              <p className="text-gray-600 mt-2">Using recyclable and biodegradable materials.</p>
            </div>
          </div>
        </section>
  
        {/* Why Choose Us Section */}
        <section className="mt-12 bg-green-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-green-800 text-center">Why Choose Us?</h2>
          <p className="text-center text-gray-700 mt-4">
            At Farmley, we stand by our commitment to quality and customer satisfaction. Here’s why we are a preferred choice for dry fruit lovers:
          </p>
          <ul className="mt-6 space-y-4 max-w-2xl mx-auto">
            <li className="flex items-center text-lg text-gray-700">
              ✅ <span className="ml-2 font-semibold text-green-700">Premium Quality:</span> Sourced from the best farms, processed with utmost care.
            </li>
            <li className="flex items-center text-lg text-gray-700">
              ✅ <span className="ml-2 font-semibold text-green-700">No Additives or Preservatives:</span> Pure, natural goodness in every bite.
            </li>
            <li className="flex items-center text-lg text-gray-700">
              ✅ <span className="ml-2 font-semibold text-green-700">Certified Excellence:</span> Compliant with industry standards for safety and quality.
            </li>
            <li className="flex items-center text-lg text-gray-700">
              ✅ <span className="ml-2 font-semibold text-green-700">Customer-Centric Service:</span> Dedicated support to ensure a seamless shopping experience.
            </li>
          </ul>
        </section>
  
        {/* Final CTA */}
        <section className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800">Join us on this journey of taste, health, and sustainability.</h3>
          <p className="text-gray-600 mt-2">
            Because at <span className="text-green-600 font-bold">Farmley</span>, we believe in nourishing lives, one nut at a time.
          </p>
        </section>
      </div>
    );
  };
  
  export default About;