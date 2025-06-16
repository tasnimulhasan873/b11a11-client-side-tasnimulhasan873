import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]); // all foods from backend
  const [filteredFoods, setFilteredFoods] = useState([]); // foods after search/sort
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch foods from backend with sorting
  const fetchFoods = async (order) => {
    try {
      const res = await axios.get(`http://localhost:3000/available-foods?sort=${order}`);
      setFoods(res.data);
      setFilteredFoods(res.data); // initially filtered is all foods
    } catch (err) {
      console.error('Failed to load foods:', err);
    }
  };

  // Fetch foods on mount and when sortOrder changes
  useEffect(() => {
    fetchFoods(sortOrder);
  }, [sortOrder]);

  // Filter foods based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [searchTerm, foods]);

  // Navigate to details page with food id
  const handleViewDetails = (id) => {
    navigate(`/food-details/${id}`);
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Available Foods</h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by food name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 w-full md:w-1/3"
        />

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-700 font-medium">Sort by Expiration:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="asc">Soonest Expiring</option>
            <option value="desc">Latest Expiring</option>
          </select>
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No foods found.</p>
        ) : (
          filteredFoods.map(food => (
            <div key={food._id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-green-700">{food.name}</h3>
              <p className="text-gray-600">Quantity: {food.quantity}</p>
              <p className="text-gray-600">Location: {food.pickupLocation}</p>
              <p className="text-gray-600">
                Expires: {new Date(food.expireDateTime).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2 text-sm">{food.additionalNotes}</p>
              <div className="mt-auto pt-4">
                <button
                  onClick={() => handleViewDetails(food._id)}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
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
