import { Box, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import DashboardCard from '../components/dashboard/DashboardCard';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { getProperties, getTenants } from '../api/api';

const DashboardPage = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (accessToken) {
      getProperties(accessToken).then((res) => console.log('Properties:', res.data));
      getTenants(accessToken).then((res) => console.log('Tenants:', res.data));
    }
  }, [accessToken]);

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard title="Total Properties" value={5} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard title="Total Tenants" value={12} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DashboardCard title="Facilities" value="Pool, Gym" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DashboardPage;