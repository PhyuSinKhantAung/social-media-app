/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';

const Content = ({ children }) => {
  const theme = useTheme();
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
        }}
      />
      {children}
    </Box>
  );
};

export default Content;
