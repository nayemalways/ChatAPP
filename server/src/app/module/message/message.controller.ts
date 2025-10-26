import { Request, Response } from "express"
import { CatchAsync } from "../../utils/CatAsync"
import { SendResponse } from "../../utils/SendResponse"
import  httpStatus  from 'http-status-codes';
import { messageService } from "./message.service";


const getSelectedUserMessage = CatchAsync(async (req: Request, res: Response) => {
    const { userId } = req.user;
    const { id } = req.params;

    const result = await messageService.getSelectedUserMessageService(userId, id);

    SendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Message successfully loaded!",
        data: result
    })
});

const markMessageAsSeen = CatchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await messageService.markMessageAsSeen(id);
    SendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Message has been seen!",
        data: result
    })
});


const sendMessage = CatchAsync(async (req: Request, res: Response) => {
    const file = req.file?.path as string;
    const { id } = req.params;
    const userId = req.user._id;

    const payload = {
        ...req.body,
        img: file
    }
    const result = await messageService.sendMessageService(payload, userId, id);
    
    SendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Message has been send!",
        data: result
    })
})

export const messageControllers = {
    getSelectedUserMessage,
    markMessageAsSeen,
    sendMessage
}