import { Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Sorry, an error occured.';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  if (error.status === 401) {
    title = 'You are not authenticated.';
    message = 'Please log in for authorization.';
  }

  return (
    <>
      <PageContent title={title}>
        <Typography variant="h6" fontWeight={400}>
          {message}
        </Typography>
      </PageContent>
    </>
  );
}

export default ErrorPage;
