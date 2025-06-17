import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthC";
import PulsingDotLoader from "../components/PulsingDotLoader";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true); // Start loading before fetching
      try {
        const res = await axios.get(
          `https://a11-food-sharing-server-nine.vercel.app/requested-foods?email=${user.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load food requests:", err);
        // Optionally, add a user-friendly error message here
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-green-700">
        My Food Requests
      </h2>

      {loading ? (
        // Display the attractive loader while data is being fetched
        <PulsingDotLoader />
      ) : requests.length === 0 ? (
        // Display a more attractive message when no requests are found
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg border border-green-100 px-4 text-center"> {/* Added px-4 and text-center here */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-400 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-2xl font-semibold text-gray-700 mb-2">No Food Requests Found</p>
          <p className="text-lg text-gray-500 max-w-md mx-auto"> {/* Added mx-auto for centering text */}
            It looks like you haven't requested any food yet. Explore the available foods and make your first request!
          </p>
        </div>
      ) : (
        // Display the table with improved styling
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-green-100">
          <table className="min-w-full table-auto divide-y divide-gray-200 text-gray-800"> {/* Added table-auto */}
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-2xl">
                  Food Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Pickup Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Expire Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-2xl">
                  Request Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-green-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 text-lg font-medium text-gray-900">
                    {req.name}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-700">
                    {req.donor?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-700">
                    {req.pickupLocation}
                  </td>
                  <td className="px-6 py-4 text-lg text-red-600 font-medium">
                    {new Date(req.expireDateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-700">
                    {new Date(req.requestDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-lg text-gray-600 max-w-xs overflow-hidden text-ellipsis">
                    {req.requestNote || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;