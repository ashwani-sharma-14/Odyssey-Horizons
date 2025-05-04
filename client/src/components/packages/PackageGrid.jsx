import { useState, useEffect } from "react";
import { CircularProgress, Alert } from "@mui/material";
import PackageCard from "./PackageCard";
import { packageApi } from "../../services/api";

const PackageGrid = ({ filters }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await packageApi.getAll();
      setPackages(response.data);
    } catch {
      setErrorMessage("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    // Search filter
    if (
      filters.searchTerm &&
      !pkg.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Price range filter
    if (
      pkg.price < filters.priceRange[0] ||
      pkg.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Duration filter
    if (filters.duration !== "all") {
      if (filters.duration === "short" && pkg.duration > 3) return false;
      if (
        filters.duration === "medium" &&
        (pkg.duration < 4 || pkg.duration > 7)
      )
        return false;
      if (filters.duration === "long" && pkg.duration < 8) return false;
    }

    // Destination filter
    if (
      filters.destination !== "all" &&
      pkg.destination !== filters.destination
    ) {
      return false;
    }

    return true;
  });

  if (loading) return <CircularProgress />;
  if (errorMessage) return <Alert severity="error">{errorMessage}</Alert>;

  return (
    <div>
      {filteredPackages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No packages found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageGrid;
