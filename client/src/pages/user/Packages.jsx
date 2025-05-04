import { useState } from "react";
import PackageGrid from "../../components/packages/PackageGrid";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Slider,
  Typography,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [duration, setDuration] = useState("all");
  const [destination, setDestination] = useState("all");

  const destinations = [
    "all",
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Australia",
  ];

  const durations = [
    { value: "all", label: "All Durations" },
    { value: "short", label: "1-3 Days" },
    { value: "medium", label: "4-7 Days" },
    { value: "long", label: "8+ Days" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Explore Our Travel Packages
      </h1>

      {/* Filters Section */}
      <Paper className="mb-8 p-6" elevation={2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search Filter */}
          <TextField
            fullWidth
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Destination Filter */}
          <FormControl fullWidth>
            <InputLabel>Destination</InputLabel>
            <Select
              value={destination}
              label="Destination"
              onChange={(e) => setDestination(e.target.value)}
            >
              {destinations.map((dest) => (
                <MenuItem key={dest} value={dest}>
                  {dest === "all" ? "All Destinations" : dest}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Duration Filter */}
          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              value={duration}
              label="Duration"
              onChange={(e) => setDuration(e.target.value)}
            >
              {durations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Range Filter */}
          <Box>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
              step={100}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>&#8377;{priceRange[0]}</span>
              <span>&#8377;{priceRange[1]}</span>
            </div>
          </Box>
        </div>
      </Paper>

      {/* Packages Grid */}
      <PackageGrid
        filters={{
          searchTerm,
          priceRange,
          duration,
          destination,
        }}
      />
    </div>
  );
};

export default Packages;
