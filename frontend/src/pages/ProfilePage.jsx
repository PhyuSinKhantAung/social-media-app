/* eslint-disable no-unused-vars */
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Profile from '../components/Profile';
import ProfileTab from '../components/ProfileTab';
import { callApi } from '../store/callApi';
import { url } from '../config';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);

  const location = useLocation();

  const userId = location.pathname.slice(9, 33);

  const fetchUser = async () => {
    const responseUser = await callApi(`${url}/users/${userId}`);

    const responsePosts = await callApi(`${url}/posts/users/${userId}`);

    setUserPosts(responsePosts.data);

    setUser(responseUser.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const postsCount = userPosts?.length;

  return (
    <>
      {user && (
        <div>
          <Container maxWidth="md">
            <Profile user={user} postsCount={postsCount} setUser={setUser} />
            <ProfileTab />

            <Outlet />
          </Container>
        </div>
      )}
    </>
  );
}
