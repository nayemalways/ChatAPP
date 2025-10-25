import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
import bcrypt from 'bcrypt';
import env from "../../../config/env";


const AuthSchema = new Schema<IAuthProvider>({
    provider: { type: String },
    providerId: { type: String }
}, {
    _id: false,
    timestamps: false
}) 


const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean },
    isVerified: { type: Boolean, default: false },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive?.ACTIVE
    },
    
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role?.USER
    },
    auth: [AuthSchema],
    booking: { type: [Schema.Types.ObjectId] },
    guids: { type: [Schema.Types.ObjectId] }
}, {
    timestamps: true,
    versionKey: false
})


UserSchema.pre("save", async function(next) {
    const hashedPassword = await bcrypt.hash(this.password as string, Number(env.BCRYPT_SALT_ROUND));
    this.password = hashedPassword;
    next();
})

const User = model<IUser>("users", UserSchema);

export default User;