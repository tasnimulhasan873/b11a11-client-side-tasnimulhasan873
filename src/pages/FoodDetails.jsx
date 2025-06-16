import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../context/AuthC';

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/food/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error('Error fetching food details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleRequest = async () => {
    const requestData = {
      ...food,
      requestNote: note,
      requestDate: new Date().toISOString(),
      requester: {
        email: user.email,
        name: user.displayName || 'Anonymous',
      },
    };

    try {
      // 1. Change food status to "requested"
      await axios.patch(`http://localhost:3000/food/${food._id}`, { status: 'requested' });

      // 2. Add to requested foods
      await axios.post(`http://localhost:3000/requested-foods`, requestData);

      setShowModal(false);
      alert('Request submitted successfully!');
      navigate('/my-requests');
    } catch (err) {
      console.error('Request failed:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!food) return <p>Food not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{food.name}</h2>
      <img src={food.image} alt={food.name} className="w-full rounded-lg mb-6" />
      <p><strong>Quantity:</strong> {food.quantity}</p>
      <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
      <p><strong>Expires on:</strong> {new Date(food.expireDateTime).toLocaleString()}</p>
      <p><strong>Notes:</strong> {food.additionalNotes || 'None'}</p>
      <p><strong>Donor:</strong> {food.donor?.name} ({food.donor?.email})</p>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Request
      </button>

      {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative text-gray-800 transform transition-all duration-300 scale-95 opacity-0 animate-scaleIn">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
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

      <h3 className="text-3xl font-extrabold mb-6 text-green-700 text-center">Request This Food</h3>

      <div className="space-y-4 mb-6">
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Food Name:</strong> {food.name}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Food ID:</strong> <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{food._id}</span>
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Donor:</strong> {food.donor?.name} (<a href={`mailto:${food.donor?.email}`} className="text-blue-600 hover:underline">{food.donor?.email}</a>)
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Your Email:</strong> <span className="text-blue-600">{user?.email}</span>
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Pickup Location:</strong> <span className="text-green-600 font-medium">{food.pickupLocation}</span>
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Expires On:</strong> <span className="text-red-600 font-medium">{new Date(food.expireDateTime).toLocaleString()}</span>
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-semibold">Request Date:</strong> {new Date().toLocaleString()}
        </p>

        {/* Editable Note */}
        <div>
          <label htmlFor="note" className="block text-lg font-semibold text-gray-800 mb-2">
            Additional Notes for Donor:
          </label>
          <textarea
            id="note"
            rows={4} // Increased rows for more space
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., I can pick this up tomorrow morning. Please let me know the best time."
            className="w-full border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 px-4 py-3 rounded-lg text-gray-800 resize-y transition duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => setShowModal(false)}
          className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleRequest}
          className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Confirm Request
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default FoodDetails;
