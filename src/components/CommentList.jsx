/* eslint-disable react/prop-types */
import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLoaderData } from 'react-router-dom';

export default function CommentList({ comments, editHandler, deleteHandler }) {
  const userData = useLoaderData();
  return (
    <Box className="my-4 overflow-y-scroll max-h-72">
      {comments &&
        comments.map((comment) => (
          <Container
            sx={{
              display: 'flex',
              paddingY: '1em',
              justifyContent: 'space-between',
            }}
            key={comment._id}
          >
            <Box className="flex">
              {comment.commented_by.profile_pic ? (
                <Avatar
                  src={comment.commented_by.profile_pic.url}
                  alt="user-profile"
                ></Avatar>
              ) : (
                <Avatar>
                  {comment.commented_by.username[0].toUpperCase()}
                </Avatar>
              )}
              <Box marginX={2}>
                <Box className="">
                  <Typography variant="subtitle2">
                    {comment.commented_by.username}
                  </Typography>
                  {userData._id === comment.commented_by._id && (
                    <Box>
                      <Link
                        component="button"
                        variant="body2"
                        fontSize={'0.7rem'}
                        sx={{
                          paddingRight: '4px',
                        }}
                        onClick={() => {
                          editHandler(comment._id);
                        }}
                      >
                        Edit
                      </Link>
                      <Link
                        component="button"
                        variant="body2"
                        fontSize={'0.7rem'}
                        onClick={() => {
                          deleteHandler(comment.commented_postId, comment._id);
                        }}
                      >
                        Delete
                      </Link>
                    </Box>
                  )}
                </Box>

                <Typography variant="body2">{comment.text}</Typography>
              </Box>
            </Box>
            <Box className="cursor-pointer">
              <FavoriteBorderIcon></FavoriteBorderIcon>
            </Box>
          </Container>
        ))}
    </Box>
  );
}
