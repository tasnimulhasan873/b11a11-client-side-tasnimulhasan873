import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PulsingDotLoader from "../components/PulsingDotLoader"; 

const fetchFoods = async (sortOrder) => {
  const res = await axios.get(
    `https://a11-food-sharing-server-nine.vercel.app/available-foods?sort=${sortOrder}`
  );
  return res.data;
};

const AvailableFoods = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const navigate = useNavigate();

  const {
    data: foods = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableFoods", sortOrder],
    queryFn: () => fetchFoods(sortOrder),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [searchTerm, foods]);

  const handleViewDetails = (id) => {
    navigate(`/food-details/${id}`);
  };

  // Replace the loading paragraph with the PulsingDotLoader component
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <PulsingDotLoader />
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        Failed to load foods. Please try again later.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
        Available Foods
      </h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by food name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 w-full md:w-1/3 transition duration-150 ease-in-out"
        />

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-700 font-medium">
            Sort by Expiration:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
          >
            <option value="asc">Soonest Expiring</option>
            <option value="desc">Latest Expiring</option>
          </select>
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg py-10">
            No foods found matching your criteria.
          </p>
        ) : (
          filteredFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col hover:shadow-xl transform hover:-translate-y-1 transition duration-200 ease-in-out"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-green-700 mb-2">{food.name}</h3>
              <p className="text-gray-600 text-sm mb-1">Quantity: <span className="font-medium">{food.quantity}</span></p>
              <p className="text-gray-600 text-sm mb-1">Location: <span className="font-medium">{food.pickupLocation}</span></p>
              <p className="text-gray-600 text-sm">
                Expires: <span className="font-medium">{new Date(food.expireDateTime).toLocaleString()}</span>
              </p>
              {food.additionalNotes && (
                <p className="text-gray-500 mt-3 text-sm italic border-t border-gray-200 pt-3">
                  Notes: {food.additionalNotes}
                </p>
              )}
              <div className="mt-auto pt-6">
                <button
                  onClick={() => handleViewDetails(food._id)}
                  className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;