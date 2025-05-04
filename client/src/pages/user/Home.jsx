import { Box, Button, Container, Typography, Grid } from "@mui/material";
import Hero from "../../components/common/Hero";
import PackageGrid from "../../components/packages/PackageGrid";
import { Link } from "react-router-dom";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Home = () => {
  const features = [
    {
      icon: <FlightTakeoffIcon sx={{ fontSize: 40 }} />,
      title: "Best Destinations",
      description: "Hand-picked destinations for your perfect vacation",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: "24/7 Support",
      description: "Always here to help you with your travel needs",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: "Guided Tours",
      description: "Expert local guides to enhance your experience",
    },
    {
      icon: <CreditCardIcon sx={{ fontSize: 40 }} />,
      title: "Best Deals",
      description: "Competitive prices and regular special offers",
    },
  ];

  return (
    <div>
      <Hero />

      {/* Why Choose Us Section */}
      <Box sx={{ py: 8, bgcolor: "background.default" }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Packages Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h3" component="h2">
              Popular Destinations
            </Typography>
            <Button
              component={Link}
              to="/packages"
              variant="contained"
              size="large"
            >
              View All Packages
            </Button>
          </Box>
          <PackageGrid
            filters={{
              searchTerm: "",
              priceRange: [0, 50000],
              duration: "all",
              destination: "all",
            }}
          />
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join thousands of satisfied travelers who have experienced our
            services
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ borderWidth: 2 }}
          >
            Contact Us Today
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
