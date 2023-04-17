import { Avatar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { callApi } from '../store/callApi';
import { url } from '../config';

export default function Saved() {
  const [savedPosts, setSavedPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await callApi(`${url}/saves`);

    setSavedPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md">
      {savedPosts.map((savePost) => (
        <Box
          key={savePost._id}
          sx={{
            padding: 1,
            marginY: 1,
            display: 'flex',
            borderBottom: '0.5px solid #726f6f',
          }}
        >
          <Box>
            {savePost.post?.post_creator.profile_pic ? (
              <Avatar
                alt="user-profile"
                src={savePost.post?.post_creator.profile_pic.url}
                sx={{ width: 100, height: 100 }}
                variant="rounded"
              />
            ) : (
              <Avatar variant="rounded" sx={{ width: 100, height: 100 }}>
                {savePost.post?.post_creator.username[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Box sx={{ marginLeft: 3 }}>
            <Typography variant="body2">{savePost.post?.content}</Typography>
            <small className=" text-blue-600 underline cursor-pointer">
              View Post
            </small>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
