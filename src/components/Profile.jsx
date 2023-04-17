/* eslint-disable react/prop-types */
import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import BlockIcon from '@mui/icons-material/Block';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { callApi } from '../store/callApi';
import { url } from '../config';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Profile = ({ user, postsCount, setUser }) => {
  const currentUser = useLoaderData();

  const [anchorEl, setAnchorEl] = useState(null);

  const [mutualFriendsCount, setMutualFriendsCount] = useState(0);

  const [userFriendRequests, setUserFriendRequests] = useState([]);

  const [currentUserFriendRequests, setCurrentUserFriendRequests] = useState(
    []
  );

  const fetchFriendRequests = async () => {
    const responseUserFriendRequests = await callApi(
      `${url}/friends/friendRequests/${user._id}`
    );

    setUserFriendRequests(responseUserFriendRequests.data);

    const responseCurrentUserFriendRequests = await callApi(
      `${url}/friends/friendRequests/${currentUser._id}`
    );

    setCurrentUserFriendRequests(responseCurrentUserFriendRequests.data);
  };

  const isRequestedToCurrentUser = currentUserFriendRequests.find(
    (currentUserFriendRequest) =>
      currentUserFriendRequest.senderId._id === user._id
  );

  const isRequestedToUser = userFriendRequests.find(
    (userFriendRequest) => userFriendRequest.senderId._id === currentUser._id
  );

  const isFriend = user.friends.find(
    (friendId) => friendId === currentUser._id
  );

  const isOwnProfile = user._id === currentUser._id;

  const fetchMutualFriends = async () => {
    const response = await callApi(`${url}/users/${user._id}/mutualFriends`);
    setMutualFriendsCount(response.count);
  };

  if (!isOwnProfile) {
    useEffect(() => {
      fetchFriendRequests();
      fetchMutualFriends();
    }, []);
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const confirmHandler = async () => {
    await callApi(`${url}/friends/confirmFriend/${user._id}`, 'POST');
    setCurrentUserFriendRequests((prevState) =>
      prevState.filter((request) => request.senderId._id !== user._id)
    );
    setAnchorEl(null);
    user.friends.push(currentUser._id);
    setUser(user);
  };

  const cancelHandler = async () => {
    await callApi(`${url}/friends/cancelRequest/${user._id}`, 'POST');

    if (isRequestedToCurrentUser) {
      setCurrentUserFriendRequests((prevState) =>
        prevState.filter((request) => request.senderId._id !== user._id)
      );
    } else {
      setUserFriendRequests((prevState) =>
        prevState.filter((request) => request.senderId._id !== currentUser._id)
      );
    }

    setAnchorEl(null);
  };

  const addFriendHandler = async () => {
    await callApi(`${url}/friends/addFriend/${user._id}`, 'POST');
    const updatedFriendRequests = await callApi(
      `${url}/friends/friendRequests/${user._id}`
    );

    setUserFriendRequests(updatedFriendRequests.data);
  };

  const unfriendHandler = async () => {
    await callApi(`${url}/friends/unfriend/${user._id}`, 'POST');
    user.friends.push(currentUser._id);
    const updatedFriends = user.friends.filter(
      (friendId) => friendId !== currentUser._id
    );
    user.friends = updatedFriends;
    setUser(user);
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex justify-start items-center my-4">
        <Box className="mr-32">
          {user.profile_pic ? (
            <Avatar
              alt="user profile"
              src={user.profile_pic.url}
              sx={{ width: 200, height: 200 }}
            />
          ) : (
            <Avatar>{user.username[0].toUpperCase()}</Avatar>
          )}
        </Box>
        <Box className=" w-3/4">
          <div className="flex items-center">
            <Typography variant="h6">{user.username}</Typography>

            {isFriend && (
              <Box>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ marginX: 3 }}
                  color="inherit"
                >
                  Friend
                </Button>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={unfriendHandler} disableRipple>
                    <PersonRemoveIcon />
                    Unfriend
                  </MenuItem>
                  <MenuItem disableRipple>
                    <BlockIcon />
                    Block
                  </MenuItem>
                </StyledMenu>
                <Button variant="contained" color="inherit" disableElevation>
                  message
                </Button>
              </Box>
            )}

            {!!isRequestedToCurrentUser && (
              <Box>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ marginX: 3 }}
                  color="inherit"
                >
                  Requested
                </Button>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={confirmHandler} disableRipple>
                    <PersonAddAltOutlinedIcon />
                    Confirm
                  </MenuItem>
                  <MenuItem onClick={cancelHandler} disableRipple>
                    <CancelOutlinedIcon />
                    Cancel
                  </MenuItem>
                  <MenuItem disableRipple>
                    <BlockIcon />
                    Block
                  </MenuItem>
                </StyledMenu>
                <Button variant="contained" color="inherit" disableElevation>
                  message
                </Button>
              </Box>
            )}

            {!!isRequestedToUser && (
              <Box>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ marginX: 3 }}
                  color="inherit"
                >
                  You Requested
                </Button>

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={cancelHandler} disableRipple>
                    <CancelOutlinedIcon />
                    Cancel
                  </MenuItem>
                  <MenuItem disableRipple>
                    <BlockIcon />
                    Block
                  </MenuItem>
                </StyledMenu>
                <Button variant="contained" color="inherit" disableElevation>
                  message
                </Button>
              </Box>
            )}

            {isOwnProfile && (
              <Link to={`/profile/${currentUser._id}/edit`}>
                <Button
                  sx={{ marginX: 2 }}
                  variant="contained"
                  color="inherit"
                  disableElevation
                >
                  Edit profile
                </Button>
              </Link>
            )}

            {!isFriend &&
              !isRequestedToCurrentUser &&
              !isRequestedToUser &&
              !isOwnProfile && (
                <Button
                  sx={{ marginX: 2 }}
                  variant="contained"
                  color="inherit"
                  disableElevation
                  onClick={addFriendHandler}
                >
                  Add Friend
                </Button>
              )}
          </div>

          <div className="flex justify-between w-3/4 my-4">
            <Typography variant="subtitle1">
              <strong>{postsCount}</strong> Posts
            </Typography>
            <Typography variant="subtitle1">
              <strong>{user.friends.length}</strong> Friends
            </Typography>

            {isOwnProfile ? (
              <Typography variant="subtitle1">
                <strong>{user.blocked_users.length}</strong> Blocked Users
              </Typography>
            ) : (
              <Typography variant="subtitle1">
                <strong>{mutualFriendsCount}</strong> Mutual Friends
              </Typography>
            )}
          </div>
          <small>{user.bio}</small>
        </Box>
      </div>
      <Divider></Divider>
    </div>
  );
};

export default Profile;
