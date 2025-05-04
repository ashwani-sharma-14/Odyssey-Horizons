import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import BookingForm from "../../components/forms/BookingForm";
import { packageApi } from "../../services/api";

const PackageDetail = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [tourPackage, setTourPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await packageApi.getById(id);
        setTourPackage(response.data);
      } catch {
        setError("Failed to fetch package details");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={tourPackage.image}
            alt={tourPackage.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{tourPackage.title}</h1>
          <p className="text-gray-600 mb-4">{tourPackage.description}</p>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{tourPackage.duration} Days</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span>&#8377;{tourPackage.price}</span>
            </div>
            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <BookingForm
              packageId={id}
              onClose={() => setShowBookingForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
