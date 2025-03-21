import { Container, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignupForm';

const AuthPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {tab === 0 ? <LoginForm /> : <SignupForm />}
      </Paper>
    </Container>
  );
};

export default AuthPage;