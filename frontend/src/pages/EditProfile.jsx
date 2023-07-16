import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { callApi } from '../store/callApi';
import { useForm } from 'react-hook-form';
import { getAuthToken } from '../services/loaderAuth';
import { url } from '../config';

export default function EditProfile() {
  const [user, setUser] = useState(null);

  const location = useLocation();

  const userId = location.pathname.slice(9, 33);

  const fetchUser = async () => {
    const responseUser = await callApi(`${url}/users/${userId}`);

    setUser(responseUser.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append('username', data.username);
    formdata.append('email', data.email);
    formdata.append('bio', data.bio);
    formdata.append('gender', data.gender);
    formdata.append('profile_pic', data.file[0]);
    const token = getAuthToken();

    setIsLoading(true);

    await fetch(`${url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });

    setIsLoading(false);

    navigate(`/profile/${userId}`);
  };

  return (
    <Container maxWidth="xs">
      {user && (
        <Box>
          <Card
            className="rounded-none"
            elevation={0}
            sx={{
              border: 1,
              borderColor: '#3e363663',
              borderRadius: 0,
              padding: 1,
            }}
          >
            <CardContent>
              <Typography
                className="text-center "
                fontWeight={700}
                sx={{ paddingBottom: 1 }}
              >
                Edit your profile
              </Typography>
              <Divider></Divider>
            </CardContent>
            <CardContent>
              <Box className="grid grid-cols-3">
                {user.profile_pic ? (
                  <Avatar
                    alt="user profile"
                    src={user.profile_pic.url}
                    sx={{ width: 80, height: 80 }}
                    className=" col-span-1"
                  />
                ) : (
                  <Avatar>{user.username[0].toUpperCase()}</Avatar>
                )}
                <Box className="col-span-2">
                  <label htmlFor="img" className=" text-xs font-bold ">
                    Change profile photo:
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    className="w-full"
                    {...register('file')}
                  ></input>
                </Box>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Username"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="block"
                  defaultValue={user.username}
                  {...register('username')}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="block"
                  defaultValue={user.email}
                  {...register('email')}
                />
                <TextField
                  label="Bio"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="block"
                  defaultValue={user.bio}
                  {...register('bio')}
                />
                <TextField
                  label="Gender"
                  fullWidth
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="block"
                  defaultValue={user.gender}
                  {...register('gender')}
                />

                <Box className="flex items-center justify-between">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isLoading}
                    sx={{ marginTop: 2 }}
                  >
                    {isLoading ? 'Loading...' : 'Submit'}
                  </Button>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    className="pt-4 cursor-pointer"
                    onClick={() =>
                      confirm('Are you sure to deactivate your account?')
                    }
                  >
                    Temporarily deactivate my account
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
}
