import { Router } from "express";
import { AuthController } from "./auth.controller";
import { CheckAuth } from "../../middleware/Auth.middleware";


const router = Router();


router.post('/login', AuthController.UserLogin);
router.get('/check', CheckAuth(), AuthController.checkAuthorized);
router.post('/access-token', AuthController.generetNewAccessToken);
router.post('/logout', AuthController.logout);
router.post('/reset-password', AuthController.resetPassword);


export const AuthRouter = router;