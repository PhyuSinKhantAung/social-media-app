import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, TextField, Typography } from '@mui/material';
import { getAuthToken } from '../services/loaderAuth';
import { url } from '../config';

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [multipleImages, setMultipleImages] = useState([]);

  const navigate = useNavigate();

  const currentUser = useLoaderData();

  const changeMultipleFiles = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setMultipleImages((prevImages) => prevImages.concat(imageArray));
    }
  };

  const render = (data) => {
    return data.map((image) => {
      return <img className="my-10" src={image} alt="" key={image} />;
    });
  };

  const token = getAuthToken();
  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append('content', values.content);

    for (let i = 0; i < values.file.length; i++) {
      formData.append('images', values.file[i]);
    }

    setIsLoading(true);

    await fetch(`${url}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setIsLoading(false);

    navigate(`/profile/${currentUser._id}`);

    setMultipleImages([]);
  };

  return (
    <main className="py-10 ">
      <Container maxWidth="sm" className="bg-gray-50 md:p-10 p-4 shadow-md">
        <Typography
          variant="h4"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          {"What's on your mind ?......"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ marginTop: 20, marginBottom: 20, display: 'block' }}
            color="primary"
            variant="standard"
            label="Content"
            fullWidth
            {...register('content', { required: true })}
            helperText={errors.content?.message}
          />

          <label htmlFor="contained-button-file">
            {/* input tag for multiple images */}
            <input
              type="file"
              name="file1"
              multiple
              {...register('file', { required: true })}
              onChange={changeMultipleFiles}
            />
            {/* error handling with React Hook Form */}
            {errors.file && <p className="error">Please select an image</p>}

            {/* The render function with the multiple image state */}
          </label>
          {render(multipleImages)}

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            {isLoading ? 'loading....' : 'Done'}
          </Button>
        </form>
      </Container>
    </main>
  );
}
