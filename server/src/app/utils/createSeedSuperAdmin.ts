/* eslint-disable no-console */
import env from "../../config/env"
import AppError from "../errorHelper/errorHelper";
 import User from "../module/user/user.model"
 import  httpStatusCode  from 'http-status-codes';


export const createSeedSuperAdmin = async () => {
    try {
        const isUser = await User.findOne({email: env.SUPER_ADMIN_EMAIL});
        if(isUser) {
            console.log("Super Admin already created");
            return;
        }

        const payload = {
            full_name: "Nayem Ahmed",
            email: env?.SUPER_ADMIN_EMAIL,
            password: env?.SUPER_ADMIN_PASSWORD
        }

        const superAdmin = await User.create(payload);
        console.log(superAdmin);
    } catch (error) {
        throw new AppError(
            httpStatusCode.BAD_REQUEST,
            error instanceof Error ? error.message : "An unknown error occurred"
        );
    }
}