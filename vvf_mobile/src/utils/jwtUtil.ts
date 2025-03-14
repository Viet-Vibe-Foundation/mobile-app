import {isExpired} from 'react-jwt';

const verifyToken = (token?: string) => {
  if (!token) return false;
  if (isExpired(token)) return false;
  return true;
};

export {verifyToken};
