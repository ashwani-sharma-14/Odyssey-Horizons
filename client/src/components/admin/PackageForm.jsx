import { useState } from "react";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";

const PackageForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      price: "",
      duration: "",
      destination: "",
      location: "",
      image: "",
      highlights: "",
      included: "",
      status: "active",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop function with formData
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {initialData ? "Edit Package" : "Add New Package"}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Duration (days)"
            type="number"
            required
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: Number(e.target.value) })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination"
            required
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            required
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Highlights"
            multiline
            rows={3}
            value={formData.highlights}
            onChange={(e) =>
              setFormData({ ...formData, highlights: e.target.value })
            }
            placeholder="Enter highlights separated by new lines"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URL"
            type="url"
            required
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? "Update Package" : "Create Package"}
        </Button>
      </Box>
    </Box>
  );
};

export default PackageForm;
