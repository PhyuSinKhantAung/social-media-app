import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#666666',
      dark: '#191919',
    },
    secondary: {
      main: '#2f89fc',
      light: '#6dacfd',
      dark: '#266eca',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;
