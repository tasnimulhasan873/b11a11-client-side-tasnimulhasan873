import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import foodData from "../../../public/availableFoods.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AuthContext } from "../../context/AuthC";
import img1 from "../../assets/banner/i1.png";
import img2 from "../../assets/banner/i2.jpg";
import img3 from "../../assets/banner/i3.jpg";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [featuredFoods, setFeaturedFoods] = useState([]);

  useEffect(() => {
    // Sort by quantity descending and pick top 6
    const sorted = [...foodData]
      .filter((food) => food.status === "available")
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 6);
    setFeaturedFoods(sorted);
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/food/${id}`);
    }
  };

  return (
    <div className="px-4 space-y-16 max-w-7xl mx-auto mt-8">
      {/* Banner / Slider */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        className="rounded-xl shadow-lg"
      >
        <div>
          <img src={img1} alt="Slide 1" />
          <p className="legend">Share Love Through Food 🍛</p>
        </div>
        <div>
          <img src={img2} alt="Slide 2" />
          <p className="legend">Join Our Food Sharing Community 🥗</p>
        </div>
        <div>
          <img src={img3} alt="Slide 3" />
          <p className="legend">No Food Should Go to Waste!</p>
        </div>
      </Carousel>

      {/* Featured Foods Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">🍱 Featured Foods</h2>
          <Link
            to="/available-foods"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Show All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-green-800">
                  {food.name}
                </h3>
                <p className="text-gray-600">Quantity: {food.quantity}</p>
                <p className="text-gray-600">Pickup: {food.pickupLocation}</p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {food.description}
                </p>
                <button
                  onClick={() => handleViewDetails(food.id)}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="bg-green-50 rounded-xl p-8 shadow-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-3xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Share Food</h3>
            <p className="text-gray-700">
              Donors add available food items they want to share.
            </p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-3xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Request Food</h3>
            <p className="text-gray-700">
              Users request the food items they want to pick up.
            </p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-200 text-green-700 text-3xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">Enjoy & Connect</h3>
            <p className="text-gray-700">
              Pick up your food and enjoy while connecting with your community.
            </p>
          </div>
        </div>
      </section>

      {/* Extra Section 2: Community Testimonials */}
      <section className="bg-white rounded-xl p-8 shadow-md mb-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          What Our Community Says
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Fatima R."
            photo="https://randomuser.me/api/portraits/women/68.jpg"
            quote="Sharing food through this platform has connected me with so many wonderful people!"
          />
          <Testimonial
            name="Rahim H."
            photo="https://randomuser.me/api/portraits/men/75.jpg"
            quote="I love how easy it is to request food and give back to the community."
          />
          <Testimonial
            name="Sonia A."
            photo="https://randomuser.me/api/portraits/women/55.jpg"
            quote="The best way to reduce food waste and make new friends in the neighborhood."
          />
        </div>
      </section>
    </div>
  );
};

const Testimonial = ({ name, photo, quote }) => (
  <div className="bg-green-50 rounded-lg p-6  shadow-sm flex flex-col items-center text-center">
    <img
      src={photo}
      alt={name}
      className="w-20 h-20 rounded-full mb-4 object-cover"
    />
    <p className="italic text-gray-700 mb-3">&quot;{quote}&quot;</p>
    <h4 className="font-semibold text-green-900">{name}</h4>
  </div>
);

export default Home;
