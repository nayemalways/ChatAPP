 import { io, userSocketMap } from "../../../app";
import { IMessage } from "./message.interface";
import Message from "./message.model"


const getSelectedUserMessageService = async (userId: string, selectedUserId: string) => {
    const message = await Message.find({
        $or: [
            {sender_id: selectedUserId, receiver_id: userId},
            {sender_id: userId, receiver_id: selectedUserId},
        ]
    });

    await Message.updateMany({sender_id: selectedUserId, receiver_id: userId}, { seen: true });

    return message;
}

const markMessageAsSeen = async (messageId: string) => {
    await Message.findByIdAndUpdate(messageId, {seen: true});
    return null;
}

const sendMessageService = async (payload: Partial<IMessage>, senderId: string, receiverId: string) => { 

    const messagePayload: IMessage = {
        receiver_id: receiverId,
        sender_id: senderId
    }

    if(payload?.img) {
        messagePayload.img = payload.img;
    }
    if(payload?.text) {
        messagePayload.text = payload.text;
    }

    const message = await Message.create(messagePayload);


    const receiverSocketId = userSocketMap[receiverId]
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
    }

    return message;
}


export const messageService = {
    getSelectedUserMessageService,
    markMessageAsSeen,
    sendMessageService
}