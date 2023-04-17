import { createBrowserRouter } from 'react-router-dom';
import { loaderAuth } from './services/loaderAuth';
import Authentication from './pages/Authentication';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePost';
import EditPost from './pages/EditPost';
import MessagePage from './pages/MessagePage';
import FriendPage from './pages/FriendPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import Posts from './pages/Posts';
import Saved from './pages/Saved';
import ImageList from './pages/ImageList';

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },

  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: loaderAuth,

    children: [
      { index: true, element: <HomePage />, loader: loaderAuth },

      {
        path: '/create-post',
        element: <CreatePostPage />,
        loader: loaderAuth,
      },

      { path: '/:id/edit', element: <EditPost></EditPost>, loader: loaderAuth },

      { path: '/friend-requests', element: <FriendPage />, loader: loaderAuth },

      {
        path: 'profile/:id',
        element: <ProfilePage />,
        loader: loaderAuth,
        children: [
          {
            index: true,
            loader: loaderAuth,
            element: <Posts />,
          },

          {
            path: 'saved',
            loader: loaderAuth,
            element: <Saved />,
          },
          {
            path: 'images',
            loader: loaderAuth,
            element: <ImageList />,
          },
        ],
      },

      {
        path: 'profile/:id',
        loader: loaderAuth,
        children: [
          {
            path: 'edit',
            element: <EditProfile></EditProfile>,
            loader: loaderAuth,
          },
        ],
      },
    ],
  },

  { path: '/inbox', element: <MessagePage />, loader: loaderAuth },
]);

export default router;
