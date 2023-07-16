import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import mytheme from '../theme/rootTheme';
import NavbarAndSidebar from '../components/NavbarAndSidebar';
import Content from '../components/Content';
import { LikedUsersOverlay, CommentBox, ShareBox } from '../components/Overlay';
import { useGlobalContext } from '../store/context/globalContext';

export default function HomePage() {
  const { isLikedModalOpen, isCommentModalOpen, isShareModalOpen } =
    useGlobalContext();

  return (
    <div>
      <ThemeProvider theme={mytheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          {isLikedModalOpen && <LikedUsersOverlay></LikedUsersOverlay>}
          {isCommentModalOpen && <CommentBox></CommentBox>}
          {isShareModalOpen && <ShareBox></ShareBox>}

          <NavbarAndSidebar />

          <Content>
            <Outlet />
          </Content>
        </Box>
      </ThemeProvider>
    </div>
  );
}
