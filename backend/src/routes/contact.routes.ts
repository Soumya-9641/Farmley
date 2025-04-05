// routes/contact.routes.ts
import express from "express";
import { submitContactForm } from "../coontrollers/contact.controller";

const router = express.Router();


//@ts-ignore
router.post("/submit", submitContactForm);

export default router;
