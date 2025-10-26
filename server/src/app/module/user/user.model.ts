import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import  bcrypt  from 'bcrypt';
import env from "../../../config/env";


const UserSchema = new Schema<IUser>({
    full_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    picture: {type: String},
    bio: {type: String}
}, {
    timestamps: true,
    versionKey: false
})


UserSchema.pre("save", async function(next) {
    const hashedPassword = await bcrypt.hash(this.password as string, Number(env.BCRYPT_SALT_ROUND));
    this.password = hashedPassword;
    next();
})

const User = model<IUser>("User", UserSchema);

export default User;