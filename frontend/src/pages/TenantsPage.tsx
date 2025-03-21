import { Box, Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const TenantsPage = () => {
  const tenants = [
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', property: 'Downtown Flats' },
    // Add more sample data or fetch from API
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container sx={{ flexGrow: 1, p: 3 }}>
          <Button variant="contained" sx={{ mb: 2 }}>
            Add Tenant
          </Button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{`${tenant.first_name} ${tenant.last_name}`}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>{tenant.property}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                    <Button color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </Box>
    </>
  );
};

export default TenantsPage;