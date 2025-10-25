import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    GUID = "GUID",
    SUPERADMIN = "SUPERADMIN"
}
export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IAuthProvider {
    provider:  "google" | "credentials";
    providerId: string;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    phone? : string;
    picture? : string;
    address? : string;
    isDeleted? : boolean;
    isActive? : IsActive;
    isVerified: boolean;
    role: Role;
    auth: IAuthProvider[];
    booking: Types.ObjectId[];
    guids: Types.ObjectId[];

}