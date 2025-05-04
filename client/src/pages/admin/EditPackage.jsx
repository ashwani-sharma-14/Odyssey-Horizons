import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Alert } from "@mui/material";
import PackageForm from "../../components/admin/PackageForm";
import { packageApi } from "../../services/api";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tourPackage, setTourPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleUpdate = async (data) => {
    try {
      await packageApi.update(id, data);
      navigate("/admin/packages");
    } catch  {
      setError("Failed to update package");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <PackageForm
        initialData={tourPackage}
        onSubmit={handleUpdate}
        onClose={() => navigate("/admin/packages")}
      />
    </Box>
  );
};

export default EditPackage;
