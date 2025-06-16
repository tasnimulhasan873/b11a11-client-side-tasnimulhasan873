import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthC";
import axios from "axios";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expireDateTime, setExpireDateTime] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [status, setStatus] = useState("available");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to add food.");
      navigate("/login");
      return;
    }

    const newFood = {
      name: foodName,
      image: foodImage,
      quantity: Number(quantity),
      pickupLocation,
      expireDateTime,
      additionalNotes,
      donor: {
        name: user.displayName || "Anonymous",
        email: user.email,
        image: user.photoURL || "",
      },
      status,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        'http://localhost:3000/foods',
        newFood
      );
      console.log("Food saved:", res.data);
      navigate("/available-foods");
    } catch (error) {
      console.error("Error saving food:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-down">
        <div className="p-8 sm:p-10">
          <h2 className="text-center text-4xl font-extrabold text-green-800 mb-8 tracking-tight">
            Share Your Surplus Food
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10">
            Help reduce food waste by adding your excess food items here.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Food Name */}
            <div>
              <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                id="foodName"
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
                placeholder="e.g., Freshly Baked Bread"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600 transition duration-150 ease-in-out"
              />
            </div>

            {/* Food Image URL */}
            <div>
              <label htmlFor="foodImage" className="block text-sm font-medium text-gray-700 mb-1">
                Food Image URL
              </label>
              <input
                id="foodImage"
                type="url"
                value={foodImage}
                onChange={(e) => setFoodImage(e.target.value)}
                required
                placeholder="e.g., https://example.com/bread.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600 transition duration-150 ease-in-out"
              />
            </div>

            {/* Food Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Food Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="e.g., 5 servings or 1 dozen"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600 transition duration-150 ease-in-out"
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location
              </label>
              <input
                id="pickupLocation"
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
                placeholder="e.g., 123 Main St, City, State"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600 transition duration-150 ease-in-out"
              />
            </div>

            {/* Expired Date/Time */}
            <div>
              <label htmlFor="expireDateTime" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date/Time
              </label>
              <input
                id="expireDateTime"
                type="datetime-local"
                value={expireDateTime}
                onChange={(e) => setExpireDateTime(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 transition duration-150 ease-in-out"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
                placeholder="e.g., Contains nuts, best consumed within 24 hours, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600 transition duration-150 ease-in-out"
              ></textarea>
            </div>

            {/* Food Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Food Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900 transition duration-150 ease-in-out"
              >
                <option value="available">Available</option>
              </select>
            </div>

            {/* Donor Info */}
            <div className="bg-green-50 p-5 rounded-xl border border-green-200 text-green-800 shadow-inner">
              <p className="text-lg font-semibold mb-2">Your Donor Information:</p>
              <div className="flex items-center space-x-4">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Donor"
                    className="w-16 h-16 rounded-full border-2 border-green-400 object-cover"
                  />
                )}
                <div>
                  <p className="text-gray-900 font-medium">
                    <span className="font-bold">Name:</span> {user?.displayName || "Anonymous"}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-bold">Email:</span> {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Add Food for Sharing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
