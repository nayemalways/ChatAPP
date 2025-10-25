import statusCode from "http-status-codes";
import AppError from "../../errorHelper/errorHelper";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import { IUser } from "../user/user.interface";
import { generaeNewAccessTokenByRefreshToken, generateUserToken } from "../../utils/authTokens";
import httpStatusCode from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";


const loginService = async (payload: Partial<IUser>) => {
    const { email, password }  = payload;

    // USER CHECK
    const isUserExist = await User.findOne({email});
    if(!isUserExist) throw new AppError(statusCode.BAD_REQUEST, "No such user found! Please Register!");

    // PASSWORD CHECK
    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string);
    if(!isPasswordMatched) throw new AppError(statusCode.BAD_REQUEST, "Incorrect Password");
     
    const userToken = generateUserToken(isUserExist);
    return userToken;
}

const newAccessToken = async (refreshToken: string) => {
    const accessToken = await generaeNewAccessTokenByRefreshToken(refreshToken);
    return { accessToken };
}


const resetPassowrdService = async ( user: JwtPayload, oldPassword: string, newPassword: string ) => {
    const isUserExist = await User.findOne({email: user?.email});
    if(!isUserExist)
        throw new AppError(httpStatusCode.BAD_REQUEST, "User not found!");

    const passwordMatching = await bcrypt.compare(oldPassword, isUserExist?.password as string);
    if(!passwordMatching)
        throw new AppError(httpStatusCode.BAD_REQUEST, "Password doesn't matched!");

    isUserExist.password = newPassword;
    await isUserExist.save();
    return;
}


export const AuthService = {
    loginService,
    newAccessToken,
    resetPassowrdService
}