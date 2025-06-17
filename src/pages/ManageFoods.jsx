import { useContext, useEffect, useState } from "react";
import axiosSecure from "../axiosSecure";
import { AuthContext } from "../context/AuthC";


const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/manage-foods?email=${user.email}`)
        .then((res) => setFoods(res.data))
        .catch((error) => {
          console.error("Error fetching foods:", error);
        });
    }
  }, [user?.email]);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    if (isNaN(date)) return dateTimeStr;
    return date.toLocaleString();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedFood = {
      foodName: form.foodName.value,
      foodQuantity: form.foodQuantity.value,
      pickupLocation: form.pickupLocation.value,
      expiredDateTime: form.expiredDateTime.value,
      additionalNotes: form.additionalNotes.value,
    };

    try {
      const response = await axiosSecure.put(
        `/manage-foods/${editingFood._id}`,
        updatedFood
      );

      if (response.data.modifiedCount > 0) {
        alert("Food updated successfully");

        const updatedFoods = foods.map((food) =>
          food._id === editingFood._id ? { ...food, ...updatedFood } : food
        );
        setFoods(updatedFoods);
        setEditingFood(null);
      }
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const response = await axiosSecure.delete(`/manage-foods/${id}`);

      if (response.data.deletedCount > 0) {
        alert("Food deleted successfully");
        setFoods(foods.filter((food) => food._id !== id));
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="p-4 text-gray-800 dark:text-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Manage My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No foods available to manage.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border text-sm md:text-base">
            <thead>
              <tr className="bg-green-700 text-white">
                <th>#</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, idx) => (
                <tr key={food._id} className="border-b">
                  <td>{idx + 1}</td>
                  <td>{food.foodName}</td>
                  <td>{food.foodQuantity}</td>
                  <td>{food.pickupLocation}</td>
                  <td>{formatDateTime(food.expiredDateTime)}</td>
                  <td>{food.additionalNotes}</td>
                  <td>
                    <button
                      onClick={() => setEditingFood(food)}
                      className="btn btn-sm btn-warning mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error"
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

      {/* Edit Modal */}
      {editingFood && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg w-[90%] max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4">Edit Food</h3>

            <input
              type="text"
              name="foodName"
              defaultValue={editingFood.foodName}
              className="input input-bordered w-full mb-3 text-gray-800 dark:text-gray-100"
              placeholder="Food Name"
              required
            />

            <input
              type="text"
              name="foodQuantity"
              defaultValue={editingFood.foodQuantity}
              className="input input-bordered w-full mb-3 text-gray-800 dark:text-gray-100"
              placeholder="Quantity"
              required
            />

            <input
              type="text"
              name="pickupLocation"
              defaultValue={editingFood.pickupLocation}
              className="input input-bordered w-full mb-3 text-gray-800 dark:text-gray-100"
              placeholder="Pickup Location"
              required
            />

            <input
              type="datetime-local"
              name="expiredDateTime"
              defaultValue={editingFood.expiredDateTime}
              className="input input-bordered w-full mb-3 text-gray-800 dark:text-gray-100"
              required
            />

            <textarea
              name="additionalNotes"
              defaultValue={editingFood.additionalNotes}
              className="textarea textarea-bordered w-full mb-3 text-gray-800 dark:text-gray-100"
              placeholder="Additional Notes"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingFood(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
