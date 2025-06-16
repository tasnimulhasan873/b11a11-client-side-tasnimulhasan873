import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthC';

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFood, setEditingFood] = useState(null); // Modal state
  const [updating, setUpdating] = useState(false);

  const fetchUserFoods = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/manage-foods?email=${user.email}`);
      setFoods(res.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserFoods();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this food item?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/manage-foods/${id}`);
      setFoods((prev) => prev.filter((food) => food._id !== id));
      alert('Food deleted successfully.');
    } catch (error) {
      console.error('Error deleting food:', error);
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
    };

    try {
      await axios.put(`http://localhost:3000/manage-foods/${editingFood._id}`, updatedFood);
      alert('Food updated successfully!');
      setEditingFood(null);
      fetchUserFoods(); // Refresh list
    } catch (error) {
      console.error('Update failed', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-green-700">Loading your foods...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Manage My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-600">You haven't added any foods yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-gray-800">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Food Name</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Pickup Location</th>
                <th className="px-6 py-4 text-left">Expire Date</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4">{food.name}</td>
                  <td className="px-6 py-4">{food.quantity}</td>
                  <td className="px-6 py-4">{food.pickupLocation}</td>
                  <td className="px-6 py-4">{new Date(food.expireDateTime).toLocaleString()}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => setEditingFood(food)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    onClick={() => setEditingFood(null)}
  >
    <div
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-gray-800"
      onClick={(e) => e.stopPropagation()} // Prevent modal close on inside click
    >
      <h3 className="text-xl font-bold mb-4 text-green-700">Update Food</h3>
      <form onSubmit={handleUpdateSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={editingFood.name}
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
          required
          placeholder="Food Name"
        />
        <input
          type="text"
          name="quantity"
          defaultValue={editingFood.quantity}
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
          required
          placeholder="Quantity"
        />
        <input
          type="text"
          name="pickupLocation"
          defaultValue={editingFood.pickupLocation}
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-500"
          required
          placeholder="Pickup Location"
        />
        <input
          type="datetime-local"
          name="expireDateTime"
          defaultValue={
            editingFood.expireDateTime
              ? new Date(editingFood.expireDateTime).toISOString().slice(0, 16)
              : ''
          }
          className="w-full p-2 border rounded text-gray-900"
          required
        />

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setEditingFood(null)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={updating}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className={`px-4 py-2 rounded text-white ${
              updating ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {updating ? 'Updating...' : 'Update'}
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
