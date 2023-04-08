import jwt from 'jwt-decode';
import { DecodedToken } from '../types/auth';

const isExpired = (decodedToken: DecodedToken) => {
  if (decodedToken.exp * 1000 < new Date().getTime()) {
    localStorage.removeItem('authToken');
    window.location.replace('/');
  }

  return undefined;
};

export const decodeToken = (token: string) => {
  const decodedToken: DecodedToken = jwt(token);

  // check if token is expired
  isExpired(decodedToken)

  return decodedToken;
};
