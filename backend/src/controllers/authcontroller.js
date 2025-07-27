import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup=async (req,res)=>{
    const{fullname,email,password}=req.body;
    if(!fullname || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6){
        return res.status(400).json({message:"passwrod length min 6"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try{
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(409).json({ message: "sign up with a diff mail" });
        }   
        const randomAvatarNumber = Math.floor(Math.random() * 100) + 1;
        const avatar = `https://avatar.iran.liara.run/public/${randomAvatarNumber}`;
        const newUser = await User.create({ fullname, email, password,profilepic:avatar });
        const payload = {
            userId: newUser._id.toString(),
            email: newUser.email,
            fullname: newUser.fullname
            };
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token", token, {
        httpOnly: true,        //prevent XSS attacks
        secure: process.env.NODE_ENV === "production", // only true in prod  //true means only over https requests
        sameSite: "strict",     //prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: newUser,
});

    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message});
    }

}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      fullname: user.fullname,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { _id, fullname, email: userEmail, profilepic } = user;
   res.status(200).json({
  success: true,
  message: "User logged in successfully",
  user: { _id, fullname, email: userEmail, profilepic },
});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production (HTTPS)
    sameSite: "strict"
  });
  
  res.status(200).json({ message: "User logged out successfully" });
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId; // Comes from auth middleware

    const otherusers = await User.find({ _id: { $ne: currentUserId } }).select("-password"); // exclude password

    res.status(200).json(otherusers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};