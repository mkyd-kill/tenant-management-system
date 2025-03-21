import { Box, Container, TextField, Button } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useState } from 'react';

const SettingsPage = () => {
  const [username, setUsername] = useState('landlord1');
  const [email, setEmail] = useState('landlord@example.com');

  const handleSave = () => {
    // Call API to update user details
    console.log('Updated:', { username, email });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Container sx={{ flexGrow: 1, p: 3 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default SettingsPage;