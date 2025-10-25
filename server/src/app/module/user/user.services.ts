import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelper/errorHelper";
import { IAuthProvider, IUser, Role } from "./user.interface";
import User from "./user.model";
import  httpStatusCode  from 'http-status-codes';

 
const RegisterUserService = async (payload : Partial<IUser>) => {
    const { email, ...rest } = payload;

    const UserExist = await User.findOne({email}).lean();
    if(UserExist) {
      throw new AppError(httpStatusCode.BAD_REQUEST, "User already exist with this email");
    }

    const authProvider: IAuthProvider = {provider: "credentials", providerId: email as string};
    const user = await User.create({email, auth: authProvider, ...rest});
    return user;

}

const GetAllUser = async () => {
    const users = await User.find({}).lean();
    return users;
}


const updateUserService = async (payload: Partial<IUser>, verifiedUser: JwtPayload, userId: string) => {
    
    if(payload.role) {
        if(payload.role === Role.USER || payload.role === Role.GUID)
            throw new AppError(httpStatusCode.BAD_REQUEST, "You are not permitted to change the role!");
        if(payload.role === Role.SUPERADMIN && verifiedUser.role === Role.ADMIN) 
            throw new AppError(httpStatusCode.BAD_REQUEST, "You are not permitted to change the role!")
    }

    if(payload.isActive  || payload.isVerified   || payload.isDeleted) {
        if(verifiedUser.role === Role.USER || verifiedUser.role === Role.GUID) 
            throw new AppError(httpStatusCode.BAD_REQUEST, "You are not permitted to change status!")

    }

    if(verifiedUser.role === Role.USER || verifiedUser.role === Role.GUID) {
        if(verifiedUser.userId != userId)
            throw new AppError(httpStatusCode.BAD_REQUEST, "You can only update your own data");
    }


    if(payload.password === undefined)
         throw new AppError(httpStatusCode.FORBIDDEN, "You can't change your password from here");


    const user = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true});
    return user;
}





export const UserService = {
    RegisterUserService,
    GetAllUser,
    updateUserService
}