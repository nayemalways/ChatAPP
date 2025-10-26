import { Router } from 'express';
import { UserRoutes } from '../app/module/user/user.routes';
import { AuthRouter } from '../app/module/auth/auth.route';
import { messageRouter } from '../app/module/message/message.route';
 

const router = Router();


const AppRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRouter
    },
    {
        path: "/message",
        route: messageRouter
    }
]



AppRoutes.forEach((item) => {
     router.use(item.path,item.route);
})


export const GlobalRoutes = router;