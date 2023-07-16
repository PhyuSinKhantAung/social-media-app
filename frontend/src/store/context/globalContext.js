/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLikedModalOpen, setIsLikedModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [postId, setPostId] = useState('');

  const openLikedModal = (postId) => {
    setIsLikedModalOpen(true);
    setPostId(postId);
  };

  const closeLikedModal = () => {
    setIsLikedModalOpen(false);
  };

  const openCommentModal = (postId) => {
    setIsCommentModalOpen(true);
    setPostId(postId);
  };
  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const openShareModal = (postId) => {
    setIsShareModalOpen(true);
    setPostId(postId);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isLikedModalOpen,
        openLikedModal,
        closeLikedModal,
        isCommentModalOpen,
        openCommentModal,
        closeCommentModal,
        postId,
        isShareModalOpen,
        openShareModal,
        closeShareModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
