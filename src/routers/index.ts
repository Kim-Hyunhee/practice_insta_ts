import { Router } from "express";
import { postUsers, postUsersToken } from "../controllers/users";

const router = Router();

router.post("/users/signUp", postUsers);
router.post("/users/logIn", postUsersToken);

export default router;
