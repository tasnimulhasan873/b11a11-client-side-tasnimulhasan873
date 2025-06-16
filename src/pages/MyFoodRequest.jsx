import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthC';

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/requested-foods?email=${user.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to load food requests:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  if (loading)
    return <p className="text-center mt-10 text-lg text-green-700">Loading your food requests...</p>;

  if (requests.length === 0)
    return <p className="text-center mt-10 text-lg text-gray-600">No requests found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-700">My Food Requests</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-gray-800">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Food Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Donor Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Pickup Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Expire Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Request Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Request Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-green-50 transition duration-150">
                <td className="px-6 py-4 text-sm">{req.name}</td>
                <td className="px-6 py-4 text-sm">{req.donor?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">{req.pickupLocation}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(req.expireDateTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(req.requestDate).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">{req.requestNote || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequest;
