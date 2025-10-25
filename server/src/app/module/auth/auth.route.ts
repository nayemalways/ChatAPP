import { Router } from "express";
import { AuthController } from "./auth.controller";
import { CheckAuth } from "../../middleware/Auth.middleware";
import { Role } from "../user/user.interface";


const router = Router();


router.post('/login', AuthController.UserLogin);
router.post('/refresh-token', AuthController.generetNewAccessToken);
router.post('/logout', AuthController.logout);
router.post('/reset-password', CheckAuth(...Object.values(Role)), AuthController.resetPassword);


export const AuthRouter = router;