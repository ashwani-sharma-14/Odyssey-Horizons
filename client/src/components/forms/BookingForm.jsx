import { useState } from "react";
import { queryApi } from "../../services/api";

const BookingForm = ({ packageId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await queryApi.create({
        ...formData,
        packageId,
        preferredDate: new Date(formData.date),
      });
      onClose();
      // You might want to show a success message here
    } catch (error) {
      // Handle error (show error message)
      console.error("Failed to submit booking:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Book Package</h2>

      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          required
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Phone</label>
        <input
          type="tel"
          required
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Preferred Date</label>
        <input
          type="date"
          required
          className="w-full p-2 border rounded"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <label className="block mb-1">Message</label>
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
