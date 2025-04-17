import axios from 'axios';

export const logout = async () => {
  await axios.post(
    `${import.meta.env.VITE_BASE_API_URL}/auth/logout`,
    {},
    { withCredentials: true },
  );
};
