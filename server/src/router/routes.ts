import { Router } from 'express';
import { UserRoutes } from '../app/module/user/user.routes';
import { AuthRouter } from '../app/module/auth/auth.route';
 

const router = Router();


const AppRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRouter
    }
]



AppRoutes.forEach((item) => {
     router.use(item.path,item.route);
})


export const GlobalRoutes = router;