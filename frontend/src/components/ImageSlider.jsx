/* eslint-disable react/prop-types */
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);
  const { url } = images[index];
  const checkIndexIsValid = (number) => {
    if (number > images.length - 1) return 0;
    if (number < 0) return images.length - 1;
    return number;
  };
  const rightArrowHandler = () => {
    setIndex((prevIndex) => {
      const updatedIndex = prevIndex + 1;
      return checkIndexIsValid(updatedIndex);
    });
  };
  const leftArrowHandler = () => {
    setIndex((prevIndex) => {
      const updatedIndex = prevIndex - 1;
      return checkIndexIsValid(updatedIndex);
    });
  };
  return (
    <div className="relative h-80">
      <img
        className="w-full h-full object-cover"
        alt="Paella dish"
        src={url}
      ></img>

      {images.length > 1 && (
        <Box>
          <IconButton
            className="top-1/2"
            sx={{ position: 'absolute', color: 'gray' }}
            onClick={leftArrowHandler}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            className="top-1/2 right-0"
            sx={{ position: 'absolute', color: 'gray' }}
            onClick={rightArrowHandler}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </div>
  );
}

export default ImageSlider;
