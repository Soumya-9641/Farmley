import express, { Router } from "express";
import { signup, login } from "../coontrollers/auth.controller";



const router: Router = express.Router();
//@ts-ignore
router.post("/signup", signup);
//@ts-ignore
router.post("/login", login);

export default router;