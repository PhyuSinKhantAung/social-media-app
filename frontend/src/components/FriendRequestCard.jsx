/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function FriendRequestCard({
  friendRequest,
  confirmHandler,
  cancelHandler,
}) {
  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        {friendRequest.senderId.profile_pic ? (
          <CardMedia
            component="img"
            alt="user-profile"
            sx={{ height: 200 }}
            image={friendRequest.senderId.profile_pic.url}
          />
        ) : (
          <CardMedia
            component="img"
            alt="user-profile"
            sx={{ height: 200 }}
            image="https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg"
          />
        )}

        <NavLink to={`/profile/${friendRequest.senderId._id}`}>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
              {friendRequest.senderId.username}
            </Typography>
          </CardContent>
        </NavLink>

        <CardActions>
          <Button
            onClick={() => {
              confirmHandler(friendRequest.senderId._id);
            }}
            size="small"
            variant="contained"
            color="secondary"
          >
            Confirm
          </Button>
          <Button
            onClick={() => cancelHandler(friendRequest.senderId._id)}
            size="small"
            variant="contained"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
