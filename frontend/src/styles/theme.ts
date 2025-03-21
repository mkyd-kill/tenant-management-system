import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Professional blue
    secondary: { main: '#dc004e' }, // Vibrant accent
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8 },
      },
    },
  },
});

export default theme;