import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Posts" onClick={() => navigate('.')} />
        <Tab label="Saved" onClick={() => navigate('saved')} />
        <Tab label="Images" onClick={() => navigate('images')} />
      </Tabs>
    </Box>
  );
};

export default ProfileTab;
