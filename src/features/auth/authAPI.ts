import { api } from '../../api';
import { Registration } from '../../types/auth';
import { User } from '../../types/user';

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const url = '/auth/login';
  const response = await api.post(url, { username, password });
  const user = await response.json();

  return user;
};

export const register = async (body: Registration): Promise<User> => {
  const url = '/auth/register';
  const response = await api.post(url, body);
  const user = await response.json();

  return user;
};
