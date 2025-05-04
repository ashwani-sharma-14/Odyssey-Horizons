import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { queryApi } from "../../services/api";
import { format } from "date-fns";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await queryApi.getAll();
      setQueries(response.data);
    } catch {
      setError("Failed to fetch customer queries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (queryId, newStatus) => {
    try {
      await queryApi.updateStatus(queryId, newStatus);
      setQueries(
        queries.map((query) =>
          query._id === queryId ? { ...query, status: newStatus } : query
        )
      );
    } catch {
      setError("Failed to update query status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "contacted":
        return "info";
      case "resolved":
        return "success";
      default:
        return "default";
    }
  };

  if (loading) {
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

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customer Queries
      </Typography>

      {queries.length === 0 ? (
        <Alert severity="info">No customer queries found.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Preferred Date</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((query) => (
                <TableRow key={query._id}>
                  <TableCell>
                    {format(new Date(query.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{query.name}</TableCell>
                  <TableCell>{query.email}</TableCell>
                  <TableCell>{query.phone}</TableCell>
                  <TableCell>{query.packageId?.title || "N/A"}</TableCell>
                  <TableCell>
                    {format(new Date(query.preferredDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{query.message}</TableCell>
                  <TableCell>
                    <FormControl size="small">
                      <Select
                        value={query.status}
                        onChange={(e) =>
                          handleStatusChange(query._id, e.target.value)
                        }
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="pending">
                          <Chip
                            label="Pending"
                            size="small"
                            color={getStatusColor("pending")}
                          />
                        </MenuItem>
                        <MenuItem value="contacted">
                          <Chip
                            label="Contacted"
                            size="small"
                            color={getStatusColor("contacted")}
                          />
                        </MenuItem>
                        <MenuItem value="resolved">
                          <Chip
                            label="Resolved"
                            size="small"
                            color={getStatusColor("resolved")}
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Queries;
