/* eslint-disable react/prop-types */
import { createPortal } from 'react-dom';

import { useEffect, useState } from 'react';
import {
  Avatar,
  CardHeader,
  Typography,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '../store/context/globalContext';
import { Box } from '@mui/system';
import { callApi } from '../store/callApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from '../store/comment';
import CommentList from './CommentList';
import { url } from '../config';

function LikedUsersModal() {
  const { isLikedModalOpen, closeLikedModal, postId } = useGlobalContext();

  const [likedUsers, setLikedUsers] = useState([]);

  const fetchLikedUsers = async () => {
    const response = await callApi(`${url}/likes/${postId}`);

    setLikedUsers(response.data);
  };

  useEffect(() => {
    fetchLikedUsers();
  }, [isLikedModalOpen]);

  return (
    <>
      <div
        className={` ${
          isLikedModalOpen ? 'block' : 'hidden'
        } fixed  top-1/4 md:w-full md:left-0 w-4/5 left-[40px] flex justify-center z-[9999]`}
      >
        <div className="bg-gray-50 w-96 rounded-md shadow-lg">
          <header className=" cursor-pointer ">
            <Typography
              variant="subtitle1"
              fontWeight={700}
              className="text-center"
              marginY={2}
            >
              Likes
              <CloseIcon
                className=" float-right mr-4"
                onClick={closeLikedModal}
              ></CloseIcon>
            </Typography>
          </header>
          <Divider></Divider>
          <Box className="overflow-y-scroll max-h-72">
            {likedUsers.map((user) => (
              <CardHeader
                key={user._id}
                className=" cursor-pointer "
                title={user.username}
                avatar={
                  user.profile_pic ? (
                    <Avatar
                      src={user.profile_pic.url}
                      alt="user-profile"
                    ></Avatar>
                  ) : (
                    <Avatar>{user.username[0].toUpperCase()}</Avatar>
                  )
                }
              ></CardHeader>
            ))}
          </Box>
        </div>
      </div>
    </>
  );
}

const CommentModal = () => {
  const { isCommentModalOpen, closeCommentModal, postId } = useGlobalContext();

  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [isCommentModalOpen, isEdit]);

  const { comments } = useSelector((state) => state.comment);

  const editHandler = (id) => {
    const editComment = comments.find((comment) => comment._id === id);
    setIsEdit(true);
    setText(editComment.text);
    setEditId(id);
  };

  const deleteHandler = (postId, commentId) => {
    const isConfirm = confirm('Are you sure to delete this comment?');
    if (isConfirm) {
      dispatch(deleteComment({ postId, commentId }));
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateComment({ commentId: editId, comment: { text } }));
      setText('');
      setIsEdit(false);
      setEditId(null);
    } else {
      dispatch(createComment({ postId, comment: { text } }));
      setText('');
    }
  };

  const isInputEmpty = text.trim() === '';

  return (
    <>
      <div
        className={` ${
          isCommentModalOpen ? 'block' : 'hidden'
        } fixed top-[10%] md:w-full md:left-0 w-4/5 left-[40px] flex justify-center z-[9999]`}
      >
        <div className="bg-gray-50 w-96 rounded-md shadow-lg ">
          <header className=" cursor-pointer ">
            <Typography
              variant="subtitle1"
              fontWeight={700}
              className="text-center"
              marginY={2}
            >
              Comments
              <CloseIcon
                className=" float-right mr-4"
                onClick={closeCommentModal}
              ></CloseIcon>
            </Typography>
          </header>
          <Divider></Divider>

          {comments && (
            <CommentList
              comments={comments}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            ></CommentList>
          )}

          <form className="my-6 w-full p-2" onSubmit={handleSubmit}>
            <input
              onChange={(event) => setText(event.target.value)}
              type="text"
              value={text}
              placeholder="Write a comment...."
              className="bg-gray-100 py-2 px-4 rounded md:w-3/4 "
            />
            {isInputEmpty ? (
              <button
                type="submit"
                disabled
                className="bg-slate-400 py-2 px-1 text-white rounded-r"
              >
                Submit
              </button>
            ) : (
              <button
                type="submit"
                className="bg-slate-700 py-2 px-1 text-white rounded-r"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

const ShareModal = () => {
  const { isShareModalOpen, closeShareModal, postId } = useGlobalContext();

  const [text, setText] = useState('');

  const isInputEmpty = text.trim() === '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await callApi(`${url}/shares/${postId}`, 'POST', {
      caption: text,
    });

    if (response) {
      closeShareModal();
    }
  };

  return (
    <div
      className={` ${
        isShareModalOpen ? 'block' : 'hidden'
      } fixed top-[10%] md:w-full md:left-0 w-4/5 left-[40px] flex justify-center z-[9999]`}
    >
      <div className="bg-gray-50 w-96 rounded-md shadow-lg ">
        <header className=" cursor-pointer ">
          <Typography
            variant="subtitle1"
            fontWeight={700}
            className="text-center"
            marginY={2}
          >
            Share
            <CloseIcon
              className=" float-right mr-4"
              onClick={closeShareModal}
            ></CloseIcon>
          </Typography>
        </header>
        <Divider></Divider>

        <form className="my-6 w-full p-2" onSubmit={handleSubmit}>
          <TextField
            onChange={(event) => setText(event.target.value)}
            type="text"
            variant="standard"
            defaultValue={text}
            placeholder="Write something about...."
            className="bg-gray-100 py-2 px-4 rounded md:w-3/4 "
          />

          {isInputEmpty ? (
            <Button
              disableElevation={true}
              type="submit"
              disabled={true}
              variant="contained"
              sx={{ marginLeft: 1 }}
            >
              Submit
            </Button>
          ) : (
            <Button
              disableElevation={true}
              type="submit"
              variant="contained"
              sx={{ marginLeft: 1 }}
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

const Backdrop = () => {
  const {
    closeLikedModal,
    isLikedModalOpen,
    isCommentModalOpen,
    isShareModalOpen,
    closeCommentModal,
  } = useGlobalContext();
  return (
    <div
      onClick={isLikedModalOpen ? closeLikedModal : closeCommentModal}
      className={`${
        isLikedModalOpen || isCommentModalOpen || isShareModalOpen
          ? 'block'
          : 'hidden'
      } fixed top-0 left-0 w-full h-screen z-[9998] bg-black opacity-50`}
    ></div>
  );
};

const portalElement = document.getElementById('overlays');

const LikedUsersOverlay = () => {
  return (
    <>
      {createPortal(<LikedUsersModal></LikedUsersModal>, portalElement)}
      {createPortal(<Backdrop></Backdrop>, portalElement)}
    </>
  );
};

const CommentBox = () => {
  return (
    <>
      {createPortal(<CommentModal></CommentModal>, portalElement)}
      {createPortal(<Backdrop></Backdrop>, portalElement)}
    </>
  );
};

const ShareBox = () => {
  return (
    <>
      {createPortal(<ShareModal></ShareModal>, portalElement)}
      {createPortal(<Backdrop></Backdrop>, portalElement)}
    </>
  );
};

export { LikedUsersOverlay, CommentBox, ShareBox };
