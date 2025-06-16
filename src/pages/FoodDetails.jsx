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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-xl relative text-gray-800">
      <h3 className="text-2xl font-bold mb-4 text-green-700">Request This Food</h3>
      <div className="space-y-2">
        <p className="text-gray-800"><strong>Food Name:</strong> {food.name}</p>
        <p className="text-gray-800"><strong>Food ID:</strong> {food._id}</p>
        <p className="text-gray-800"><strong>Donor Email:</strong> {food.donor?.email}</p>
        <p className="text-gray-800"><strong>Donor Name:</strong> {food.donor?.name}</p>
        <p className="text-gray-800"><strong>Your Email:</strong> {user?.email}</p>
        <p className="text-gray-800"><strong>Pickup Location:</strong> {food.pickupLocation}</p>
        <p className="text-gray-800"><strong>Expire Date:</strong> {new Date(food.expireDateTime).toLocaleString()}</p>
        <p className="text-gray-800"><strong>Request Date:</strong> {new Date().toLocaleString()}</p>

        {/* Editable Note */}
        <div>
          <label htmlFor="note" className="block font-medium text-gray-800">
            Additional Notes
          </label>
          <textarea
            id="note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border px-3 py-2 rounded text-gray-800"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleRequest}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
