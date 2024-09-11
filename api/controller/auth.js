import twilio from "twilio";
import { User } from "../models/user.js";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
import bcryptjs from "bcryptjs";
dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const sendVerificationCode = async (phoneNumber, verificationCode) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is ${verificationCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(message.sid);
  } catch (error) {
    console.error("Error sending verification code:", error);
    throw new Error("Failed to send verification code");
  }
};
export const register = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      phoneNumber,
      password,
      verificationCode,
    });
    await sendVerificationCode(phoneNumber, verificationCode);
    generateToken(res, user._id);
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const verify = async (req, res) => {
  const { phoneNumber, verificationCode } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "User is not verified" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(res, user._id);
    const { password: _, ...rest } = user.toObject();
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
