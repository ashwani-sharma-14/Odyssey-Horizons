import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { packageApi, queryApi } from "../../services/api";
import {
  PeopleAlt as PeopleIcon,
  LocalOffer as PackageIcon,
  QueryBuilder as QueryIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    activeQueries: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentQueries, setRecentQueries] = useState([]);
  const [popularPackages, setPopularPackages] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [packagesRes, queriesRes] = await Promise.all([
        packageApi.getAll(),
        queryApi.getAll(),
      ]);

      // Calculate stats
      const activeQueries = queriesRes.data.filter(
        (q) => q.status === "pending"
      ).length;

      setStats({
        totalPackages: packagesRes.data.length,
        activeQueries,
        totalBookings: queriesRes.data.length,
      });

      // Get recent queries
      setRecentQueries(
        queriesRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
      );

      // Get popular packages (based on number of queries)
      const packageQueries = {};
      queriesRes.data.forEach((query) => {
        packageQueries[query.packageId] =
          (packageQueries[query.packageId] || 0) + 1;
      });

      const popular = packagesRes.data
        .sort(
          (a, b) => (packageQueries[b._id] || 0) - (packageQueries[a._id] || 0)
        )
        .slice(0, 5);

      setPopularPackages(popular);
    } catch {
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
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
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <PackageIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Total Packages
              </Typography>
              <Typography variant="h4">{stats.totalPackages}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <QueryIcon sx={{ fontSize: 40, color: "warning.main" }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Active Queries
              </Typography>
              <Typography variant="h4">{stats.activeQueries}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "success.main" }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Total Bookings
              </Typography>
              <Typography variant="h4">{stats.totalBookings}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Queries and Popular Packages */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Queries
            </Typography>
            {recentQueries.map((query) => (
              <Box
                key={query._id}
                sx={{ mb: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}
              >
                <Typography variant="subtitle2" color="primary">
                  {query.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {query.email} •{" "}
                  {new Date(query.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" noWrap>
                  {query.message}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Popular Packages
            </Typography>
            {popularPackages.map((pkg) => (
              <Box
                key={pkg._id}
                sx={{ mb: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}
              >
                <Typography variant="subtitle2" color="primary">
                  {pkg.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  &#8377;{pkg.price} • {pkg.duration} days
                </Typography>
                <Typography variant="body2" noWrap>
                  {pkg.destination}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
