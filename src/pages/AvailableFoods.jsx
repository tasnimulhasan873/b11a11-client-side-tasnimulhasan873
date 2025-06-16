import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchFoods = async (order) => {
    try {
      const res = await axios.get(`http://localhost:3000/available-foods?sort=${order}`);
      console.log("Fetched data:", res.data);
      // Ensure res.data is an array or has a 'data' property that's an array
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
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-green-700">Available Foods</h2>

      {/* Sorting */}
      <div className="flex justify-center md:justify-end mb-8">
        <label htmlFor="sort-expiration" className="mr-3 text-lg text-gray-700 font-semibold">Sort by Expiration:</label>
        <select
          id="sort-expiration"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-green-400 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 transition duration-300 ease-in-out hover:border-green-500"
        >
          <option value="asc">Soonest Expiring</option>
          <option value="desc">Latest Expiring</option>
        </select>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-56 object-cover object-center rounded-t-2xl"
              />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2 leading-tight">{food.name}</h3>
                  <p className="text-gray-700 text-base mb-1">
                    <strong className="font-semibold">Quantity:</strong> {food.quantity}
                  </p>
                  <p className="text-gray-700 text-base mb-1">
                    <strong className="font-semibold">Location:</strong> {food.pickupLocation}
                  </p>
                  <p className="text-red-500 text-base font-medium mb-3">
                    <strong className="font-semibold">Expires:</strong> {new Date(food.expireDateTime).toLocaleString()}
                  </p>
                  {food.additionalNotes && (
                    <p className="text-gray-600 text-sm italic border-l-4 border-green-300 pl-3 py-1 mb-4">
                      {food.additionalNotes}
                    </p>
                  )}
                </div>
                <div className="pt-4 border-t border-gray-200 mt-auto">
                  <p className="text-sm text-gray-500">
                    <strong className="font-medium">Donor:</strong> {food.donor?.name} (<a href={`mailto:${food.donor?.email}`} className="text-green-600 hover:underline">{food.donor?.email}</a>)
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl text-gray-600 py-10">No available foods to display.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;