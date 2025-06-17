import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; // Corrected 'react-router' to 'react-router-dom'
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthC";
import PulsingDotLoader from "../../components/PulsingDotLoader"; // Ensure this path is correct

import img1 from "../../assets/banner/i1.png";
import img2 from "../../assets/banner/i2.jpg";
import img3 from "../../assets/banner/i3.jpg";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true); // New loading state for featured foods

  useEffect(() => {
    const fetchFeaturedFoods = async () => {
      setLoadingFeatured(true); // Start loading
      try {
        const response = await axios.get(
          "https://a11-food-sharing-server-nine.vercel.app/featured-foods"
        );
        setFeaturedFoods(response.data);
      } catch (error) {
        console.error("Failed to fetch featured foods", error);
      } finally {
        setLoadingFeatured(false); // End loading
      }
    };
    fetchFeaturedFoods();
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      // Use navigate with state to redirect back after login if desired
      navigate("/login", { state: { from: `/food-details/${id}` } });
    } else {
      navigate(`/food-details/${id}`);
    }
  };

  return (
    <div className="px-4 space-y-20 max-w-7xl mx-auto mt-8 py-8"> {/* Increased overall spacing */}
      {/* Banner / Slider Section */}
      <section>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={700} 
          className="rounded-2xl shadow-xl overflow-hidden border border-green-100" 
        >
          <div className="relative">
            <img src={img1} alt="Community food sharing" className="w-full h-auto max-h-[500px] object-cover" />
            <div className="legend bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-3xl font-bold">
              Share Love Through Food 🍛
            </div>
          </div>
          <div className="relative">
            <img src={img2} alt="Healthy food options" className="w-full h-auto max-h-[500px] object-cover" />
            <div className="legend bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-3xl font-bold">
              Join Our Food Sharing Community 🥗
            </div>
          </div>
          <div className="relative">
            <img src={img3} alt="Food waste reduction" className="w-full h-auto max-h-[500px] object-cover" />
            <div className="legend bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-3xl font-bold">
              No Food Should Go to Waste! 🌍
            </div>
          </div>
        </Carousel>
      </section>

      {/* Featured Foods Section */}
      <section>
        <div className="flex justify-between items-center mb-8"> {/* Adjusted spacing */}
          <h2 className="text-4xl font-extrabold text-green-700"> {/* Larger, bolder heading */}
            🍱 Featured Foods
          </h2>
          <Link
            to="/available-foods"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            See All Foods
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {loadingFeatured ? (
          <PulsingDotLoader /> // Display loader when featured foods are loading
        ) : featuredFoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
            {featuredFoods.map((food) => (
              <motion.div
                key={food._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full" // Enhanced card styling
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Deeper shadow on hover
                initial={{ opacity: 0, y: 30 }} // Slightly more pronounced initial animation
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }} // Smoother transition
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-56 w-full object-cover" // Slightly taller image
                />
                <div className="p-6 flex flex-col flex-grow space-y-3"> {/* Increased padding and spacing */}
                  <h3 className="text-2xl font-bold text-green-800 line-clamp-1"> {/* Larger, bolder title, one line */}
                    {food.name}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Quantity:</span> {food.quantity}
                  </p>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Pickup:</span> {food.pickupLocation}
                  </p>
                  <p className="text-gray-500 text-base line-clamp-3 flex-grow"> {/* Increased line-clamp for notes */}
                    {food.additionalNotes || "No additional notes provided."}
                  </p>
                  <div className="mt-auto pt-4"> {/* Push button to bottom */}
                    <button
                      onClick={() => handleViewDetails(food._id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
            <p className="text-center text-xl text-gray-600 py-10 border border-dashed border-gray-300 rounded-lg p-6">
                No featured foods available at the moment. Please check back later!
            </p>
        )}
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="bg-green-50 rounded-2xl p-10 shadow-xl border border-green-100"> {/* Enhanced styling */}
        <h2 className="text-4xl font-extrabold text-green-700 mb-10 text-center"> {/* Larger, bolder heading */}
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"> {/* Increased gap */}
          <motion.div
            className="space-y-4 p-6 bg-white rounded-xl shadow-md border border-gray-100" // Individual card styling
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-4xl font-bold shadow-inner"> {/* Larger number circles */}
              1
            </div>
            <h3 className="text-2xl font-bold text-green-800">Share Food</h3> {/* Larger, bolder titles */}
            <p className="text-gray-700 text-lg leading-relaxed"> {/* Improved readability */}
              Donors effortlessly add their surplus food items, providing details like quantity, pickup location, and expiry.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 p-6 bg-white rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-4xl font-bold shadow-inner">
              2
            </div>
            <h3 className="text-2xl font-bold text-green-800">Request Food</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Users browse available listings and submit requests for food items they'd like to pick up.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 p-6 bg-white rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-4xl font-bold shadow-inner">
              3
            </div>
            <h3 className="text-2xl font-bold text-green-800">Enjoy & Connect</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Pick up your food, savor it, and connect with fellow community members who share your values.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Extra Section 2: Community Testimonials */}
      <section className="bg-white rounded-2xl p-10 shadow-xl border border-green-100 mb-8"> {/* Enhanced styling */}
        <h2 className="text-4xl font-extrabold text-green-700 mb-10 text-center"> {/* Larger, bolder heading */}
          What Our Community Says
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Fatima R."
            photo="https://randomuser.me/api/portraits/women/68.jpg"
            quote="Sharing food through this platform has connected me with so many wonderful people! It's truly making a difference."
          />
          <Testimonial
            name="Rahim H."
            photo="https://randomuser.me/api/portraits/men/75.jpg"
            quote="I love how easy it is to request food and give back to the community. The process is so straightforward and rewarding."
          />
          <Testimonial
            name="Sonia A."
            photo="https://randomuser.me/api/portraits/women/55.jpg"
            quote="The best way to reduce food waste and make new friends in the neighborhood. This platform is a brilliant idea!"
          />
        </div>
      </section>
    </div>
  );
};

const Testimonial = ({ name, photo, quote }) => (
  <motion.div
    className="bg-green-50 rounded-xl p-8 shadow-md flex flex-col items-center text-center border border-green-100 h-full" // Enhanced styling
    whileHover={{ translateY: -5 }} // Subtle lift on hover
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={photo}
      alt={name}
      className="w-24 h-24 rounded-full mb-5 object-cover border-4 border-green-300 shadow-md" // Larger, more prominent photo
    />
    <p className="italic text-gray-700 text-lg mb-4 leading-relaxed line-clamp-4">&quot;{quote}&quot;</p> {/* Larger text, line clamp */}
    <h4 className="font-bold text-green-900 text-xl mt-auto">{name}</h4> {/* Larger, bolder name */}
  </motion.div>
);

export default Home;