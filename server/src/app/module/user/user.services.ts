 import AppError from "../../errorHelper/errorHelper";
import { IUser } from "./user.interface";
import User from "./user.model";
import httpStatusCode from "http-status-codes";
import { deleteImageFromCLoudinary } from "../../../config/cloudinary.config";

const RegisterUserService = async (payload: Partial<IUser>) => {
  const { email } = payload;
  const userExist = await User.findOne({ email }).lean();

  if (userExist) {
    throw new AppError(
      httpStatusCode.BAD_REQUEST,
      "User already exist with this email!"
    );
  }

  const user = await User.create(payload);
  return user;
};

const GetAllUser = async () => {
  const users = await User.find({}).lean();
  return users;
};

const updateUserService = async (
  payload: Partial<IUser>,
  userId: string
) => {
  const isUser = await User.findById(userId);

  if (!isUser) {
    throw new AppError(400, "User not found");
  }

  if (payload.password ) {
    throw new AppError(
      httpStatusCode.FORBIDDEN,
      "You can't change your password from here"
    );
  }

  // Delete existing images from cloudinar
  if (payload?.picture && isUser?.picture) {
    await deleteImageFromCLoudinary(isUser?.picture as string);
  }

  const user = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return user;
};

export const UserService = {
  RegisterUserService,
  GetAllUser,
  updateUserService,
};
