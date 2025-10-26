import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middleware/userValidate.middleware";
import { UpdateUserZodSchema, UserZodSchema } from "./validate.user";
import { multerUpload } from "../../../config/multer.config";
import { CheckAuth } from "../../middleware/Auth.middleware";

const router = Router();

router.post(
  "/register",
  validateRequest(UserZodSchema),
  UserControllers?.RegisterUser
);

router.get("/get_all_users",
    CheckAuth(), 
    UserControllers?.GetAllUsers
);

router.patch(
  "/",
  CheckAuth(),
  multerUpload.single("file"),
  validateRequest(UpdateUserZodSchema),
  UserControllers?.updateUser
);

export const UserRoutes = router;
