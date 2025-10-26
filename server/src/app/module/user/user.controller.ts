/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { CatchAsync } from "../../utils/CatAsync";
import { SendResponse } from "../../utils/SendResponse";
import  httpStatusCode  from 'http-status-codes';
import { SetCookie } from "../../utils/SetCookie";
import { createUserTokens } from "../../utils/user.tokens";



const RegisterUser = CatchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService?.RegisterUserService(req.body);

    // Generate user tokens and  Set to Cookies
    const userTokens = await createUserTokens( user._id );
    SetCookie(res, userTokens);

    SendResponse(res, {
         statusCode: httpStatusCode.CREATED,
         success: true,
         message: "User Created Successfully",
         data: user
    })
})


const GetAllUsers = CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService?.GetAllUser();
    SendResponse(res, {
         statusCode: httpStatusCode.OK,
         success: true,
         message:"User retrive successfully",
         data: users
    })
})


const updateUser = async (req: Request, res: Response, next: NextFunction) => {
     const userId = req.params.userId;
    const verifiedUser = req.user;
    const user = await UserService.updateUserService(req.body, verifiedUser, userId );

    SendResponse(res, {
        statusCode: httpStatusCode.OK,
        success: true,
        message: "User update successful!",
        data: user
    })
}

export const UserControllers = {
    RegisterUser,
    GetAllUsers,
    updateUser
}