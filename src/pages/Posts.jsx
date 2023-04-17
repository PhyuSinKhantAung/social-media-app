import { useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { callApi } from '../store/callApi';
import { url } from '../config';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const data = useLoaderData();

  const location = useLocation();

  const userId = location.pathname.slice(9, 33);

  const fetchPosts = async () => {
    const response = await callApi(`${url}/posts/users/${userId}`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          id={post._id}
          userPost={post}
          currentUser={data}
        ></PostCard>
      ))}
    </>
  );
}
