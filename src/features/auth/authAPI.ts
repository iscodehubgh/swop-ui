import { api } from '../../api';
import { Registration } from '../../types/auth';
import { LoginResponse } from '../../types/auth';

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const url = '/api/auth/login';
  const response = await api.post(url, { email: username, password });
  const userToken = await response.json();
  return userToken;
};

export const register = async (body: Registration): Promise<LoginResponse> => {
  const url = '/api/auth/register';
  const response = await api.post(url, body);
  const user = await response.json();

  return user;
};
