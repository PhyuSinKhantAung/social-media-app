import * as React from 'react';
import { styled, useTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

import mytheme from '../theme/rootTheme';
import { Avatar } from '@mui/material';
import {
  Link,
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const menuItems = [
  {
    text: 'Home',
    icon: <HomeOutlinedIcon color="primary" />,
    path: '/',
  },
  {
    text: 'Inbox',
    icon: <MailOutlinedIcon color="primary" />,
    path: '/inbox',
  },
  {
    text: 'Create',
    icon: <AddCircleOutlineOutlinedIcon color="primary" />,
    path: '/create-post',
  },
  {
    text: 'Friends',
    icon: <PeopleAltOutlinedIcon color="primary" />,
    path: '/friend-requests',
  },
];

export default function NavbarAndSidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const { username, profile_pic, _id } = useLoaderData();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    navigate('/');
  };

  return (
    <ThemeProvider theme={mytheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="inherit">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex justify-between w-full">
              <Typography variant="h6" noWrap component="div">
                The Media
              </Typography>

              <Link to={`/profile/${_id}`}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    '& div,p:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  {profile_pic ? (
                    <Avatar
                      sx={{ marginRight: 2 }}
                      src={profile_pic.url}
                      alt="user-profile"
                    />
                  ) : (
                    <Avatar sx={{ marginRight: 2 }}>
                      {username[0].toUpperCase()}
                    </Avatar>
                  )}
                  <Typography>{username}</Typography>
                </Box>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
            <LanguageIcon className="ml-36"></LanguageIcon>
          </DrawerHeader>
          <Divider />

          <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: 'block',
                  ...(location.pathname === item.path && {
                    backgroundColor: '#3e363663',
                  }),
                }}
              >
                <NavLink to={item.path}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={logoutHandler}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LogoutIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={'Logout'}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
