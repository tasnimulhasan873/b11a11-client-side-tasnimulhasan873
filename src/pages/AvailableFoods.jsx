import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

const fetchFoods = async (order) => {
  try {
    const res = await axios.get(`http://localhost:3000/available-foods?sort=${order}`);
    console.log("Fetched data:", res.data); 
    const foodArray = Array.isArray(res.data) ? res.data : res.data?.data || [];
    setFoods(foodArray);
  } catch (err) {
    console.error('Failed to load foods:', err);
    setFoods([]); 
  }
};

  useEffect(() => {
    fetchFoods(sortOrder);
  }, [sortOrder]);

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Available Foods</h2>

      {/* Sorting */}
      <div className="flex justify-end mb-6">
        <label className="mr-2 text-gray-700 font-medium">Sort by Expiration:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        >
          <option value="asc">Soonest Expiring</option>
          <option value="desc">Latest Expiring</option>
        </select>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white p-6 rounded-xl shadow-lg">
            <img
              src={food.image}
              alt={food.name}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-green-700">{food.name}</h3>
            <p className="text-gray-600">Quantity: {food.quantity}</p>
            <p className="text-gray-600">Location: {food.pickupLocation}</p>
            <p className="text-gray-600">Expires: {new Date(food.expireDateTime).toLocaleString()}</p>
            <p className="text-gray-600 mt-2 text-sm">{food.additionalNotes}</p>
            <div className="mt-4 text-sm text-gray-500">
              Donor: {food.donor?.name} ({food.donor?.email})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
