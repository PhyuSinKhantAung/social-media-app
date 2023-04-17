import { Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
function PageContent({ title, children }) {
  return (
    <div className="text-center my-32">
      <Typography variant="h3">{title}</Typography>
      {children}
    </div>
  );
}

export default PageContent;
