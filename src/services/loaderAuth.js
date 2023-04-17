import { redirect } from 'react-router-dom';
import { url } from '../config';

export const getAuthToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const storedExpiration = localStorage.getItem('expiration');

  const expirationDate = new Date(storedExpiration);

  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();

  if (duration < 0) {
    return 'EXPIRED';
  }

  return token;
};

export const loaderAuth = async () => {
  const token = getAuthToken();

  const res = await fetch(`${url}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    return redirect('/auth?mode=login');
  }

  return result.data;
};
