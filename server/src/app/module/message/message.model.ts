import mongoose, { model, Schema } from "mongoose";
import { IMessage } from "./message.interface";


const MessageSchema = new Schema<IMessage>({
    sender_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiver_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    text: {type: String},
    img: {type: String},
    seen: {type: Boolean, default: false}
}, {
    timestamps: true,
    versionKey: false
})



const Message = model<IMessage>("Message", MessageSchema);

export default Message;