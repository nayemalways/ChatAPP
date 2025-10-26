import express from 'express';
import { messageControllers } from './message.controller';
import { CheckAuth } from '../../middleware/Auth.middleware';
import { multerUpload } from '../../../config/multer.config';

const router = express.Router();

router.get('/:id', CheckAuth(), messageControllers.getSelectedUserMessage);
router.patch('/mark/:id', CheckAuth(), messageControllers.markMessageAsSeen);
router.post('/send/:id', CheckAuth(),  multerUpload.single("file"), messageControllers.sendMessage);

export const messageRouter = router;