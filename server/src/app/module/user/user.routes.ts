import { Router } from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middleware/userValidate.middleware';
import { UpdateUserZodSchema, UserZodSchema } from './validate.user';

const router = Router();

router.post('/register', validateRequest(UserZodSchema), UserControllers?.RegisterUser);
router.get('/get-users', UserControllers?.GetAllUsers);
router.patch('/:userId', validateRequest(UpdateUserZodSchema),  UserControllers?.updateUser);


export const UserRoutes = router;