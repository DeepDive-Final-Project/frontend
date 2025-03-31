import axios from 'axios';

export const fetchAuthApi = async () => {
  const { data } = await axios.get('https://api.i-contacts.link/auth/me');
  //console.log(data);
  return data;
};
