import { NextFunction, Request, Response } from "express";
import { DecodeToken } from "../utils/jwt";
import env from "../../config/env";
import AppError from "../errorHelper/errorHelper";
import httpStatusCode from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import User from "../module/user/user.model";
 
export const CheckAuth = () =>  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const verifyUser =   DecodeToken(token as string, env.JWT_SECRET_CODE) as JwtPayload;
        const user = await User.findById(verifyUser.userId).select("-password");

         // CHECKING
        if(!user) throw new AppError(httpStatusCode.BAD_REQUEST, "User not exist!");
        if(!verifyUser) throw new AppError(httpStatusCode.BAD_REQUEST, "Unauthorized");

        req.user = user; // To getting user info
        next();
    } catch (error) {
        next(error);
    }
}