import { getAuthToken } from '../services/loaderAuth';

export const callApi = async (url, method = 'GET', body = null) => {
  const token = getAuthToken();

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Response(errorData.message);
  }

  const responseData = await response.json();
  //   console.log(responseData);
  return responseData;
};
