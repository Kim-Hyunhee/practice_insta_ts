import { Router } from "express";
import { postUsers } from "../controllers/users";

const router = Router();

router.post("/users/signUp", postUsers);

export default router;
