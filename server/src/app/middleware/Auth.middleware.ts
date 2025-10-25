import { NextFunction, Request, Response } from "express";
import { DecodeToken } from "../utils/jwt";
import env from "../../config/env";
import { IsActive } from "../module/user/user.interface";
import AppError from "../errorHelper/errorHelper";
import httpStatusCode from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import User from "../module/user/user.model";
 
export const CheckAuth = (...restRole: string[]) =>  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const verifyUser =   DecodeToken(token as string, env.JWT_SECRET_CODE) as JwtPayload;
        const isUserExist = await User.findOne({email: verifyUser.email});

         // CHECKING
        if(!isUserExist) 
                throw new AppError(httpStatusCode.BAD_REQUEST, "User not exist!");
        if(isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE)
            throw new AppError(httpStatusCode.BAD_REQUEST, "Can't access, the user might be blocked or inactive");
        if(isUserExist.isDeleted) 
            throw new AppError(httpStatusCode.BAD_REQUEST, "Can't access, user is deleted!");
        if(!verifyUser)
            throw new AppError(httpStatusCode.BAD_REQUEST, "Unauthorized");


        if(!restRole.includes(verifyUser.role)){
            throw new AppError(httpStatusCode.BAD_REQUEST, "You are not permitted to access");
        }

        req.user = verifyUser;
        next();
    } catch (error) {
        next(error);
    }
}