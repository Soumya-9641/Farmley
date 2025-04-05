// controllers/contact.controller.ts
import { Request, Response } from "express";
import Contact from "../models/Contact.model";

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the form.",
    });
  }
};
