import httpStatus from 'http-status-codes';
import { GenerateToken, verifyToken } from './jwt';
import env from '../../config/env';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../errorHelper/errorHelper';
import User from '../module/user/user.model';

export const createUserTokens = async (userId: string) => {
  // Jsonwebtoken
  const accessToken = GenerateToken(
    { userId },
    env?.JWT_SECRET_CODE,
    env?.JWT_EXPIRATION_TIME
  );
  const refreshToken = GenerateToken(
    { userId },
    env?.JWT_REFRESH_SECRET,
    env?.JWT_RERESH_EXPIRATION
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const tokenVerify = verifyToken(
    refreshToken,
    env.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExists = await User .findOne(
    { email: tokenVerify.email },
    { createdAt: 0, updatedAt: 0 }
  );

  if (!isUserExists)
    throw new AppError(httpStatus.BAD_REQUEST, "User Doesn't Exist");


  const jwtPayload = { userId: isUserExists?._id };

  const accessToken = GenerateToken(
    jwtPayload,
    env?.JWT_SECRET_CODE,
    env?.JWT_EXPIRATION_TIME
  ); // Jsonwebtoken
  return accessToken;
};
