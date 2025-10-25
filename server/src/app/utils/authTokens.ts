/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../errorHelper/errorHelper";
import httpStatusCode  from 'http-status-codes';
import env from "../../config/env";
import { DecodeToken, GenerateToken } from "./jwt";
import { IsActive, IUser } from "../module/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import User from "../module/user/user.model";


export const generateUserToken = async (user: Partial<IUser>) => {
    try {
        const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    }
        const accessToken =  GenerateToken(jwtPayload, env.JWT_SECRET_CODE, env.JWT_EXPIRATION_TIME);
        const refreshToken = GenerateToken(jwtPayload, env.JWT_REFRESH_SECRET, env.JWT_RERESH_EXPIRATION);
        return {
            accessToken,
            refreshToken
        }
    } catch (error: any) {
        throw new AppError(httpStatusCode.BAD_REQUEST, error.message);
    }
}

export const generaeNewAccessTokenByRefreshToken = async (refreshToken: string ) => {
    try {
        const verifyUser = DecodeToken(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
        if(!verifyUser)
            throw new AppError(httpStatusCode.BAD_REQUEST, "Unauthorized");
        
        const isUserExist = await User.findOne({email: verifyUser.email});
        if(!isUserExist) 
            throw new AppError(httpStatusCode.BAD_REQUEST, "User not exist!");
        if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE)
            throw new AppError(httpStatusCode.BAD_REQUEST, "Can't access, the user might be blocked or inactive");
        if(isUserExist.isDeleted) 
            throw new AppError(httpStatusCode.BAD_REQUEST, "Can't access, user is deleted!");

        const payload =  {
            userId: isUserExist?._id,
            email: isUserExist?.email,
            role: isUserExist?.role
        }
                
        const newAccessToken =  GenerateToken(payload, env.JWT_SECRET_CODE, env.JWT_EXPIRATION_TIME);
        return newAccessToken

    } catch (error: any) {
        throw new AppError(httpStatusCode.BAD_REQUEST, error.message);
    }
}