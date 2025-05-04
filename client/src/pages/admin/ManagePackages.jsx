import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { packageApi } from "../../services/api";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import PackageForm from "../../components/admin/PackageForm";

const ManagePackages = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await packageApi.getAll();
      setPackages(response.data);
    } catch {
      setNotification({
        open: true,
        message: "Failed to fetch packages",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await packageApi.delete(id);
      console.log(response.data);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      setNotification({
        open: true,
        message: "Package deleted successfully",
        type: "success",
      });
    } catch {
      setNotification({
        open: true,
        message: "Failed to delete package",
        type: "error",
      });
    }
    setDeleteConfirm({ open: false, id: null });
  };

  const handleAddPackage = async (packageData) => {
    try {
      const response = await packageApi.create(packageData);
      setPackages((prev) => [...prev, response.data]);
      setShowAddForm(false);
      setNotification({
        open: true,
        message: "Package added successfully",
        type: "success",
      });
    } catch {
      setNotification({
        open: true,
        message: "Failed to add package",
        type: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Manage Packages</Typography>
        <Button
          variant="contained"
          onClick={() => setShowAddForm(true)}
          sx={{ px: 4 }}
        >
          Add New Package
        </Button>
      </Box>

      {packages.length === 0 ? (
        <Alert severity="info">
          No packages found. Add your first package!
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg._id}>
                  <TableCell>
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      style={{
                        width: "60px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{pkg.title}</TableCell>
                  <TableCell>{pkg.location}</TableCell>
                  <TableCell>&#8377;{pkg.price}</TableCell>
                  <TableCell>{pkg.duration} days</TableCell>
                  <TableCell>
                    <Chip
                      label={pkg.status}
                      color={pkg.status === "active" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/admin/packages/&#8377;{pkg._id}/edit`}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setDeleteConfirm({ open: true, id: pkg._id })
                      }
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this package? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteConfirm.id)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Package Dialog */}
      <Dialog
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <PackageForm
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddPackage}
          />
        </DialogContent>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManagePackages;
