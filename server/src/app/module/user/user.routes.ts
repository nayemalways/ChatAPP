import { Router } from 'express';
import { UserControllers } from './user.controller';
import { CheckAuth } from '../../middleware/Auth.middleware';
import { Role } from './user.interface';
import { validateRequest } from '../../middleware/userValidate.middleware';
import { UpdateUserZodSchema, UserZodSchema } from './validate.user';

const router = Router();

router.post('/register', validateRequest(UserZodSchema), UserControllers?.RegisterUser);
router.get('/get-users', CheckAuth(...Object.keys(Role)), UserControllers?.GetAllUsers);
router.patch('/:userId', CheckAuth(...Object.keys(Role)), validateRequest(UpdateUserZodSchema),  UserControllers?.updateUser);


export const UserRoutes = router;