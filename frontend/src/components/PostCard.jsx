/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIconSolid from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  deletePost,
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from '../store/post';
import { useGlobalContext } from '../store/context/globalContext';
import ImageSlider from './ImageSlider';
import dateTransform from '../utils/dateTransform';

function PostCard({ userPost, currentUser }) {
  const ITEM_HEIGHT = 48;
  const { openLikedModal, openCommentModal, openShareModal } =
    useGlobalContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const [isLiked, setIsLiked] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const postEditHandler = (postId) => {
    navigate(`/${postId}/edit`);
    setAnchorEl(null);
  };

  const postDeleteHandler = (postId) => {
    const isSureToDelete = confirm('Are you sure to delete this post?');
    if (isSureToDelete) {
      dispatch(deletePost(postId));
    }
    setAnchorEl(null);
  };

  const likeHandler = async (postId) => {
    if (!isLiked) {
      dispatch(likePost(postId));
      setIsLiked(!isLiked);
    } else {
      dispatch(unlikePost(postId));
      setIsLiked(!isLiked);
    }
  };

  const saveHandler = async (postId) => {
    if (!isSaved) {
      dispatch(savePost(postId));
      setIsSaved(!isSaved);
    } else {
      dispatch(unsavePost(postId));
      setIsSaved(!isSaved);
    }
  };

  useEffect(() => {
    setIsLiked(
      userPost.sharedBy
        ? userPost.post?.likes.includes(currentUser._id)
        : userPost.likes.includes(currentUser._id)
    );
    setIsSaved(
      userPost.sharedBy
        ? userPost.post?.saves.includes(currentUser._id)
        : userPost.saves.includes(currentUser._id)
    );
  }, [currentUser._id, userPost.likes, userPost.saves]);
  return (
    <div>
      {userPost.post_creator && (
        <Card elevation={0} className="border md:w-1/2 mx-auto mt-10">
          <CardHeader
            title={
              <Typography
                onClick={() =>
                  navigate(`/profile/${userPost.post_creator._id}`)
                }
              >
                {userPost.post_creator.username}
              </Typography>
            }
            className="cursor-pointer"
            subheader={dateTransform(userPost.createdAt)}
            action={
              currentUser._id === userPost.post_creator._id && (
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
            avatar={
              userPost.post_creator.profile_pic ? (
                <Avatar
                  src={userPost.post_creator.profile_pic.url}
                  alt="user-profile"
                />
              ) : (
                <Avatar style={{ backgroundColor: '' }}>
                  {userPost.post_creator.username[0].toUpperCase()}
                </Avatar>
              )
            }
          ></CardHeader>

          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={() => postEditHandler(userPost._id)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => postDeleteHandler(userPost._id)}>
              Delete
            </MenuItem>
          </Menu>

          {userPost.images.length !== 0 && (
            <ImageSlider images={userPost.images}></ImageSlider>
          )}

          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {userPost.content}
            </Typography>
          </CardContent>

          <CardActions disableSpacing className="flex justify-between">
            <div>
              <IconButton
                aria-label="like"
                onClick={() => likeHandler(userPost._id)}
              >
                {isLiked ? <FavoriteIconSolid /> : <FavoriteIcon />}
              </IconButton>
              <IconButton
                aria-label="comment"
                onClick={() => openCommentModal(userPost._id)}
              >
                <ModeCommentOutlinedIcon />
              </IconButton>
              <IconButton
                aria-label="share"
                onClick={() => {
                  openShareModal(userPost._id);
                }}
              >
                <ShareIcon />
              </IconButton>
            </div>

            <IconButton
              aria-label="save"
              onClick={() => saveHandler(userPost._id)}
            >
              {isSaved ? <BookmarkIcon /> : <BookmarkBorderOutlined />}
            </IconButton>
          </CardActions>

          <CardContent className="flex cursor-pointer">
            <Typography
              variant="subtitle2"
              sx={{ marginRight: 1 }}
              fontWeight={700}
              onClick={() => openLikedModal(userPost._id)}
            >
              {userPost.like_count} likes
            </Typography>

            <Typography
              variant="subtitle2"
              fontWeight={700}
              onClick={() => openCommentModal(userPost._id)}
            >
              {userPost.comment_count} comments
            </Typography>
          </CardContent>
        </Card>
      )}

      {userPost.sharedBy && (
        <Box className="md:w-1/2 m-auto p-4 my-10 shadow-md rounded">
          <CardHeader
            title={
              <Typography
                onClick={() => navigate(`/profile/${userPost.sharedBy._id}`)}
              >
                {userPost.sharedBy.username}
              </Typography>
            }
            className="cursor-pointer"
            subheader={dateTransform(userPost.createdAt)}
            action={
              currentUser._id === userPost.sharedBy._id && (
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
            avatar={
              userPost.sharedBy.profile_pic ? (
                <Avatar
                  src={userPost.sharedBy.profile_pic.url}
                  alt="user-profile"
                />
              ) : (
                <Avatar>{userPost.sharedBy.username[0].toUpperCase()}</Avatar>
              )
            }
          ></CardHeader>

          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>

          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {userPost.caption}
            </Typography>
          </CardContent>

          {userPost.post ? (
            <Card elevation={0} className="border md:w-full mx-auto">
              <Link to={`/profile/${userPost.post.post_creator._id}`}>
                <CardHeader
                  title={userPost.post.post_creator.username}
                  subheader={dateTransform(userPost.post.createdAt)}
                  avatar={
                    userPost.post.post_creator.profile_pic ? (
                      <Avatar
                        src={userPost.post.post_creator.profile_pic.url}
                        alt="user-profile"
                      />
                    ) : (
                      <Avatar>
                        {userPost.post.post_creator.username[0].toUpperCase()}
                      </Avatar>
                    )
                  }
                ></CardHeader>
              </Link>

              {userPost.post.images.length !== 0 && (
                <ImageSlider images={userPost.post.images}></ImageSlider>
              )}

              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {userPost.post.content}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="body1">
                  This content is not available right now.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </div>
  );
}

export default PostCard;
