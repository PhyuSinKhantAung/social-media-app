import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../store/post';

export default function HomePage() {
  const currentUserData = useLoaderData();

  const dispatch = useDispatch();

  const { status, posts, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Typography variant="h4" className="text-center my-20">
        Loading ......
      </Typography>
    );
  }
  if (status === 'failed') {
    return (
      <Typography variant="h5" className="text-center my-20">
        {error}
      </Typography>
    );
  }
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          userPost={post}
          currentUser={currentUserData}
        ></PostCard>
      ))}
    </div>
  );
}
