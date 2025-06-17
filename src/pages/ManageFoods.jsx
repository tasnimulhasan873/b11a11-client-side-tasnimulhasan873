import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthC";
import PulsingDotLoader from '../components/PulsingDotLoader'; 

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null); // Modal state
  const [updating, setUpdating] = useState(false);

  const fetchUserFoods = async () => {
    setLoading(true); // Start loading before fetch
    try {
      const res = await axios.get(
        `https://a11-food-sharing-server-nine.vercel.app/manage-foods?email=${user.email}`
      );
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false); // End loading after fetch completes
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserFoods();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://a11-food-sharing-server-nine.vercel.app/manage-foods/${id}`
      );
      setFoods((prev) => prev.filter((food) => food._id !== id));
      alert("Food deleted successfully.");
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Failed to delete food.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.target;
    const updatedFood = {
      name: form.name.value,
      quantity: form.quantity.value,
      pickupLocation: form.pickupLocation.value,
      expireDateTime: form.expireDateTime.value,
      // Ensure image and additionalNotes are also sent if editable in the form
      // image: editingFood.image, // Assuming image is not updated in this form
      // additionalNotes: editingFood.additionalNotes, // Assuming notes are not updated
    };

    try {
      await axios.put(
        `https://a11-food-sharing-server-nine.vercel.app/manage-foods/${editingFood._id}`,
        updatedFood
      );
      alert("Food updated successfully!");
      setEditingFood(null); // Close modal
      fetchUserFoods(); // Refresh list to show updated data
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update food. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700">
        Manage My Foods
      </h2>

      {loading ? (
        // Pulsing Dot Loader integrated here
        <PulsingDotLoader />
      ) : foods.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-10 border border-dashed border-gray-300 rounded-lg p-6">
          You haven't added any food items yet. Start sharing to reduce waste!
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-green-100">
          <table className="min-w-full divide-y divide-gray-200 text-gray-800">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-2xl">Food Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Pickup Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Expire Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-green-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{food.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{food.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-700">{food.pickupLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-red-600 font-medium">
                    {new Date(food.expireDateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-3">
                    <button
                      onClick={() => setEditingFood(food)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {editingFood && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setEditingFood(null)} // Close modal on outside click
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative text-gray-800 transform scale-100 animate-scaleIn"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inside click
          >
            {/* Close button for modal */}
            <button
              onClick={() => setEditingFood(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-3xl font-bold mb-6 text-green-700 text-center">
              Update Food Item
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              <div>
                <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                <input
                  type="text"
                  id="foodName"
                  name="name"
                  defaultValue={editingFood.name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400 transition duration-200"
                  required
                  placeholder="e.g., Fresh Apples"
                />
              </div>
              <div>
                <label htmlFor="foodQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number" // Changed to number type for quantity
                  id="foodQuantity"
                  name="quantity"
                  defaultValue={editingFood.quantity}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400 transition duration-200"
                  required
                  placeholder="e.g., 5 kg"
                  min="1" // Ensure quantity is at least 1
                />
              </div>
              <div>
                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  defaultValue={editingFood.pickupLocation}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-400 transition duration-200"
                  required
                  placeholder="e.g., Community Hall, Main Street"
                />
              </div>
              <div>
                <label htmlFor="expireDateTime" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date/Time</label>
                <input
                  type="datetime-local"
                  id="expireDateTime"
                  name="expireDateTime"
                  defaultValue={
                    editingFood.expireDateTime
                      ? new Date(editingFood.expireDateTime).toISOString().slice(0, 16)
                      : ""
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-900 transition duration-200"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingFood(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    updating
                      ? "bg-green-400 cursor-not-allowed text-gray-200"
                      : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500"
                  }`}
                >
                  {updating ? "Updating..." : "Update Food"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;