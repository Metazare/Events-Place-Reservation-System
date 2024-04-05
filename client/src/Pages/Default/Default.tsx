import React from 'react';
import { Container, Typography, Button, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';

const sectionStyle = {
  padding: '2rem',
  marginBottom: '2rem',
};

const featuredSectionStyle = {
  ...sectionStyle,
  backgroundColor: '#1976D2',
  color: 'white',
};

const buttonStyle = {
  marginTop: '1rem',
};

const paperStyle = {
  padding: '1rem',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const Default: React.FC = () => {
  return (
    <div>
      {/* Featured Content Section */}
      <section style={featuredSectionStyle}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to Our Website
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Explore our amazing services and offerings. We are here to serve you with top-notch products and services.
          </Typography>
          <Button variant="contained" color="secondary" style={buttonStyle}>
            Learn More
          </Button>
        </Container>
      </section>
      {/* About Section */}
      <section style={sectionStyle}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            About Us
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                We are a dedicated team of professionals committed to delivering high-quality solutions to our clients.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      {/* Services Section */}
      <section style={sectionStyle}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={paperStyle}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Web Design"
                    height="140"
                    image="https://via.placeholder.com/300x200?text=Web+Design"
                  />
                  <CardContent>
                    <Typography variant="h6">Web Design</Typography>
                    <Typography variant="body1" paragraph>
                      We create stunning and responsive websites tailored to your needs.
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={paperStyle}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Mobile App Development"
                    height="140"
                    image="https://via.placeholder.com/300x200?text=Mobile+App"
                  />
                  <CardContent>
                    <Typography variant="h6">Mobile App Development</Typography>
                    <Typography variant="body1" paragraph>
                      Build mobile applications for iOS and Android platforms with a focus on user experience.
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={paperStyle}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Digital Marketing"
                    height="140"
                    image="https://via.placeholder.com/300x200?text=Digital+Marketing"
                  />
                  <CardContent>
                    <Typography variant="h6">Digital Marketing</Typography>
                    <Typography variant="body1" paragraph>
                      Promote your brand through effective digital marketing strategies.
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>
      {/* Contact Us Section */}
      <section style={sectionStyle}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                If you have any questions or inquiries, please feel free to contact us.
              </Typography>
              <Typography variant="body1">
                Email: example@email.com
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default Default;
