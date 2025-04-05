import { Request, Response } from "express";
import User, { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup API
export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Create a new user
      const newUser: IUser = new User({ name, email, password });
      await newUser.save();
      const username=newUser?.name;
    const emailnew= newUser?.email;
      return res.status(201).json({ message: "User registered successfully!",user:username,email:emailnew});
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
  
// Login API
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    const username=user?.name;
    const emailnew= user?.email;
    res.status(200).json({ message: "Login successful!", token ,user:username,email:emailnew});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
