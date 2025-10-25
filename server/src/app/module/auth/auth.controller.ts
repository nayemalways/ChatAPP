/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../utils/CatAsync";
import { AuthService } from "./auth.service";
import httpStatusCode  from 'http-status-codes'
import { SendResponse } from "../../utils/SendResponse";
import { SetCookie } from "../../utils/SetCookie";
import AppError from "../../errorHelper/errorHelper";


const UserLogin = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.loginService(req.body);
    SetCookie(res, loginInfo);
    
    SendResponse(res, {
        statusCode: httpStatusCode.ACCEPTED,
        success: true,
        message: "Login Successfull",
        data: loginInfo
    })
})

const generetNewAccessToken = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

     const  refreshToken  = req.cookies?.refreshToken
    if(!refreshToken)
        throw new AppError(httpStatusCode.BAD_REQUEST, "No Refresh Token Found") 

    const newAccessToken = await AuthService.newAccessToken(refreshToken);
    SetCookie(res, newAccessToken);
    
    SendResponse(res, {
        statusCode: httpStatusCode.ACCEPTED,
        success: true,
        message: "Login Successfull",
        data: newAccessToken
    })
})


const logout = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {

      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      })
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      })
    
    SendResponse(res, {
        statusCode: httpStatusCode.ACCEPTED,
        success: true,
        message: "Logout successful"
    })
})


const resetPassword = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;
    await AuthService.resetPassowrdService(user, oldPassword, newPassword);
    
    SendResponse(res, {
        statusCode: httpStatusCode.ACCEPTED,
        success: true,
        message: "Password reset successful",
        data: null
    })
})


export const AuthController = {
    UserLogin,
    generetNewAccessToken,
    logout,
    resetPassword
}