import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const StatCard = ({ title, value }) => (
  <Card
    sx={{
      flex: 1,
      minWidth: 200,
      bgcolor: '#2C3E50',
      color: 'white',
      borderRadius: 2,
      p: 2,
    }}
  >
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

const Achivement = () => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Welcome Card */}
     
<Card sx={{ bgcolor: '#333945', color: 'white', mb: 4, p: 2 }}>

        <CardContent>
          <Typography variant="h6" sx={{ letterSpacing: '.25px' }}>
            Welcome to E-Kart Admin
          </Typography>
        </CardContent>
      </Card>

      {/* Stat Boxes with spacing */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <StatCard title="Orders" value="1,200" />
        <StatCard title="Products" value="320" />
        <StatCard title="Customers" value="980" />
      </Box>
    </Box>
  );
};

export default Achivement;
