import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import FriendRequestCard from '../components/FriendRequestCard';
import { callApi } from '../store/callApi';
import { url } from '../config';

export default function FriendPage() {
  const [friendRequests, setFriendRequests] = useState([]);

  const confirmHandler = async (userId) => {
    await callApi(`${url}/friends/confirmFriend/${userId}`, 'POST');

    setFriendRequests((prevState) =>
      prevState.filter((request) => request.senderId._id !== userId)
    );
  };

  const cancelHandler = async (userId) => {
    await callApi(`${url}/friends/cancelRequest/${userId}`, 'POST');

    setFriendRequests((prevState) =>
      prevState.filter((request) => request.senderId._id !== userId)
    );
  };

  const currentUser = useLoaderData();

  const fetchFriendRequests = async () => {
    const response = await callApi(
      `${url}/friends/friendRequests/${currentUser._id}`
    );
    setFriendRequests(response.data);
  };
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <Typography variant="h6">Friend Requests</Typography>
        <Grid container spacing={3} marginTop={2}>
          {friendRequests.map((friendRequest) => (
            <FriendRequestCard
              key={friendRequest._id}
              id={friendRequest._id}
              friendRequest={friendRequest}
              confirmHandler={confirmHandler}
              cancelHandler={cancelHandler}
            ></FriendRequestCard>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
