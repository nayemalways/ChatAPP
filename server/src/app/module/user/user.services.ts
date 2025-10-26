 import AppError from "../../errorHelper/errorHelper";
import { IUser } from "./user.interface";
import User from "./user.model";
import httpStatusCode from "http-status-codes";
import { deleteImageFromCLoudinary } from "../../../config/cloudinary.config";
import Message from "../message/message.model";

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

const GetAllUser = async (user_id: string) => {
  const users = await User.find({_id: {$ne: user_id}}).select("-password");

  // Count number of message unseen
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unseenMessage: any = {};
  const promises = users.map( async (user) => {
    const message = await Message.find({sender_id: user._id, receiver_id: user_id, seen: false});
    if(message.length > 0) {
      unseenMessage[user.id]  = message.length;
    }
  })

  await Promise.all(promises);
  return {
    users,
    unseenMessage
  };
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
