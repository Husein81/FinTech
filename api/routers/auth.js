import express from "express";
import { login, logout, register, verify } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", verify);
router.post("/logout", logout);

export default router;
