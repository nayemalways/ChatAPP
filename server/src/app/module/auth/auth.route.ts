import { Router } from "express";
import { AuthController } from "./auth.controller";


const router = Router();


router.post('/login', AuthController.UserLogin);
router.post('/refresh-token', AuthController.generetNewAccessToken);
router.post('/logout', AuthController.logout);
router.post('/reset-password', AuthController.resetPassword);


export const AuthRouter = router;